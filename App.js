const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/', function(req,res){
    // console.log(posts);
    res.render('home');
  })

  app.get('/book', function(req,res){
    // console.log(posts);
    res.render('book');
  })

  app.get('/cancel', function(req,res){
    // console.log(posts);
    res.render('cancel');
  }) 
  
  app.get('/modify', function(req,res){
    // console.log(posts);
    res.render('modify');
  })
  
  
  app.get('/view', function(req,res){
    // console.log(posts);
    res.render('view');
  })

  app.get('/pnr', function(req,res){
    // console.log(posts);
    res.render('pnr');
  })

  app.get('/confirm', function(req,res){
    // console.log(posts);
    res.render('confirm');
  })

  app.get('/contact', function(req,res){
    // console.log(posts);
    res.render('contact');
  })

  app.get('/forgetpass', function(req,res){
    // console.log(posts);
    res.render('forgetpass');
  })

  app.get('/login', function(req,res){
    // console.log(posts);
    res.render('login');
  })

  app.get('/signup', function(req,res){
    // console.log(posts);
    res.render('signup');
  })


  app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  