const userModel = require("../Models/userModel")

//middleware function to check if a username exist
async function usernameTaken(req, res, next) {
    try {
        let {username} = req.body
        let dbRes = await userModel.findOne({username: username});
        if(dbRes){
            res.status(401).send({ message: "User already exists" });
            return
        }
        next();
    } catch (error) {
        
        res.status(500).send("Internal Server Error");
    }
}

// Export the userExists middleware
module.exports = usernameTaken;
