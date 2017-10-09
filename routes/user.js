/**
 * Created by Rami Khadder on 7/26/2017.
 */
var express = require('express');
var router = express.Router();
var SQL = require('../serverTools/SQL');
var harvest = require('../serverTools/APIs/harvest');
var jwt = require('jsonwebtoken');

router.post('/home', function(req, res, next){
  console.log("HOME: " + JSON.stringify(req.body));

  jwt.verify(req.body.token, 'secret', function(err, token){
    if (err){
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
    if (err){
      return res.status(500).json({
        title: "An error has occurred!",
        message: "Failed to insert into SQL table"
      });
    }
    else{
      return res.status(200).json({
        title: "Success!",
        message: ""
      });
    }
  });
});

router.post('/emergency', function (req, res, next) {
  SQL.updateEmergencyContacts(req.body, function (err) {
    if (err){
      return res.status(500).json({
        title: "An error has occurred!",
        message: "Failed to insert into SQL table"
      });
    }
    else{
      return res.status(200).json({
        title: "Success!",
        message: ""
      });
    }
  });
});

router.get('/info', function (req, res, next) {
  SQL.getInformationAndContacts(function (err, result) {
    if (err){
      return res.status(500).json({
        title: "An error has occurred!",
        result: err
      });
    }
    else{
      return res.status(200).json({
        title: "Success!",
        result: result
      });
    }
  });
});

module.exports = router;
