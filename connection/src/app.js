const express=require('express')
const noteModel=require("./models/note.model")

const app=express();
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})

app.post("/notes",async(req,res)=>
{
    const data =req.body
    await noteModel.create(
        {
            title:data.title,
            description:data.description
        }
    )
    res.status(201).json({
        messsage:"data received"
    })
})
app.get("/notes",async (req,res)=>{
    const value=await noteModel.find()   // data comes is array form 
    res.status(200).json({
        messaage:"data fetched",
        notes:value
        // data:value work with this also
    })

})
app.delete("/notes/:id",async (req,res)=>{
    const id=req.params.id
    await noteModel.findOneAndDelete({
        _id:id

    })
    res.status(200).json({
        msg:"data deleted"
    })
    
})

app.patch("/notes/:id",async(req,res)=>{
    const id=req.params.id
    const description=req.body.description
    await noteModel.findOneAndUpdate({
        _id:id
    },{description:description})
    res.status(200).json({
        msg:"data updated"
    })
    
})
module.exports=app