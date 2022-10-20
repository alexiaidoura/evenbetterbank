//routes are working via direct URLs

var express = require('express');
//import express from 'express';
var app = express();
var cors = require('cors');
var dal = require('./dal.js');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get("/",(req,res) => {
    res.send('default root -- open to home?')
})

//create new account -- works 
app.get('/account/create/:name/:email/:password', function(req,res){
    //else create user
    console.log('index.js create new account ' + req.params.name,req.params.email,req.params.password)
    dal.create(req.params.name,req.params.email,req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});

//update needs email and amount
app.get('/account/update/:email/:amount', function(req,res){
    dal.update(req.params.email,req.params.amount).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});
//log in -- works direct in browser by url
app.get('/account/findOne/:email/:password', function(req,res) { //changed to findOne from login because needs to be function in dal
    //res.send({ //convert to use dal
    console.log('index.js router call to login page ' + req.params.email+req.params.password); //works
    dal.findOne(req.params.email,req.params.password).
    //email: req.params.email,
        //password: req.params.password
        then((user) => {
            console.log(user); //worked
            res.send(user);
        })
    });
//});

//find balance/user
app.get('/account/find/:email', function(req,res) { //changed to findOne from login because needs to be function in dal
    //res.send({ //convert to use dal
    //console.log('index.js router call to login page ' + req.params.email+req.params.password); //works
    dal.find(req.params.email).
    //email: req.params.email,
        //password: req.params.password
        then((doc) => {
            console.log(doc); //worked
            res.send(doc);
        })
    });

// all accounts -- works
app.get('/account/all', function(req,res) {
    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);