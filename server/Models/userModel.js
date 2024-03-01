const mongoose = require('mongoose');


// Connect to MongoDB using Mongoose


//Create a user Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    cart: [],
    isAdmin: {
        type: Boolean,
        default: false
    }
});


const userModel = mongoose.model('user', userSchema);

module.exports = userModel
