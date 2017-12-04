/**
 * Created by Rami Khadder on 7/24/2017.
 */
var google = require('googleapis');
var jwt = require('jsonwebtoken');
var SQL = require('../SQL');
var tokenSecret = require('../secrets/token_secret.json')

function makeBody(to, from, subject, message) {
  var str = ["Content-Type: text/html; charset=\"UTF-8\"\n",
    "MIME-Version: 1.0\n",
    "Content-Transfer-Encoding: 7bit\n",
    "to: ", to, "\n",
    "from: ", from, "\n",
    "subject: ", subject, "\n\n",
    message
  ].join('');

  var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
  return encodedMail;
}

//Gmail API
exports.sendConfirmationEmail = function(auth, userData, harvestUserData, onPostExecute) {
  if (harvestUserData != null){
    var token = jwt.sign({harvestUserData: harvestUserData, userData: userData}, tokenSecret.secret, {expiresIn: 604800});
    console.log(token);
  }
  var URL = "https://www.google.com/accounts/AccountChooser?Email=" + userData.productOpsEmail + "&continue=https://apps.google.com/user/hub";
  var githubURL = 'https://github.com/join';
  var slackURL = 'https://slack.com/';
  var onboarindURL = 'onboarding.productops.com/user?token=' + token;
  var message =
    'Hello ' + userData.firstName + ' ' + userData.lastName + ',' +
    '<br /><br />' +
    'Welcome to the productOps team! We\'re so excited to have you join at 9:00am on ' + userData.startDate + '.' +
    '<br /><br />' +
    'Below is what you can expect in the days leading up to and on your first day.' +
    '<br /><br />' +
    '<b>Before your first day, please complete the following:</b>' +
    '<br /><br /><ol><li>' +
    'Please login to your new productOps email account by signing in <a href="' + URL + '">here</a> with the following account details:' +
    '<br /><br />' +
    'Username<br />' +
    userData.productOpsEmail +
    '<br /><br />' +
    'Password<br />' +
    'prod0p$2017<br /><br />';


  if (userData.hasGithub) {
    message += '<li>Create a Github account with productOps information (e.g., name-po) using your new email at: ' + githubURL + '</li><br/>';
  }
  if (userData.hasSlack) {
   message += '<li>Join the productOps Slack team <a href="https://productops.slack.com/">here</a>.</li><br/>'
  }

  if (harvestUserData != null) {

    message +=
      '<li>Please visit <a href="onboarding.productops.com/user?token=' + token + '">our OnBoarding page</a> to review, fill out and print the following forms: <br /><ul style="list-style-type:circle">' +
      '<li>Personal Information Form (complete online)</li>' +
      '<li>Emergency Contact Form (complete online)</li>' +
      '<li>IRS W-4 Form (Employee Withholding Allowance)(complete online and print)</li>' +
      '<li>I-9 Form (complate online and print)</li>' +
      '<li>Parking Permit Application(option; complete and print)</li>' +
      '<li>At Will Agreement Form (complete and print)</li>' +
      '<li>Company Handbook (review, sign signature page and print)</li>' +
      '<li>Voya - 401k Handbook (review plan and complete enrollment, p. 17</li>' +
      '<li>Medical Enrollment Form (review, complete and print)*</li>' +
      '<li>Dental Application (optional; complete and print)*</li></ul><br /><br />' +
      '<li>Be prepared to bring your passport or eligible ID and Social Security Card so I can finalize your I-9 paperwork on day one.</li><br />' +
      '<li>Be prepared to bring bank account information for direct deposit (a voided check will work)</li></ol><br />' +
      //'<b>*NOTE: You\'ll have until XX days after your start date to complete your medical and dental insurance enrollment. On your first day, I can provide you with premium costs from our broker.</b><br /><br />' +
      '<b>On your first day:</b><br /><ol>' +
      '<li>Please plan to arrive at 9:00am on ' + userData.startDate + ' at 1347 Pacific Avenue. Ring the buzzer upon your arrival and Chloe will let you in.</li><br />' +
      '<li>Meet with me to:<ul>' +
      '<li>Take a tour of the office</li>' +
      '<li>Settle into your new workplace</li>' +
      '<li>Make introductions</li>' +
      '<li>Review new hire paperwork and collect I-9 verification IDs</li>' +
      '<li>Turn in direct deposit information</li>' +
      '<li>Answer any questions you might have</li>' +
      '<li>Get started on your online harassment training</li>' +
      '<li>Review medical insurance premium costs</li></ul></li></ol><br /><br />' +
      'Please do not hesitate to reach out with any questions before your start date by emailing me at catherine@productops.com or calling at 831-419-7932.<br /><br />' +
      'With kind regards,<br />' +
      'Catherine Rumpanos<br />' +
      'Office Manager';

  }

  var raw = makeBody(
    userData.personalEmail,
    'rami.khadder@productOps.com',
    'Welcome to productOps!',
    message);
  var gmail = google.gmail('v1');

  gmail.users.messages.send({
    auth: auth,
    userId: 'me',
    resource: {
      raw: raw
    }
  }, function(err, response) {
    onPostExecute(err, response);
  });
};

exports.sendProjectManagerEmail = function(auth, userData, onPostExecute) {
  SQL.getProjectManagers(userData.project.id, function (err, result) {
    if (err) {
      onPostExecute(err, result);
    } else {
      var message = userData.firstName + ' ' + userData.lastName + ' will be joining the ' + userData.project.name + ' project on ' + userData.startDate + '.';
      var to = "";
      if (result.length >= 1) {
        to += result[0].email;
      }

      for (var i = 1; i < result.length; i++) {
        to += ", " + result[i].email;
      }

       var raw = makeBody(
        to,
        'rami.khadder@productOps.com',
        'You have a new project member!',
        message);

      var gmail = google.gmail('v1');
      gmail.users.messages.send({
         auth: auth,
         userId: 'me',
         resource: {
          raw: raw
        }
       }, function(err, response) {
        onPostExecute(err, response);
       });

    }
  });
};

//G Suite Admin SDK
exports.createUser = function(auth, userData, onPostExecute) {
  var service = google.admin('directory_v1');
  service.users.insert({
    auth: auth,
    resource: {
      "primaryEmail": userData.productOpsEmail,
      "name": {
        "givenName": userData.firstName,
        "familyName": userData.lastName
      },
      "password": "prod0p$2017",
      "changePasswordAtNextLogin": true,
      "emails": userData.personalEmail
    }
  }, function(err, response) {
    onPostExecute(err, response);
  });
};

exports.deleteUser = function(auth, userData, onPostExecute) {
  var service = google.admin('directory_v1');
  service.users.delete({
    auth: auth,
    userKey: userData.productOpsEmail
  }, function(err, response) {
    onPostExecute(err, response);
  });
};

exports.addUserToGroup = function(auth, userData, onPostExecute) {
  var service = google.admin('directory_v1');
  service.members.insert({
    auth: auth,
    groupKey: userData.group + "s@productOps.com",
    resource: {
      "email": userData.productOpsEmail,
      "role": "MEMBER"
    }
  }, function(err, response) {
    onPostExecute(err, response);
  })
};

exports.getFile = function(auth, fileId, onPostExecute){
  var service = google.drive('v3');
  service.files.get({
    auth: auth,
    fileId: fileId
  }, function(err, response){
    onPostExecute(err, response);
  });
};

exports.exportFile = function(auth, fileId, onPostExecute){
  var service = google.drive('v3');
  service.files.export({
    auth: auth,
    fileId: fileId,
    mimeType: 'application/pdf'
  }, function(err, response){
    onPostExecute(err, response);
  });
};

exports.grantUserAccessToDrive = function(auth, fileId, userData, onPostExecute){
  var service = google.drive('v3');
  service.permissions.create({
    auth: auth,
    fileId: fileId,
    resource: {
      role: 'reader',
      type: 'user',
      emailAddress: userData.productOpsEmail

    }
  }, function(err, response){
    onPostExecute(err, response);
  });
};

exports.getMemberFromGroup = function (auth, id, onPostExecute) {
  var service = google.admin('directory_v1');
  service.members.get({
    auth: auth,
    groupKey: 'onboarding-access@productops.com',
    memberKey: id
  }, function(err, response){
    onPostExecute(err, response);
  });
};
