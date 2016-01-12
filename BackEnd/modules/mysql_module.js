var mysql      = require('mysql');
var jwt = require('jsonwebtoken');
var server = require('../server');


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'friends_schema',
    multipleStatements: true
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
        
        //console.log(error);
        //console.log(result);
        //console.log(fields);
            
    });
    
};

exports.loginMysqlProc = function (req,res) {
    connection.query('CALL getLoginInfo(?,?)',
    [req.body.username,req.body.password], function(error, results,fields){
        
        
        if (error) {
            res.send(502,{status:error.message});
        } else {
            
            var test = results[0];
            if (test.length > 0) {
                req.session.kayttaja = test[0].username;
                req.session.userid = test[0].user_id;
                var token = jwt.sign(results,server.secret,{expiresIn:'2h'});
                res.send(200,{status:"Ok", secret:token});
        }
        else {  
            res.send(401,{status:"Wrong username or password"});   
        }
        }
        
    });
    
};

exports.getFriendsForUserByUsername = function (req,res) {
    
    connection.query('CALL getUserFriendsByName(?)',
                     [req.session.kayttaja], function(error,results,fields) {
        
        if(error) {
            res.send(502,{status:error.message});
        } else {
                     
            var data = results[0];
            res.send(data);

        }
    });
}

exports.registerUser = function (req,res) {
    
    connection.query('CALL registerUser(?,?)',
                     [req.body.username, req.body.password], 
                     function (error, results, fields) {
        if(error){
            
            res.status(500).send({status:err.message});
        }
        else{
            res.status(200).send({status:"Ok"});
        }
        
    });
        
}

exports.saveNewFriend = function (req,res) {
    
    connection.query('CALL saveNewFriendById(?,?,?,?)',
                     [req.session.userid,req.body.name,req.body.address,
                      req.body.age], function(error,results,fields) {
        if(error){
            //console.log(error);
            res.status(500).send(error.message);
        }else{
            //console.log(results[0]);
            //res.status(200).json({data:results[0]});
            res.status(200).send(results[0]);
        }
    });
}
        
    
exports.updateFriend = function (req,res) {
    connection.query('CALL updateFriend(?,?,?,?)',
                     [req.body.id, req.body.name, req.body.address, req.body.age],
                     function(error,results,fields) {
        if(error){
            res.status(500).json({message:error.message});
        }else{
            res.status(200).json({message:"Data updated"});
        }
    });
    
}
        
exports.deleteFriend = function (req,res) {
    var toDelete = [];
    if(req.query.forDelete instanceof Array)
        toDelete = req.query.forDelete;
    else{
       toDelete.push(req.query.forDelete); 
    }
    
    for(var i = 0; i>toDelete.length; i++) {
        query += 'DELETE FROM friends WHERE _id='+toDelete[i]+';';
        console.log("poistoon: "+toDelete[i])
    }
    
    connection.query(query, [], function(error,results,fields) {
        if(error){
            console.log(error);
            res.status(500).send({messsage:error.message});
        }else{       
            res.status(200).send({message:'Delete success'});
             }
    });
        
}
