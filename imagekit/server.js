const app=require("./src/app")
const connectDB=require("./src/db/db")
connectDB()

app.listen(4500,()=>{
    console.log("port 4500 is running")
})