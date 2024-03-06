const bookFormValidation = async(req,res,next)=>{
    console.log(req.body);
    let bookData = req.body;
    if(bookData.title === ''){
        res.status(201).send({ message: "Title is required" })

    }
    if(bookData.author === ''){
        res.status(201).send({ message: "Author is required" })
    }
    if(bookData.genere === ''){
        return 'Genere is required';
    }
    if(bookData.description < 10){
        res.status(201).send({ message: "Description is required" })
    }
    
    if(bookData.price === ''){
        res.status(201).send({ message: "Price is required" })
    }
    next();
}

module.exports = bookFormValidation;