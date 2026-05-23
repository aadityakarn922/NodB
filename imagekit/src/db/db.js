const mongoose = require("mongoose")

async function connectDB() {
    
        await mongoose.connect("mongodb+srv://backend:Dpxkhelcpv5ncL7B@backend.u1zlgwz.mongodb.net/project1")
        console.log("database connected")

}

module.exports = connectDB