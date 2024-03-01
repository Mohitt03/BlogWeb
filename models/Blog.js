const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
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

blog.plugin(passportLocalMongoose);

module.exports = mongoose.model('postSchema', blog)   