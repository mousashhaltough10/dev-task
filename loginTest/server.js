var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var staticFiles = require ('serve-static');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// log all api traffic to console
app.use('api/*',req=>{
    console.log(req);
    next();
});



app.post('/api/login', function (req, res) {

    if(req.body && req.body.email && req.body.password){
        if(req.body.email == '123@123.123' && req.body.password == '123123'){
            var user ={
                name:"Alex Jones"
                , email:req.body.email
                , password:req.body.password
                , profilePic:"http://lorempixel.com/500/500/people/"
            };
            res.send(200, user);
        }else
            res.send(400,{message:'Login failed: Invalid username or password.'});
    }
    else
        res.send(422,{message:'Please enter your email and password!'});
});


var serve = staticFiles('public/', {'index': ['index.html']});
app.use(serve);


app.listen(3000);
console.log("running on http://localhost:3000");