/**
 * Created by Rami Khadder on 7/24/2017.
 */
var serverCall = require('../serverCall');
var secret = require('../secrets/harvest_secret.json');

var harvestHeaders = {
  'Content-Type' : 'application/json',
  'Accept' : 'application/json',
  'Authorization': 'Basic ' + new Buffer(secret.user + ":" + secret.password).toString('base64')
};

var harvestOptions = {
  host: 'productops.harvestapp.com',
  port: 443,
  path: '',
  method: 'POST',
  headers: harvestHeaders
};

var harvestUserData = {
  "user": {
    "email": "",
    "is_admin": false,
    "is_project_manager": false,
    "first_name": "",
    "last_name": "",
    "timezone": "Pacific Time (US & Canada)",
    "is_contractor": false,
    "telephone": "",
    "is_active": true,
    "has_access_to_all_future_projects": false,
    "default_hourly_rate": 0,
    "cost_rate": null
  }
};

var harvestAssignData = {
  "user": {
    "id": 0
  }
};

exports.createHarvestUser = function(userData, onPostExecute){
  harvestUserData.user.email = userData.productOpsEmail;
  harvestUserData.user.first_name = userData.firstName;
  harvestUserData.user.last_name = userData.lastName;
  if (userData.type === 'Contractor'){
    harvestUserData.user.is_contractor = true;
  }

  harvestOptions.path = '/people';
  harvestOptions.method = 'POST';
  serverCall.getJSON(harvestOptions, JSON.stringify(harvestUserData), function(statusCode, result) {
    if (statusCode !== 201){
      onPostExecute(statusCode, result);
    } else {
      exports.getUser(harvestUserData.user.email, function(statusCode, result){
        onPostExecute(statusCode, result);
      });
    }
  });
};

exports.deleteHarvestUser = function(userId, onPostExecute){
  harvestOptions.path = '/people/' + userId;
  harvestOptions.method = 'DELETE';
  serverCall.getJSON(harvestOptions, null, function(statusCode, result) {
    console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
    onPostExecute(statusCode, result);
  });
};

exports.getProjects = function(onPostExecute){
  harvestOptions.path = '/projects';
  harvestOptions.method = 'GET';
  serverCall.getJSON(harvestOptions, null, function(statusCode, result) {
    onPostExecute(statusCode, result);
  })
};

exports.assignUserToProject = function (userID, projectID, onPostExecute) {
  this.getUser(userID, function(statusCode, result){
    harvestAssignData.user.id = result.user.id;

    harvestOptions.path = '/projects/' + projectID + '/user_assignments';
    harvestOptions.method = 'POST';

    serverCall.getJSON(harvestOptions, JSON.stringify(harvestAssignData), function(statusCode, result) {
      onPostExecute(statusCode, result);
    })
  });
};

exports.getUser = function(ID, onPostExecute){
  harvestOptions.path = '/people/' + ID;
  harvestOptions.method = 'GET';

  serverCall.getJSON(harvestOptions, null, function(statusCode, result) {
    onPostExecute(statusCode, result);
  })

};
