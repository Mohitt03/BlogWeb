const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
const postSchema = mongoose.Schema({
    title: {
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

},
    {
        timestamps: true
    }
)

postSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('postSchema', postSchema)   