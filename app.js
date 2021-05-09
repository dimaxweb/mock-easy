var express = require('express');
var path = require('path');
const lodash  = require('lodash');
var logger = require('morgan');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let fs = require('fs');

let mocks = require('./mocks-config');

let routeKeys = Object.keys(mocks);
routeKeys.forEach(function(key, idx) {
  routeKeys[idx] = routeKeys[idx]
      .replace(/[/?]/g, '.')
      .replace(/{}/g, '([\\w-]+)')
  ;
  routeKeys[idx] = '^' + routeKeys[idx] + '$';
});


function mockStaticFiles(req, res, next) {
  console.log('req path', req.originalUrl);
  var matchedJson = null;
  var matchedMock = null;
  for (var mocksKey in mocks) {
    if (mocks.hasOwnProperty(mocksKey)) {
      var pathIdx = Object.keys(mocks).indexOf(mocksKey);
      if (new RegExp(routeKeys[pathIdx]).test(req.originalUrl)) {
        matchedMock = mocks[mocksKey];
        console.log('Returning mock json: ' + req.url);
        var mockJson = lodash.get(matchedMock, + req.method + '.response',null);
        if (!mockJson){
          mockJson = matchedMock.mockJson;
        }
        matchedJson = fs.readFileSync(path.join(__dirname, 'mocks',mockJson + '.json'), 'utf8');
        if (matchedMock.randomizeData) {
          matchedJson = JSON.stringify(matchedMock.randomizeData(req, matchedJson));
        }
      }
    }
  }

  if (matchedJson) {
    setTimeout(function() {
      // console.log('matchedMock',matchedMock);
      res.statusCode = matchedMock.statusCode || 200;
      if (matchedMock.statusCode) {return res.end(matchedMock.errMsg);}
      return res.end(matchedJson);
    }, matchedMock.delay || 0);
  } else {
    return next();
  }
}

/* GET home page. */
app.use('*', mockStaticFiles);

module.exports = app;
