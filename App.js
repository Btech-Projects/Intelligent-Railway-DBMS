require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
var mysql = require('mysql');
var md5 = require('md5');
const { result } = require('lodash');
var alert = require('alert');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database : 'railway',
  multipleStatements: true
});

con.connect(function(err){
  if(err) {
      // mysqlErrorHandling(connection, err);
      console.log("\n\t *** Cannot establish a connection with the database. ***");

      con = reconnect(con);
  }else {
      console.log("\n\t *** New connection established with the database. ***")
  }
});
function reconnect(con){
  console.log("\n New connection tentative...");

  //- Destroy the current connection variable
  if(con) con.destroy();

  //- Create a new one
  var con = mysql_npm.createConnection(db_config);

  //- Try to reconnect
  con.connect(function(err){
      if(err) {
          //- Try to connect every 2 seconds.
          setTimeout(reconnect, 3000);
      }else {
          console.log("\n\t *** New connection established with the database. ***")
          return con;
      }
  });
}

//- Error listener
con.on('error', function(err) {

  //- The server close the connection.
  if(err.code === "PROTOCOL_CONNECTION_LOST"){    
      console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
      con = reconnect(con);
  }

  //- Connection in closing
  else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
      console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
      con = reconnect(con);
  }

  //- Fatal error : connection variable must be recreated
  else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
      console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
      con = reconnect(con);
  }

  //- Error because a connection is already being established
  else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
      console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
  }

  //- Anything else
  else{
      console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
      con = reconnect(con);
  }

});

var result1 = '';
var luser='';

app.get('/', function(req,res){
    if(luser === ''){
      res.render('login');
    }
    else{
      res.render('home',{ruser: luser});
    }
  })

  app.get('/book', function(req,res){
    res.render('book');
  })

  app.post('/book', function(req,res){
    var from = req.body.from;
    var to = req.body.to;
    // con.connect(function(err) {
    //   if (err) throw err;
      con.query(`select * from classseats where sp='${from}' and dp='${to}'`, function (err, result, fields) {
        if (err) throw err;
        result1= result;
        res.render('show',{result: result});
      });
    // });
  } )

  app.post('/show', function(req,res){
    let i = req.body.list;
    let seats=parseInt(req.body.sit[i]);
    var stat = '';
    if(result1[i].seatsleft >= seats){
      stat = "Confirmed";
    }
    else{
      stat = "WAITING";
    }
    let query=`INSERT INTO ticket(trainno, sp, dp, tfare,class,nos,status) values('${result1[i].trainno}','${result1[i].sp}','${result1[i].dp}','${result1[i].fare}','${result1[i].class}','${seats}','${stat}');`;
    con.query(query, (err) => {
      if(err){
        res.render('show',{result: result1});
      }
      else{
       res.render('home',{ruser: luser});
      }
    })
    alert("Booked");
    res.render('home',{ruser: luser});
  })

  app.get('/cancel', function(req,res){
    res.render('cancel');
  }) 
  
  app.get('/modify', function(req,res){
    res.render('modify');
  })
  
  
  app.get('/enquiry', function(req,res){
    res.render('enquiry');
  })

  app.post('/enquiry', function(req,res){
    var trnno=req.body.trnno;
  let query1=`select * from schedule where trainno=${trnno};`;
  con.query(query1, (err, foundResult1) => {
    if(err) console.log(err);
    else{
        if (foundResult1){
            res.render('details',{pnrres: foundResult1});
        }
        else{
            res.render('enquiry');
        }
    }
 
});
})

  app.get('/pnr', function(req,res){
    res.render('pnr');
  })

app.post('/pnr', function(req,res){
  var pnr=req.body.pnr;
  let query=`select * from ticket where pnr=${pnr};`;
  con.query(query, (err, foundResult) => {
    if(err) console.log("failed1");
    else{
        if (foundResult){
            res.render('view',{pnrres: foundResult[0]});
        }
        else{
            res.render('pnr');
        }
    }
 
});
})

  app.get('/contact', function(req,res){
    res.render('contact');
  })

  // app.get('/forgetpass', function(req,res){
  //   res.render('forgetpass');
  // })

  app.get('/landing', function(req,res){
    res.render('landing');
  })

  app.get('/login', function(req,res){
    res.render('login');
  })

  app.post('/login', function(req,res){
    const username=req.body.email;
    const password=md5(req.body.pwd);
    con.query(`select email , password from login where email='${username}' and password=aes_encrypt('${password}','${process.env.KEY}');`, (err, foundUser) => {
      if(err) console.log(err);
      else{
          if (foundUser[0]){
            luser=foundUser[0].email;
              res.render('home',{ruser: luser});
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
    console.log(password1);
    console.log(password2);
    if(password1 === password2){
      con.query(`INSERT INTO login values('${email1}',aes_encrypt('${password1}', '${process.env.KEY}'));`, (err) => {
        if(err){
          res.render('signup');
        }
        else{
         res.render('login');
        }
      })
    }
    res.render('login');
  })


  app.listen(3000, function() {
    console.log("Server started on port 3000");
  });