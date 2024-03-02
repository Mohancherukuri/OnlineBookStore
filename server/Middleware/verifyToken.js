const jwt = require("jsonwebtoken");

async function verifyToken(req,res,next){
    try{    
       
        let token = req.body.token;
        const verify = jwt.verify(token,process.env.TOKEN_SECRET_KEY);
        req.body.username = verify.username;
        next();
    }
    catch(error){
        res.status(200).send({message:'Expired'})
    }

}

module.exports = verifyToken;

