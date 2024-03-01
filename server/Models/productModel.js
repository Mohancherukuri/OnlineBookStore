const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genere: String,
    price: Number,
    image: String,
    description: String
})

const booksModel = mongoose.model('book', bookSchema);

module.exports = booksModel
