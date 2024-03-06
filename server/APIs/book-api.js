const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { addBookData, getBooks, getBookDetails,deleteBookData,updateBookData } = require("../Controllers/book-controller")
const bookRoutes = express.Router();
const bookFormValidation = require("../Middleware/bookFormValidation");
const {upload} = require("../Middleware/cloudinaryUpload");
const bodyParser = require('body-parser');

bookRoutes.use(bodyParser.urlencoded({ extended: true }))






bookRoutes.post("/add-books",upload.single('image'), bookFormValidation,expressAsyncHandler(addBookData))

bookRoutes.get("/get-books", expressAsyncHandler(getBooks))

bookRoutes.get("/get-book-details",expressAsyncHandler(getBookDetails));

bookRoutes.delete("/delete-book-data",expressAsyncHandler(deleteBookData));

bookRoutes.put("/update-book",upload.single("image"),bookFormValidation,expressAsyncHandler(updateBookData));

module.exports = bookRoutes;

