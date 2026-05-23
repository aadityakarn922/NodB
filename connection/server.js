
const app=require('./src/app')
const connecttoDB=require("./src/db/db")
require("dotenv").config();

connecttoDB()

app.listen(4200,()=>{
    console.log("port 4200 is running successfully")
})