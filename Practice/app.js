const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');


// create connection 

const db = mysql.createConnection({
    host : 'localhost' ,
    user : 'root' ,
    password : '' ,
    database : 'nodejs'
});

db.connect(
    (err)=> {
      if(err){
          throw err;
      }
      console.log('connected');
    }
);

const app = express();
app.use(bodyparser.json());

app.get('/createdb' , (req ,res)=> {
    let sql = 'CREATE DATABASE nodejs';
    db.query(sql ,(err ,result)=>{
       if(err){
           throw err ;
       }
       res.send('Database created');
    })
} )



app.get('/createposttable' , (req ,res)=> {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT ,title VARCHAR(255) ,body VARCHAR(255) , PRIMARY KEY (id))';
    db.query(sql ,(err ,result)=>{
       if(err){
           throw err ;
       }
       res.send('Posts table created');
    })
} )


app.post('/addpost' , (req ,res) =>{
    //    let post  = {
    //        title : "Angular is fun" ,
    //        body  : "Angular is one og the best frontend framework here , Let's learn !"
    //    };

    let post  = {
        title : req.params.title ,
        body  : req.params.body
    };

       let sql = "INSERT INTO posts SET ?";
       let query = db.query(sql , post , (err , result)=> {
        if(err){
            throw err ;
        }
        res.send('Posts table data added');
       })
})


app.get('/getposts' , (req ,res) =>{
    let sql = "SELECT * FROM posts";
    let query = db.query(sql , (err , result)=> {
     if(err){
         throw err ;
     }
     return res.status(200).json({result});
    })
})


app.get('/getposts/:id' , (req ,res) =>{
    let sql =   `SELECT * FROM posts WHERE id = ${req.params.id}` ;
    let query = db.query(sql , (err , result)=> {
     if(err){
         throw err ;
     }
     return res.status(200).json({result});
    })
})


app.delete('/getposts/:id' , (req ,res) =>{
    let sql =   `DELETE FROM posts WHERE id = ${req.params.id}` ;
    let query = db.query(sql , (err , result)=> {
     if(err){
         throw err ;
     }
     return res.status(200).json({result});
    })
})




app.listen('3000' , ()=> {
    console.log('Server Started');
});
