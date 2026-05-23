const express=require("express")
const app=express()
app.use(express.json());
app.use((express.urlencoded({extended:true})))
app.use(function(req,res,next) {
    console.log("middle ware 2")
    next()
    
})
app.use((req,res,next)=>{
    console.log("middleware 2")
    next()
})

app.get("/",(req,res)=>{
    res.send("hello")

})
app.get("/profile",function (req,res) {
    res.send("profile getme")
    
})
app.get("/about",(req,res)=>{

    res.send("about page")

})
app.get("/show",(req,res,next)=>{
    return next(new Error("something went wrong"))

})
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!,error');
});
app.listen(3000,()=>{
    console.log("server is running")
})