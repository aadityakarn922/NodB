// const express=require('express')
// const cookieParser=require("cookie-parser")

// const app=express()
// app.use(cookieParser())

// app.get("/",(req,res)=>
// {
//     res.cookie("name","aaditya")
//     res.send("done")
// })
// app.get("/read",(req,res)=>
// {
//     console.log(req.cookies)
//     res.send("read page")
// })
// app.listen(3000,()=>{
//     console.log("running")
// })


const express = require("express")
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")
const cookieParser=require("cookie-parser")


const app = express()
app.use(cookieParser())

const saltRounds = 10

app.get("/", (req, res) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return res.send("Error generating salt")

        bcrypt.hash("hihihi", salt, function (err, hash) {
            if (err) return res.send("Error hashing password")

            console.log(hash)
            res.send(hash)
        })
    })
})
app.get("/results",(req,res)=>
{
    bcrypt.compare("hihihi","$2b$10$8zwfCGZ3wBoxx9QVbb5mkevT6d09fMOMSyzy25z6/9QKXNvbXktg2", function(err, result) {
    // result == true
    console.log(result)
});
})
app.get("/read1",(req,res)=>{
    let token=jwt.sign({email:"aaditya@gmail.com"},"secret")
    res.cookie("token",token)
    res.send("done")
})
app.get("/read",(req,res)=>{
    let data=jwt.verify(req.cookies.token,"secret")
    console.log(data)
})

app.listen(3000, () => {
    console.log("running")
})