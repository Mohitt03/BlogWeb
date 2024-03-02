const mongoose = require('mongoose')
const Schema = mongoose.Schema
const message = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }

},
    {
        timestamps: true
    }
)


module.exports = mongoose.model('message', message)   