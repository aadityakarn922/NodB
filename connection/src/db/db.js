const mongoose = require('mongoose')

async function connecttoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected")
    } catch (error) {
        console.log("database failed")
        console.log(error.message)
    }
}

module.exports = connecttoDB