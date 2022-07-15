const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please provide a name']
    },
    age: {
        type: Number,
        required: [true,'Please provide age']
    },
    username: {
        type: String,
        required: [true,'Please provide a username']
    }
})

module.exports = mongoose.model('users', UserSchema)