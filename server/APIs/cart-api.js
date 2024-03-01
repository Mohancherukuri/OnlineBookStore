const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { addBookData, getBooks, getBookDetails } = require("../Controllers/book-controller")
const bookRoutes = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const bodyParser = require('body-parser');

bookRoutes.use(bodyParser.urlencoded({ extended: true }))
// Configure cloudinary



bookRoutes.get("/get-books", expressAsyncHandler(getBooks))

bookRoutes.get("/get-book-details",expressAsyncHandler(getBookDetails))

module.exports = bookRoutes;

