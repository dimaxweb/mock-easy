var express = require('express');
var router = express.Router();
var fs = require('fs');

var mocks = require('../mocks-config');
var routeKeys = Object.keys(mocks);
routeKeys.forEach(function(key, idx) {
  routeKeys[idx] = routeKeys[idx]
      .replace(/[/?]/g, '.')
      .replace(/{}/g, '([\\w-]+)')
  ;
  routeKeys[idx] = '^' + routeKeys[idx] + '$';
});


function mockStaticFiles(req, res, next) {

  console.log('we here we gooo');
  var matchedJson = null;
  var matchedMock = null;

  for (var path in mocks) {
    if (mocks.hasOwnProperty(path)) {
      var pathIdx = Object.keys(mocks).indexOf(path);
      if (new RegExp(routeKeys[pathIdx]).test(req.url)) {
        matchedMock = mocks[path];
        // console.log('Returning mock json: ' + req.url);
        var mockJson = matchedMock[req.method];
        if (!mockJson){
          mockJson = matchedMock.mockJson;
        }
        matchedJson = fs.readFileSync('./mocks/' + mockJson + '.json', 'utf8');
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
router('*', mockStaticFiles);

module.exports = router;
