/**
 * Created by Rami Khadder on 7/25/2017.
 */
var express = require('express');
var fs = require('fs');
var googleAuth = require('../googleAuth');
var googleTools = require('./google');

var testData = {
  "firstName": "first_name!!",
  "lastName": "last_name!!",
  "personalEmail": "ramikhadder@gmail.com",
  "productOpsEmail": "product_ops",
  "hasGithub": true,
  "hasSlack": false
};

function testSendEmail(harvestUserData){
  fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
    }
    else {
      googleAuth.authorize(JSON.parse(content), function(auth) {
        googleTools.sendConfirmationEmail(auth, testData, harvestUserData, function(err, response){
          if (err) {
            console.log("err: " + err);
          }
          else {
            console.log("swag: " + response);
          }
        });
      });
    }
  });
}

exports.callTestSendEmail = function (harvestUserData) {
  testSendEmail(harvestUserData);
};

function testGetFile(fileId){

  fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
    }
    else {
      googleAuth.authorize(JSON.parse(content), function(auth) {
        googleTools.getFile(auth, fileId, function(err, response){
          if (err){
            console.log(err);
          }
          else{
            console.log(response);
          }
        });
      });
    }
  });
}

//testGetFile('0B05-ziYurftkc3RhcnRlcl9maWxlX2Rhc2hlclYw');
