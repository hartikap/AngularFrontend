var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var database = require('./modules/database');
var queries = require('./modules/queries');
var person = require('./modules/person'); 
var user = require('./modules/user');

var app = express();

//=====================Middlewares========================
//Bodyparser json() middleware parses the json object
//from HTTP POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(function(req,res,next){
    
    console.log(req.method);
    console.log(req.path);
    console.log(__dirname);
    console.log(req.body);
    //console.log(database.Person);
    //database.myFunction();
    //Send request forward in stack
    next();
});


// Define middlewares for our static files (.html, .css, .js files
// that are loaded by browser when parsing index.html file)
app.use('/',express.static(path.join(__dirname, '../FrontEnd/views')));
app.use('/FrontEnd/css',express.static(path.join(__dirname, '../FrontEnd/css')));
app.use('/FrontEnd/lib',express.static(path.join(__dirname, '../Frontend/lib')));
app.use('/FrontEnd/module',express.static(path.join(__dirname, '../Frontend/module')));
app.use('/FrontEnd/controllers',express.static(path.join(__dirname, '../Frontend/controllers')));
app.use('/FrontEnd/factories',express.static(path.join(__dirname, '../Frontend/factories')));


//====================OUR REST API MIDDLEWARES============
app.use('/persons',person);
app.use('/friends',user);



//=====================ROUTERS============================

app.listen(3000);