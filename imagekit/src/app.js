
const express = require('express')
const multer = require("multer")
const uploadFile = require("./services/storage.services")

const app = express()

const upload = multer({ storage: multer.memoryStorage() })

app.post("/createpost", upload.single("image"), async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).send("No image uploaded")
        }

        const result = await uploadFile(req.file.buffer)

        console.log(result)

        return res.send(result)

    } catch (error) {

        console.log(error)

        return res.status(500).send("Upload failed")
    }
})

module.exports = app