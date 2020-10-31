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
  password: "12345",
  database : 'login',
  multipleStatements: true
});


var result1 = '';
var luser='';
var seats=0;
var modify='';
var details=[];

app.get('/', function(req,res){
    if(luser === ''){
      res.render('login');
    }
    else{
      
        res.render('home',{ruser: luser});
      
      
    }
  })

  app.post('/logout', function(req,res){
    luser='';
    res.render('login');
  })

  app.get('/update', function(req,res){
    const query=`select * from modify_details where email='${luser}' and status='Pending';`;
    con.query(query, function(err,result){
      if(err) throw err;
      res.render('update',{result : result});
    })
    
  })

  app.post('/update', function(req,res){
    let i = req.body.list;
    const query=`select * from modify_details where email='${luser}' and status='Pending';`;
    con.query(query, function(err,result){
      if(err) throw err;
      var pnr2=result[i].pnr;
      let query2=`update pnr_details set seat_no='${result[i].applied_seat_no}' where trainno=${result[i].trainno} and class='${result[i].class}' and seat_no=${result[i].curr_seat_no} and pnr=${result[i].pnr};`;
      query2+=`update pnr_details set seat_no='${result[i].curr_seat_no}' where trainno=${result[i].trainno} and class='${result[i].class}' and seat_no=${result[i].applied_seat_no} and pnr<>${result[i].pnr};`;
      con.query(query2,function(err,result1){
        if(err) throw err;
        let query3=`update modify_details set status='Approved' where email='${luser}' and trainno=${result[i].trainno} and class='${result[i].class}' and pnr=${result[i].pnr};`;
        con.query(query3, function(err){
          if(err) throw err;
          res.render('home',{ruser: luser});
        })
      })
      res.render('home',{ruser : luser});
    })
  })

  app.post('/reject', function(req,res){
    let query3=`update modify_details set status='Rejected' where email='${luser}' and status='Pending'`;
        con.query(query3, function(err){
          if(err) throw err;
          res.render('home',{ruser: luser});
        })
  })

 

  app.get('/book', function(req,res){
    res.render('book');
  })

  app.post('/book', function(req,res){
    var from = req.body.from;
    var to = req.body.to;
    // con.connect(function(err) {
    //   if (err) throw err;
      con.query(`select * from classseats where sp='${from}' and dp='${to}'`, function (err, result) {
        if (err) throw err;
        result1= result;
        res.render('show',{result: result});
      });
    // });
  } )

  app.post('/show', function(req,res){
    let i = req.body.list;
    seats=parseInt(req.body.sit[i]);
    var stat = '';
    let query='';
   if(seats===0){
     res.render('home',{ruser: luser});
   }
    if(result1[i].seatsleft >= seats){
      stat = "Confirmed";
    }
    else{
      stat = "WAITING";
      query+=`update classseats set seatsleft=${result1[i].seatsleft}+${i} where trainno=${result1[i].trainno} and sp='${result1[i].sp}' and dp='${result1[i].dp}' and fare=${result1[i].fare} and class='${result1[i].class}';`;
      
    }
    query=`INSERT INTO ticket(trainno, sp, dp, tfare,class,nos,status) values('${result1[i].trainno}','${result1[i].sp}','${result1[i].dp}','${result1[i].fare}','${result1[i].class}','${seats}','${stat}');`;
     con.query(query, (err) => {
      if(err){
        res.render('show',{result: result1});
      }
      else{
        if(stat === "WAITING"){
          res.render('home',{ruser:luser});
        }
       
       res.render('passenger',{number: seats});
      }
    })
    
    // res.render('passenger',{number: seats});
  })

  app.post('/passenger', function(req,res){
    var det=req.body.det;
    var query="select * from ticket where pnr=(select max(pnr) from ticket);";
    con.query(query, function (err, result) {
      if (err) throw err;
      result1= result[0];
      var query2=`INSERT INTO pnr_details(pnr,trainno, email,name,class) values(${result1.pnr},${result1.trainno},'${luser}','${det[0]}','${result1.class}');`;
      for(var i=1;i < seats; i++){
        query2+=`INSERT INTO pnr_details(pnr,trainno, email,name,class) values(${result1.pnr},${result1.trainno},'${luser}','${det[i]}','${result1.class}');`;
      }
      con.query(query2, function (err) {
        if (err) throw err;
        console.log(query2);
        res.render('home',{ruser: luser});
      });
    });
    alert("Booked");
    res.render('home',{ruser: luser});
  }) 

  app.get('/cancel', function(req,res){
    res.render('cancel');
  }) 

app.post('/cancel', function(req,res){
  var pnr=req.body.pnr;
  let query4=`select * from pnr_details where pnr=${pnr} and email='${luser}';`;
  let query=`select * from ticket where pnr=${pnr};`;
  let query3=`update ticket set status='Cancelled' where pnr=${pnr};`;
  con.query(query4, function(err,Result3){
    if(err) console.log(err);
    else{
      if(Result3[0]){
        con.query(query, (err, foundResult) => {
          if(err) console.log(err);
          else{
            var new1 =foundResult[0];
            var query2=`UPDATE classseats SET seatsleft=seatsleft+${new1.nos} where trainno=${new1.trainno} and class='${new1.class}' and sp='${new1.sp}' and dp='${new1.dp}';`;
            // let query2=`UPDATE classseats SET seatsleft=20 where trainno=${new1.trainno} AND class='${new1.class}' AND sp='${new1.sp}' AND dp='${new1.dp}';`;
            console.log(query2);
            con.query(query2, (err, foundResult2) => {
              if(err) console.log(err);
              else{
                con.query(query3, (err, foundResult) => {
                  if(err) console.log("failed1");
                  else{
                    let query4=`delete from pnr_details where pnr=${pnr};`;
                    con.query(query4, function(err){
                      if(err) throw err;
                      res.render('home',{ruser: luser});
                    })
                  
                }
              });
            }
            });
          }
       
      });
      }
      else{
        res.render('cancel');
      }
    }
  })
  
})
  
  app.get('/modify', function(req,res){
    // let query=`select pnr from pnr_details where email='${luser}';`;
    // con.query(query, function(err, result){
    //   if(err) throw err;
    //   res.render('modify',{result: result});
    // })
    res.render('modify');
  })
  
  app.post('/modify', function(req,res){
    var pnr=req.body.pnr;
  let query=`select * from pnr_details where pnr=${pnr} and email='${luser}';`;
  con.query(query, (err, foundResult) => {
    if(err) console.log("failed1");
    else{
        if (foundResult[0]){
          // console.log(foundResult);
          modify=foundResult[0];
            res.render('modify2',{pnrres: foundResult});
        }
        else{
            res.render('modify');
        }
    }
 
});
  })


  app.post('/modify2', function(req,res){
    var option = req.body.scripts;
    var change= req.body.cseat;
    let query=`select * from pnr_details where trainno=${modify.trainno} and class='${modify.class}' and seat_no=${change};`;
    con.query(query, (err, foundResult) => {
      if(err) console.log(err);
      else{
          if (foundResult[0]){
            console.log(foundResult[0]);
            var query5=`insert into modify_details(pnr,trainno ,email ,class ,curr_seat_no , applied_seat_no, status)
            values (${foundResult[0].pnr}, ${foundResult[0].trainno}, '${foundResult[0].email}', '${foundResult[0].class}',${change}, ${option}, 'Pending'); `;
            con.query(query5, (err) => {
              if(err) console.log(err);
              res.render('home',{ruser: luser});
            })
            // var query2=`update pnr_detailts a inner join pnr_details b on a.pnr <> b.pnr set a.seat_no= b.seat_no, where trainno=${modify.trainno} and name='${modify.name}' and class='${modify.class}' and seat_no=${change};`;
            
          }
          else{
            console.log('modify2 2');
            let query2=`update pnr_details set seat_no='${change}' where trainno=${modify.trainno} and class='${modify.class}' and seat_no=${option};`;
            con.query(query2, (err) => {
              if(err) console.log(err);
              res.render('home',{ruser: luser});
            })
          }
      }
   
    });
    // res.render('modify');
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
      if(err) console.log("failed1");
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