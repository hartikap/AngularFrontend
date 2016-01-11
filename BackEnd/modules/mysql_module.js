var mysql      = require('mysql');
var jwt = require('jsonwebtoken');
var server = require('../server');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'friends_schema'
});
 


connection.connect(function(err) {
  if (err) {
    console.error('error connecting to mySQL db: ' + err.message);
    return;
  }
  console.log('connected to mysql server: database friends_schema');
});


exports.loginMysql = function (req, res) {
    connection.query('SELECT * FROM user WHERE username=? and pass=?',
    [req.body.username,req.body.password], function(error, result,fields){
        
        console.log(error);
        console.log(result);
        console.log(fields);
            
    });
    
};

exports.loginMysqlProc = function (req,res) {
    connection.query('CALL getLoginInfo(?,?)',
    [req.body.username,req.body.password], function(error, result,fields){
        
        if (error) {
            res.send(502,{status:error.message});
        } else if (result.length > 0) {
            req.session.kayttaja = result.username;
            var token = jwt.sign(result,server.secret,{expiresIn:'2h'});
                res.send(200,{status:"Ok", secret:token});
        }
        else {  
            res.send(401,{status:"Wrong username or password"});   
        }
            
    });
    
};