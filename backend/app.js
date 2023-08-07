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

app.get('/getData',(req,res) => {
    // const d = pool.query("select * from employeedetails");
    pool.query("select * from employeedetails", (err,result) => {
        if(err){
            console.log("error in db" + err);
            res.status(500).json({message : "err"})
        }else{
            console.log("data fetched");
            console.log("rows results " ,result);
            // console.log(d);

            res.json(result.rows);
        }
    })
})

app.get('/getParticularData/:id',(req,res)=>{
    // const data = req.body;
     console.log(req.params.id);
    pool.query("select * from employeedetails where employeeid = $1",[req.params.id], (err,result) => {
        if(err){
            console.log("error" + err);
            res.status(500).json({message : "error in fetch for update"});
        }else{
            console.log("data fetched fro updation");
            console.log("result us " ,result);
            // res.status(200).json({message :"success in fetch for update"});
            res.json(result.rows[0]);
        }
    });
})

app.post('/updateData',function(req,res){
    
    const data = req.body;

    pool.query("UPDATE  employeedetails SET employeeid = $1 , ename = $2, edesignation = $3, esalary = $4, ecity = $5 WHERE employeeid = $6",[data.eidUpdate, data.enameUpdate,data.edesignationUpdate, data.esalUpdate, data.ecityUpdate,data.eidUpdate] ,(err,result) => {
        if(err){
            console.log("error" + err);
            res.status(500).json({message : "error updating values"});
        }else{
            console.log("data updated");
            res.status(200).json({message :"success updating values"});
        }
    });

});



server.listen(3002,function(){ 
    console.log("Server listening on port: 3002");
});