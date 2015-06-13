var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var assetmanager = require('assetmanager');
var konfig = require('konfig');
var bunyan = require('bunyan');

var routes = require('./routes/index');

var app = express();


global.config = konfig();

app.log = bunyan.createLogger({
  name: 'projects',
  streams: [
    {
      type: 'rotating-file',
      path: 'logs/projects.log',
      period: '1d',
      count: 3
    },
    {
      stream: process.stdout,
      level: "info"
    }
  ]
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var assets = assetmanager.process({
  assets: require('./assets.json'),
  debug: (process.env.NODE_ENV !== 'production'),
  webroot: 'public'
});

app.locals.assets = assets;

app.use('/', routes);

var apiRoutes = require('./routes/api')(app);
app.use('/api', apiRoutes);

var projectsRoutes = require('./routes/projects');
app.use('/projects', projectsRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
