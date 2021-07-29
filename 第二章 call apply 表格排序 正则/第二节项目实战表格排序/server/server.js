const express = require('express');
const app= express();
const fs = require('fs')
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' )
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    next();
    });
app.get('/data', (req, res)=>{
    fs.readFile('../json/data.txt',function(err,data){
       res.send(data)
        
    })
});
app.listen(8083, ()=>{
    console.log('Server is running at http://localhost:8083')
})