const mongoose = require('mongoose')
const Schema = mongoose.Schema
const blog = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },

},
    {
        timestamps: true
    }
)


module.exports = mongoose.model('blogs', blog)   