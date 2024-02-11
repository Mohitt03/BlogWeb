const express = require('express')
const mongoose = require('mongoose')


const PostData = require('../models/Post')

const app = express()
const masterKey = "123456789"
var port = "6000"

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// Post

app.get('/Post', async (req, res) => {
    const userKey = (req.query.key)
    if (userKey === masterKey) {
        try {
            const postData = await PostData.find();
            res.status(200).json(postData);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    else {
        res
            .status(404)
            .json({ error: "You are not authorized" })
    }

})
app.get('/Post/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const postData = await PostData.findById(id);
        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.get('/Data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const postData = await PostData.findById(id);
        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.post('/Posts', async (req, res) => {
    try {
        const Post = await PostData.create({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        });
        // res.redirect("/products");
        res.status(201).json(Post);
    } catch (error) {
        console.log(error);
    }
})

// update a Data
app.patch('/Post/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const postData = await PostData.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if (!postData) return res.status(404).json({ message: `cannot find any product with ID ${id}` })

        if (req.body.title) postData.title = req.body.title;
        if (req.body.content) postData.content = req.body.content;
        if (req.body.author) postData.author = req.body.author;

        res.status(200).json(postData);

    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
})


// delete a product

app.delete('/Post/:id', async (req, res) => {
    const userKey = (req.query.key)
    if (userKey === masterKey) {

        try {
            const userKey = (req.query.key)
            const { id } = req.params;
            const postData = await PostData.findByIdAndDelete(id);
            if (!postData) {
                return res.status(404).json({ message: `cannot find any Parking Data with ID ${id}` })
            }
            res.status(200).json(postData);

        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    else {
        res
            .status(404)
            .json({ error: "You are not authorized" })
    }

})


mongoose.set("strictQuery", false)
mongoose.
    connect('mongodb://localhost:27017')
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(process.env.PORT || port, () => {
            console.log(`Node API app is running on port 6000`)
        });
    }).catch((error) => {
        console.log(error)
    })