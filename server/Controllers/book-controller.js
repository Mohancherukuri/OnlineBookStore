const bookModel = require("../Models/productModel");
const fs = require("fs");
const path = require("path");
const url = require("url")
const { cloudinary } = require("../Middleware/cloudinaryUpload");
const booksModel = require("../Models/productModel");

//Adding new books to database
const addBookData = async (req, res) => {

    try {
        //Get the book Data
        const bookData = req.body;
        
        // Add the image link to the book Data

        // bookData.image = req.file.path;
        
        let result = await cloudinary.uploader.upload(req.file.path);
        
        let imageUrl = result.url;
        //Update the database
        bookData.image = imageUrl

        const dbRes = await bookModel.create(bookData);
        
        fs.access(req.file.path, fs.constants.F_OK, (err) => {
            if (err) {
                console.error('File does not exist:', err);
                return;
            }

            // File exists, so delete it
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    // console.error('Error deleting file:', err);
                    return;
                }
            });
        });

        res.status(200).send({ message: "Book Created" })
    }
    catch (error) {
        res.status(500).send({ message: "Server Error" })
    }
}

//Getting all the books from database.
const getBooks = async (req, res) => {
    try {
        //Get books from the database
        const books = await bookModel.find();
        res.status(200).send({ message: "Data Received", payload: books })
    } catch (error) {
        
        res.status(500).send({ message: "Internal Server Error" });
    }
}

const getBookDetails = async (req, res) => {
    try {

        const parsedUrl = url.parse(req.url, true);
        const queryParameters = parsedUrl.query;

        const dbRes = await bookModel.findOne({ _id: queryParameters.id });

        res.status(200).send({ message: "Book Details Received", payload: dbRes })
    }
    catch (error) {
        
        res.status(500).send({ message: "Internal Server Error" });
    }
}

function extractPublicId(imageUrl) {
    const parts = imageUrl.split('/');
    const filename = parts.pop();
    const publicId = filename.split('.')[0];
    return publicId;
}


const updateBookData = async (req, res) => {
    try {
       
        let bookObj = {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            genere: req.body.genere,
            price: parseInt(req.body.price)
        }

    
        // let newImagePath = req.file;
        if (req.file === undefined) {
            
            bookObj.image = req.body.oldImage;
            let dbRes = await bookModel.updateOne({ _id: req.body._id }, { $set: bookObj });
            res.status(200).send({ message: "Book Data Updated" })
        }
        else {
            let newImagePath = req.file.path;
            let oldImage = req.body.oldImage;

            //Delete old image
            let publicId = extractPublicId(oldImage);
            let res1 = await cloudinary.uploader.destroy(publicId);
         

            //Upload new Image
            let res2 = await cloudinary.uploader.upload(newImagePath);
          
            bookObj.image = res2.url
            //Create book Obj

            let dbRes = await bookModel.updateOne({ _id: req.body._id }, { $set: bookObj });
            res.status(200).send({message : "Book Data Updated"});
        }

    }
    catch (error) {
      
        res.status(500).send({message : "Internal Server Error"});
    }
}



const deleteBookData = async (req, res) => {
    try {
        let bookData = await bookModel.findOne({ _id: req.query.id });
        let publicId = extractPublicId(bookData.image);

        const result = await cloudinary.uploader.destroy(publicId);

        let dbRes = await bookModel.deleteOne({ _id: req.query.id });

        res.status(200).send({ message: "Data Deleted" });

    }
    catch (e) {
        
        res.status(500).send({message : "Internal Server Error"});
    }
}

module.exports = { addBookData, getBooks, getBookDetails, deleteBookData, updateBookData }