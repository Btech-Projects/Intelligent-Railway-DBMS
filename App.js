require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
var mysql = require('mysql');
var md5 = require('md5');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database : 'login',
  multipleStatements: true
});

app.get('/', function(req,res){
    res.render('home');
  })

  app.get('/book', function(req,res){
    res.render('book');
  })

  app.get('/cancel', function(req,res){
    res.render('cancel');
  }) 
  
  app.get('/modify', function(req,res){
    res.render('modify');
  })
  
  
  app.get('/view', function(req,res){
    res.render('view');
  })

  app.get('/pnr', function(req,res){
    res.render('pnr');
  })

  app.get('/confirm', function(req,res){
    res.render('confirm');
  })

  app.get('/contact', function(req,res){
    res.render('contact');
  })

  app.get('/forgetpass', function(req,res){
    res.render('forgetpass');
  })

  app.get('/landing', function(req,res){
    res.render('landing');
  })

  app.get('/login', function(req,res){
    res.render('login');
  })

  app.post('/login', function(req,res){
    const username=req.body.email;
    const password=md5(req.body.pwd);
    con.query(`select email , password from login where email='${username}' and password=aes_encrypt('${password}','${process.env.KEY}')`, (err, foundUser) => {
      if(err) console.log("failed1");
      else{
          if (foundUser[0]){
              res.render('home');
          }
          else{
              res.render('login');
          }
      }
   
  });
  })

  app.get('/signup', function(req,res){
    res.render('signup');
  })

  app.post('/signup', function(req,res){
    const email1 = req.body.mail;
    const password1 = md5(req.body.pwd1);
    const password2 = md5(req.body.pwd2);
    if(password1 === password2){
      con.query(`INSERT INTO login values('${email1}',aes_encrypt('${password1}', '${process.env.KEY}'))`, (err) => {
        if(err){
          res.render('signup');
        }
        else{
         res.render('login');
        }
      })
    }
    res.render('signup');
  })


  app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  