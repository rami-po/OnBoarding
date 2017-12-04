/**
 * Created by Rami Khadder on 7/26/2017.
 */
var express = require('express');
var router = express.Router();
var SQL = require('../serverTools/SQL');
var harvest = require('../serverTools/APIs/harvest');
var jwt = require('jsonwebtoken');
var tokenSecret = require('../serverTools/secrets/token_secret.json')
var GoogleAuth = require('google-auth-library');
var googleAuth = require('../serverTools/googleAuth');
var googleTools = require('../serverTools/APIs/google');
var fs = require('fs');
var auth = new GoogleAuth;
var oauthSecret = require('../serverTools/secrets/oauth.json');
var client = new auth.OAuth2(oauthSecret.clientId, '', '');

router.post('/auth', function (req, res, next) {
  console.log('auth!');
  fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return res.status(500).json({
        title: 'error',
        message: err
      });
    } else {
      // Authorize a client with the loaded credentials
      googleAuth.authorize(JSON.parse(content), function (auth) {
        console.log(req.body.token);
        console.log(oauthSecret.clientId);
        if (req.body.token != null) {
          client.verifyIdToken(
            req.body.token, //token that is passed through
            oauthSecret.clientId, //clientId
            function (e, login) {
              if (e) { //error
                console.log(e);
                return res.status(500).json({
                  title: 'error',
                  message: e
                });
              }
              var payload = login.getPayload();
              var userid = payload['sub'];
              // If request specified a G Suite domain:
              var domain = payload['hd'];

              if (domain === 'productops.com') { //we only want @productops.com to enter admin
                googleTools.getMemberFromGroup(auth, payload['email'], function (err, content) { //checks to see if they're apart of the management team
                  if (err) {
                    console.log(err);
                    return res.status(500).json({
                      title: 'error',
                      message: err
                    });
                  } else {
                    console.log(content);
                    return res.status(200).json({
                      title: 'success'
                    });
                  }
                })
              } else {
                return res.status(500).json({
                  title: 'error',
                  message: 'not productops domain'
                });
              }
            });
        } else {
          return res.status(500).json({
            title: 'error',
            message: 'undefined token'
          });
        }

      });
    }
  });
});

router.post('/home', function (req, res, next) {
  console.log("HOME: " + JSON.stringify(req.body));

  jwt.verify(req.body.token, tokenSecret.secret, function (err, token) {
    if (err) {
      return res.status(500).json({
        title: "Error!",
        message: "Token not found!"
      });
    }
    else {
      console.log(token);

      res.status(200).json({
        title: "Success!",
        token: token,
        code: req.body
      });
    }
  });

  /*
   harvest.getUser(req.body.id, function(statusCode, result){
   if (statusCode === 200){
   console.log("woo!");
   res.status(statusCode).json({
   title: "Success",
   user: result.user
   });
   } else {
   console.log(":(");
   res.status(statusCode).json({
   title: "Error!"
   });
   }
   });
   */
});

router.post('/personal', function (req, res, next) {
  SQL.updatePersonalInformation(req.body, function (err) {
    if (err) {
      return res.status(500).json({
        title: "An error has occurred!",
        message: "Failed to insert into SQL table"
      });
    }
    else {
      return res.status(200).json({
        title: "Success!",
        message: ""
      });
    }
  });
});

router.post('/emergency', function (req, res, next) {
  SQL.updateEmergencyContacts(req.body, function (err) {
    if (err) {
      return res.status(500).json({
        title: "An error has occurred!",
        message: "Failed to insert into SQL table"
      });
    }
    else {
      return res.status(200).json({
        title: "Success!",
        message: ""
      });
    }
  });
});

router.get('/info', function (req, res, next) {
  SQL.getInformationAndContacts(function (err, result) {
    if (err) {
      return res.status(500).json({
        title: "An error has occurred!",
        result: err
      });
    }
    else {
      return res.status(200).json({
        title: "Success!",
        result: result
      });
    }
  });
});

module.exports = router;
