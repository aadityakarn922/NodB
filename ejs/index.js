const express=require("express")
const path=require("path")
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')
// parser job
app.get("/",(req,res)=>{
    res.send("reading it ")

})
app.get("/i",(req,res)=>{
    res.render("index")
})
app.get("/profile/:username",(req,res)=>{
    res.send(`welcome,${req.params.username}`)

})
app.get("/author/:username/:age",(req,res)=>{
    res.send(req.params)
})
app.get("/id/:username/:age",(req,res)=>{
    res.send(`welcome,${req.params.username} of age  ${ req.params.age}`)
})
app.listen(3000,()=>{
    console.log("server working")
})