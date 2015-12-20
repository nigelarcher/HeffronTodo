//Lets require/import the HTTP module
var express = require('express');
var app = express();
var http = require('http');


var sassMiddleware = require('node-sass-middleware');

var srcPath = __dirname + '/sass';
var destPath = __dirname + '/app/css';


//Lets define a port we want to listen to
const PORT=8080; 

app.use('/css', sassMiddleware({
  src: srcPath,
  dest: destPath,
  debug: true,
  outputStyle: 'expanded'
}));


app.use(express.static(__dirname + '/app'));                 // set the static files location /public/img will be /img for users
app.use('/lib', express.static(__dirname + '/bower_components'));                 // set the static files location /public/img will be /img for users
app.listen(PORT);
console.log("App listening on port %d", PORT);

