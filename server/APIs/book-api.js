const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { addBookData, getBooks, getBookDetails,deleteBookData,updateBookData } = require("../Controllers/book-controller")
const bookRoutes = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const {upload} = require("../Middleware/cloudinaryUpload");
const bodyParser = require('body-parser');

bookRoutes.use(bodyParser.urlencoded({ extended: true }))






bookRoutes.post("/add-books",upload.single('image'), expressAsyncHandler(addBookData))

bookRoutes.get("/get-books", expressAsyncHandler(getBooks))

bookRoutes.get("/get-book-details",expressAsyncHandler(getBookDetails));

bookRoutes.delete("/delete-book-data",expressAsyncHandler(deleteBookData));

bookRoutes.put("/update-book",upload.single("image"),expressAsyncHandler(updateBookData));

module.exports = bookRoutes;

