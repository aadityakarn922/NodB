const express = require('express')

const app = express()

app.use(express.json())

const notes = []

// CREATE
app.post('/notes', (req, res) => {
    notes.push(req.body)

    res.status(201).json({
        message: "note created successfully",
        notes: req.body
    })
})

// READ ALL
app.get('/notes', (req, res) => {
    res.status(200).json({
        message: "fetch successfully",
        notes: notes
    })
})

// DELETE
app.delete('/notes/:index', (req, res) => {
    const index = Number(req.params.index)

    if (!notes[index]) {
        return res.status(404).json({
            msg: "note not found"
        })
    }

    notes.splice(index, 1)

    res.status(200).json({
        msg: "note deleted successfully"
    })
})

// PATCH (update only title)
app.patch('/notes/:index', (req, res) => {
    const index = Number(req.params.index)
    const title = req.body.title

    if (!notes[index]) {
        return res.status(404).json({
            msg: "note not found"
        })
    }

    if (!title) {
        return res.status(400).json({
            msg: "title is required"
        })
    }

    notes[index].title = title
 
    res.status(200).json({
        msg: "note updated successfully",
        updatedNote: notes[index]
    })
})

module.exports = app