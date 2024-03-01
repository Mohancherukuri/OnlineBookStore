const userModel = require("../Models/userModel")
const orderModel = require("../Models/ordersModel");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { addToCart } = require('../scripts/cartFunction');


//handle User Login Operation
const userLogin = async (req, res) => {
    try {
        //Get data
    let userCred = req.body;
    // console.log(userCred);
    const user = await userModel.findOne({ username: userCred.username });
    //If user Exists
    if (user) {
        //Compare the password
        if (bcryptjs.compareSync(userCred.password, user.password)) {
            //Create a jwt Token
            const token = jwt.sign({ username: user.username }, process.env.TOKEN_SECRET_KEY, { expiresIn: "2d" })

            //Check if user Added items to cart before loggin in.
            if (userCred.cart.length !== 0) {
                user.cart = addToCart(userCred.cart, user.cart);
                const dbRes = await userModel.updateOne({ username: user.username }, user);
            }

            res.status(200).send({ message: "Login Successful", user: user, token: token })
        }
        else {
            res.status(200).send({ message: "Wrong Password" });
        }
    }
    else {
        res.status(200).send({ message: "Wrong UserName" });
    }
    } catch (error) {
        console.log("Error in UserLogin");
        res.status(500).send({message : "Internal server Error"})
    }

};


//Handle User registration
const userRegistration = async (req, res) => {
    try {
        let userData = req.body;

        //Hash the password and update it with userData
        let hashedPassword = bcryptjs.hashSync(userData.password, 5);
        userData.password = hashedPassword;

        userData.cart = [];
        //Create user in Database

        let orderObj = {
            username :userData.username,
            orderDetails : []
        }
        //Create Previous Orders data
        await orderModel.create(orderObj);
        
        //Create the user
        const dbRes = await userModel.create(userData);
        res.status(200).send({ message: "User Created", user: dbRes });
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).send({message : "Internal Server Error"});
    }
}

//Handle User Cart Updation.
const updateUserCart = async (req, res) => {
    try {
        let user = req.body.user;
        console.log(req.body.user)
        //Update user Cart data;


        
        let dbRes = await userModel.updateOne({ _id: user._id }
            , { $set: { cart: user.cart } });
        
        res.status(200).send({ message: "Cart Updated" });
    } catch (error) {
        console.log("Error in updateUserCart");
        res.status(500).send({ message: "internal server error" });
    }
}

//Handle Token Validation
const checkSession = async (req, res) => {
    try {
        let username = req.body.username;
        //Get user data
        let dbRes = await userModel.findOne({ username: username });
        res.status(200).send({message:"Login Successful",payload : dbRes});
    } catch (error) {
        console.log("Error in checkSession");

        res.status(500).send({message : "Internal Server Error Please try again"});
    }

}




module.exports = { userLogin, userRegistration, updateUserCart, checkSession };
