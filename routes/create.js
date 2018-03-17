/**
 * Created by Rami Khadder on 7/17/2017.
 */
var express = require('express');
var router = express.Router();
var RetrieveData = require('../RetrieveData');
var createRes;
var fs = require('fs');
var emailCheck = require('email-check');
var https = require('https');

//serverTools
var googleTools = require('../serverTools/APIs/google');
var googleAuth = require('../serverTools/googleAuth');
var harvest = require('../serverTools/APIs/harvest');
var github = require('../serverTools/APIs/github');

router.get('/home', function (req, res, next) {
  harvest.getProjects(function (statusCode, result) {
    res.status(statusCode).json({
      message: 'Success',
      obj: result
    });
  });
});

router.post('/home', function (req, res, next) {
  createRes = res;
  var userData = req.body;

  fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      returnResponse(createRes, err.code, 'Error loading client secret file: ', err + '', false);
    } else{/*
      emailCheck(userData.personalEmail)
        .then(function (res) {
          if (res === true){*/
            // Authorize a client with the loaded credentials
            googleAuth.authorize(JSON.parse(content), function(auth) {
              googleTools.createUser(auth, userData, function(err, response){
                if (err) {
                  returnResponse(createRes, err.code, 'The Google API returned an error: ', err + '');
                }
                else {
                  googleTools.addUserToGroup(auth, userData, function(err, response){
                    if (err){
                      returnResponse(createRes, err.code, 'The Google API returned an error: ', err + '', true, userData, auth);
                    }
                    else {
                      if (userData.hasHarvest) {
                        harvest.createHarvestUser(userData, function(statusCode, result){
                          if (statusCode !== 201 && statusCode !== 200) {
                            returnResponse(createRes, statusCode, 'Message from Harvest: ', result.message + '', true, userData, auth);
                          }
                          else {
                            assignUserToProject(userData.productOpsEmail, 194910/*internal*/, userData, auth, function(){
                              if (userData.project != null){
                                assignUserToProject(userData.productOpsEmail, userData.project.id, userData, auth, function(){
                                  googleTools.sendProjectManagerEmail(auth, userData, function (err, response) {
                                    if (err) {
                                      returnResponse(createRes, 500, '', err + '', true, userData, auth);
                                    } else {
                                      sendConfirmationEmail(auth, userData, result);
                                    }
                                  });
                                })
                              }
                              else {
                                sendConfirmationEmail(auth, userData, result);
                              }
                            })
                          }
                        });
                      }
                      else {
                        sendConfirmationEmail(auth, userData, null);
                      }
                    }
                  });
                }
              });
            });
          /*
          }
          else{
            returnResponse(createRes, 500, 'An error occurred', 'Primary email does not exist.', false)
          }
        })
        .catch(function (err) {
          returnResponse(createRes, 500, 'An error occurred', err + '', false);
        });*/
    }
  });

});

router.post('/options', function (req, res, next) {
  console.log(req.body);
  github.invite(req.body.username, function (statusCode, result) {
    console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
    if (statusCode === 200) {
      returnResponse(res, statusCode, 'Welcome to github!', 'A confirmation email has been to your email.', false);
    } else {
      returnResponse(res, statusCode, 'An error occurred', result.message + '. Make sure you entered your username correctly.', false)
    }
  });
});

function sendConfirmationEmail(auth, userData, harvestUserData) {
  if (userData.isLetterValid) {
    googleTools.sendConfirmationEmail(auth, userData, harvestUserData, function (err, response) {
      if (err) {
        returnResponse(createRes, err.code, '', err + '', true, userData, auth);
      } else {
        console.log("Sent confirmation email!");
        returnResponse(createRes, 200,
          userData.firstName + ' ' + userData.lastName + ' has joined productOps!',
          'A confirmation email was sent to ' + userData.personalEmail);
      }
    });
  } else {
    returnResponse(createRes, 200,
      userData.firstName + ' ' + userData.lastName + ' has joined productOps!');
  }
}

function assignUserToProject(userID, projectID, userData, auth, onPostExecute) {
  harvest.assignUserToProject(userID, projectID, function (statusCode, result) {
    if (statusCode !== 201) {
      console.log("FAILED ASSIGNING");
      returnResponse(createRes, statusCode, 'Message from Harvest: ', result.error + '', true, userData, auth);
    }
    else {
      onPostExecute();
      //sendConfirmationEmail(auth, this.userData.productOpsEmail);
    }
  });
}

function returnResponse(response, status, title, message, shouldDeleteUser, userData, auth) {
  if (shouldDeleteUser) {
    console.log("DELETING USER!!!!!!!!");
    googleTools.deleteUser(auth, userData, function (err, googleResponse) {
      if (err) {
        return response.status(err.code).json({
          title: 'The Google API returned an error: ',
          message: err + ''
        });
      } else {
        return response.status(status).json({
          title: title,
          message: message
        });
      }
    });
  } else {
    return response.status(status).json({
      title: title,
      message: message
    });
  }
}

module.exports = router;

