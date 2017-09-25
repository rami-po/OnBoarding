/**
 * Created by Rami Khadder on 7/25/2017.
 */
var express = require('express');
var fs = require('fs');
var googleAuth = require('../googleAuth');
var googleTools = require('./google');

var testData = {
  firstName: 'Rami',
  lastName: 'Test',
  personalEmail: 'rami.khadder@productops.com',
  productOpsEmail: 'null',
  hasHarvest: true,
  hasGithub: true,
  hasSlack: false,
  group: 'Employee',
  project: { id: 8126466, name: 'PCS' },
  startDate: 'Mon Aug 14 2017' };


function testSendEmail(harvestUserData){
  fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
    }
    else {
      googleAuth.authorize(JSON.parse(content), function(auth) {
        googleTools.sendProjectManagerEmail(auth, testData, function(err, response){
          if (err) {
            console.log("err: " + JSON.stringify(err));
          }
          else {
            console.log("swag: " + JSON.stringify(response));
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
