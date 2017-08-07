/**
 * Created by Rami Khadder on 7/27/2017.
 */
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//serverTools
var harvest = require('../serverTools/APIs/harvest');
var SQL = require('../serverTools/SQL');

router.post('/', function (req, res, next) {
  SQL.getUser(req.body.username, function(err, result){
    if (err){
      return res.status(500).json({
        title: 'Login failed',
        message: 'An error occurred while logging in'
      });
    }
    else if (result.length <= 0){
      return res.status(401).json({
        title: 'Login failed',
        message: 'User not found'
      });
    }
    else {
      if (!bcrypt.compareSync(req.body.password, result[0].password)){
        return res.status(401).json({
          title: 'Login failed',
          message: 'Invalid login credentials'
        });
      }
      var token = jwt.sign({user: result}, 'secret', {expiresIn: 3600});
      res.status(200).json({
        title: 'Successfully logged in',
        token: token,
        user: result[0].user
      });
    }
  })

  /*

  harvest.getUser(req.body.ID, function (statusCode, result) {
    console.log(result);
    if (statusCode === 200){
      //var token = jwt.sign({user: result.user}, 'secret', {expiresIn: 3600});
      return res.status(statusCode).json({
        title: 'Success',
        //token: token,
        //userID: response.obj.id
        user: result.user
      });
    }
    else {
      return res.status(statusCode).json({
        title: 'Message from Harvest: ',
        message: result.error + '. Make sure you entered your ID correctly.'
      });
    }
  });

  */
});

module.exports = router;
