const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    author: {
        type: String,
        required: [true, 'Author Name is required']
    },
    genere: {
        type: String,
        required: [true, 'Genere is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    image: String,
    description: {
        type: String,
        required: [true, 'Description is required']
    }
})

const booksModel = mongoose.model('book', bookSchema);

module.exports = booksModel
