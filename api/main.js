const express = require('express')
const mongoose = require('mongoose')


const BlogData = require('../models/Blog')
const MessageData = require('../models/Message')

const app = express()
const masterKey = "123456789"
var port = "6000"

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// Blog

app.get('/Blog', async (req, res) => {
    const userKey = (req.query.key)
    if (userKey === masterKey) {
        try {
            const blogData = await BlogData.find();
            res.status(200).json(blogData); ``
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
app.get('/Blog/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blogData = await BlogData.findById(id);
        res.status(200).json(blogData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.get('/Data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blogData = await BlogData.findById(id);
        res.status(200).json(blogData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.post('/Blog', async (req, res) => {
    try {
        const Blog = await BlogData.create({
            title: req.body.title,
            img: req.body.img,
            content: req.body.content,
            author: req.body.author,
            date: req.body.date
        });
        // res.redirect("/products");
        res.status(201).json(Blog);
    } catch (error) {
        console.log(error);
    }
})

// update a Data
app.patch('/Blog/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blogData = await BlogData.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if (!blogData) return res.status(404).json({ message: `cannot find any product with ID ${id}` })

        if (req.body.title) blogData.title = req.body.title;
        if (req.body.img) blogData.img = req.body.img;
        if (req.body.content) blogData.content = req.body.content;
        if (req.body.author) blogData.author = req.body.author;
        if (req.body.date) blogData.date = req.body.date;

        res.status(200).json(blogData);

    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
})


// delete a product

app.delete('/Blog/:id', async (req, res) => {
    const userKey = (req.query.key)
    if (userKey === masterKey) {

        try {
            const userKey = (req.query.key)
            const { id } = req.params;
            const blogData = await BlogData.findByIdAndDelete(id);
            if (!blogData) {
                return res.status(404).json({ message: `cannot find any Parking Data with ID ${id}` })
            }
            res.status(200).json(blogData);

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



// Contact Page ,Customer message


app.get('/Message', async (req, res) => {
    const userKey = (req.query.key)
    if (userKey === masterKey) {
        try {
            const messageData = await MessageData.find();
            res.status(200).json(messageData);
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
// app.get('/Blog/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const blogData = await BlogData.findById(id);
//         res.status(200).json(blogData);
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }

// })

app.get('/Data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blogData = await BlogData.findById(id);
        res.status(200).json(blogData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.post('/Message', async (req, res) => {
    try {
        const Message = await MessageData.create({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        // res.redirect("/products");
        res.status(201).json(Message);
    } catch (error) {
        console.log(error);
    }
})



// delete a product ,Customer message

app.delete('/Message/:id', async (req, res) => {
    const userKey = (req.query.key)
    if (userKey === masterKey) {

        try {
            const userKey = (req.query.key)
            const { id } = req.params;
            const messageData = await MessageData.findByIdAndDelete(id);
            if (!messageData) {
                return res.status(404).json({ message: `cannot find any Parking Data with ID ${id}` })
            }
            res.status(200).json(messageData);

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
    connect('mongodb+srv://admin:1234@api.w1sen0x.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(process.env.PORT || port, () => {
            console.log(`Node API app is running on port 6000`)
        });
    }).catch((error) => {
        console.log(error)
    })