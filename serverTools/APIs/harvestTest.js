var express = require('express');
var harvest = require('./harvest');
var googleTest = require('./googleTest');

var testData = {
  "firstName": "delete",
  "lastName": "me",
  "personalEmail": "ramikhadder@gmail.com",
  "productOpsEmail": "rami-test@productOps.com",
  "hasGithub": true,
  "hasSlack": false
};

function test(){
  harvest.createHarvestUser(testData, function (statusCode, result, harvestUserData) {
    console.log("statuscode: " + statusCode + " result: " + JSON.stringify(result) + " harvestData: " + JSON.stringify(harvestUserData));
    googleTest.callTestSendEmail(harvestUserData);
  })
}

function test2(){
  harvest.getUser('rami.test@productops.com', function (statusCode, result) {
    console.log('result: ' + JSON.stringify(result) + 'status: ' + statusCode);
  });
}

test2();
