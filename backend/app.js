const { pool } = require('./DbConnection');
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const { error, log } = require('console');
//const helmet = require('helmet');



const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use (bodyParser.urlencoded());
app.use(express.static(path.join(__dirname,'../frontend')));
//app.use(helmet());


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'../frontend/employeeRegister.html'));
});

app.post('/insert',function(req,res){
    
    const data = req.body;
    // try{
         //res.end();
    // }catch(err){
        // console.error("err" +error);
        //res.end();
    // }
    // res.sendFile(path.join(__dirname,'../frontend/employeeRegister.html'));
    // res.sendStatus(200);
    //res.setHeader("Access-Control-Allow-Origin", "http://localhost:3002");


    pool.query("INSERT INTO employeedetails(employeeid,ename,edesignation,esalary,ecity) values ($1, $2, $3, $4, $5)",[data.id, data.name,data.designation, data.salary, data.city] ,(err,result) => {
        if(err){
            console.log("error" + err);
            res.status(500).json({message : "error"});
        }else{
            console.log("data inserted");
            res.status(200).json({message :"success"});
        }
    });

});



server.listen(3002,function(){ 
    console.log("Server listening on port: 3002");
});