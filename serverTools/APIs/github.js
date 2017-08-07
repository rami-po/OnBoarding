/**
 * Created by Rami Khadder on 7/24/2017.
 */
serverCall = require('../serverCall');
var secret = require('../secrets/github_secret.json');


var githubHeaders = {
  'Content-Type' : 'application/json',
  'Accept' : 'application/vnd.github.v3+json',
  'Authorization': 'Basic ' + new Buffer(secret.user + ":" + secret.password).toString('base64'),
  'user-agent': 'node.js'
};

var githubOptions = {
  host: 'api.github.com',
  port: 443,
  path: '/orgs/productOps/memberships/',
  method: 'PUT',
  headers: githubHeaders
};

exports.invite = function(username, onPostExecute){
  githubOptions.path += username;
  serverCall.getJSON(githubOptions, null, function(statusCode, result) {
    onPostExecute(statusCode, result);
  });
};
