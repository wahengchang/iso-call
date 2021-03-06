// Init ES6 environments for .require()
require('babel/register')();

var express = require('express');
var isocall = require('iso-call');
var browserify = require('browserify-middleware');
var app = express();

// Setup yql iso-call
require('./yql');

// Mount yql iso-call middleware to the express
isocall.setupMiddleware(app);

// Serve the bundled app
// aliasify is required transform to ensure iso-call work properly
// Add these in your package.json:
/*
  "browserify": {
    "transform": [
      "aliasify"
    ]
  }
*/
app.use('/js/yqlconsole.js', browserify('./app.js', {
    standalone: 'YQLConsole'
}));

// Serve the page
app.use(require('./page'));

app.listen(3000);
console.log('Express server started at port 3000');
