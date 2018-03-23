const nodemailer = require('nodemailer');
require('dotenv').config({path: './test.env'});

const options = {
  host: 'email-smtp.us-west-2.amazonaws.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SES_USER_KEY, // generated ethereal user
    pass: process.env.SES_SECRET_KEY // generated ethereal password
  },
  debug: true
};

console.log(options);

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(options);

transporter.verify(function (err, success) {
  if (err) {
    console.log(err);
  } else {
    console.log('ready!');
  }
});

function sendEmail(options, callback) {
  transporter.sendMail({
    from: 'no-reply@productops.com',
    to: 'rami.khadder@productops.com',
    subject: 'Subject',
    text: '!!',
    html: '<b>!!</b>'
  }, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      callback(info);
    }
  });
}

function send_email_exchange_function(options, callback) {
  const htmlbody = '<body><h1>{{mytemplatevar}}</h1></body>';
  const context = { mytemplatevar: "Hello World" };

  // create template based sender function, using nodemailer v2.1.0 instead of v4.1.0 for this one
  const sendmail = transporter.sendMail(
    {
      subject: 'Subject Line', // Subject line
      text: 'text', // plain text body
      html: htmlbody, // html body
    },
    {
      from: 'eric.fultz@productops.com' // sender address
    }
  );
  const receivers = { to: options.receiverContactEmail };
  console.log(receivers);
  console.log(transporter.transporter.options);
  // send mail with defined transport object
  sendmail(receivers, context, function(a, b, c){
    console.log(a, b, c);
    console.log(a.response);
    console.log("done sending email"); } );

}

sendEmail(null, function(info) {
  console.log(info);
});

// send_email_exchange_function({receiverContactEmail: 'rami.khadder@productops.com'});
