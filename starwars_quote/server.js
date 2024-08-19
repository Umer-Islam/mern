console.log("it works...");
const express = require("express");

const app = express()

app.listen(3000,_=>{
    console.log("listening on port 3000")
})
console.log(__dirname)
app.get('/',(req,res)=>{
    console.log(__dirname)
res.sendFile(__dirname + '/index.html')
})