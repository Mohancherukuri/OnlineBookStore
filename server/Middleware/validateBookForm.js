const validateBookForm = (req,res,next) =>{

    console.log(req.body);
    console.log(req.file);
}

module.exports = {validateBookForm}