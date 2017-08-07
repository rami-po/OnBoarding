var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var loginRoutes = require('./routes/login');
var createRoutes = require('./routes/create');
var userRoutes = require('./routes/user');
var appRoutes = require('./routes/app');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/server/login', loginRoutes);
app.use('/server/user', userRoutes);
app.use('/server/create', createRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.render('index.html');
});


module.exports = app;
