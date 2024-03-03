import React, { useState } from 'react'
import { userLoginContextObj } from './userLoginContext'
import axios from 'axios'
// import { compareSync } from 'bcryptjs';
import { checkUserNameAPI, getPreviousOrders, updateUserCartAPI, userLoginAPI } from '../utils/apicalls';


// import Popup from '../Components/PopUp/Popup';
import { addQtyOnLogin, isBookInCart } from './../utils/cartFunctions';

function UserLoginStore({ children }) {
    let [loginStatus, setLoginStatus] = useState(false);
    let [currentUser, setCurrentUser] = useState({});
    let [userOrders, setUserOrders] = useState({})
    const [cartItems, setCartItems] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);


    //Handle user Login event Node
    let handleUserLogin = async (userObj) => {
        try {
            //Add current cart items into the userObj
            userObj.cart = cartItems;

            let dbRes = await userLoginAPI(userObj);

            if (dbRes.data.message === "Login Successful") {
                //Set all the states
                setLoginStatus(true);
                setCurrentUser(dbRes.data.user);
                setIsAdmin(dbRes.data.user.isAdmin);
                setCartItems(dbRes.data.user.cart);
                localStorage.setItem("token", dbRes.data.token)

                if (dbRes.data.user.isAdmin) {
                    return "ADMIN_LOGIN"
                }
                else {
                    return "USER_LOGIN"
                }
            }
            else {
                
                return dbRes.data.message;
            }
        } catch (error) {
            return "AXIOS_ERROR"
        }
    }

    //Handle user Login when token is valid
    let handleUserTokenLogin = async (userObj) => {
        setLoginStatus(true);
        
        setCurrentUser(userObj);
        setIsAdmin(userObj.isAdmin);
        setCartItems(userObj.cart);
    }

    //Handle the logout event
    let handleLogout = () => {
        setCurrentUser({});
        setLoginStatus(false);
        setIsAdmin(false);
        setCartItems([]);
        localStorage.removeItem("token")
    }


    let addToCart = async (bookData) => {
        console.log("111")
        let currentCartItems = [...cartItems];
        let bookDetails = {
            _id: bookData._id,
            title: bookData.title,
            author: bookData.author,
            price: bookData.price,
            genre: bookData.genre,
            image: bookData.image,
            qty: 1
        }

        //If book is in Cart add quantity
        const bookInCart = isBookInCart(bookDetails, cartItems);
        console.log(bookInCart);
        //Book is in cart
        if (bookInCart !== undefined) {
            bookInCart.qty += 1;
            let updatedCart = cartItems.filter((item) => item._id !== bookInCart._id);
            console.log("Here11232132123")
            updatedCart = updatedCart.concat(bookInCart);
            console.log(updatedCart)
            setCartItems(updatedCart)
            if (loginStatus) {
                console.log("In login")
                let currentUserObj = { ...currentUser };
                currentUserObj.cart = updatedCart;
                setCurrentUser(currentUserObj)
                try {
                    await updateUserCartAPI({ user: currentUserObj, token: localStorage.getItem("token") });
                    return "Book Added to Cart"
                } catch (error) {
                    console.log(error);
                    return "Something went wrong try agian later."
                }
            }
            return "Book Added to Cart"
            
        }
        else {
            console.log("Here111")
            currentCartItems.push(bookDetails);
            setCartItems(currentCartItems);
            if (loginStatus) {

                let currentUserObj = { ...currentUser };
                currentUserObj.cart = currentCartItems;

                setCurrentUser(currentUserObj);

                try {
                    await updateUserCartAPI({ user: currentUserObj, token: localStorage.getItem("token") });
                    return "Book Added to Cart"
                } catch (error) {
                    console.log(error)
                    return "Something went wrong try agian later."
                }
            }
            return "Book Added to Cart"
        }

    }

    //Remove items from cart
    let removeFromCart = async (book) => {
        
        let updatedCart = cartItems.filter((item) => item._id !== book._id);
        setCartItems(updatedCart);
       
        if (loginStatus) {
            
            let currentUserObj = { ...currentUser }
            currentUserObj.cart = updatedCart;
            
            setCurrentUser(currentUserObj)
            await updateUserCartAPI({ user: currentUserObj, token: localStorage.getItem("token") })
        }

    }

    //Empty the cart after payment
    let emptyCart = async () => {
        let updatedCart = [];
        setCartItems(updatedCart);
        let currentUserObj = { ...currentUser }
        currentUserObj.cart = updatedCart;
        setCurrentUser(currentUserObj);
        await updateUserCartAPI({ user: currentUserObj, token: localStorage.getItem("token") })
    }

    let handleQtyChange = async (book, qty) => {

        let cartItemObj = [...cartItems];
        let index = cartItemObj.findIndex((item) => item._id === book._id);

        cartItemObj[index].qty += qty;

        if (cartItemObj[index].qty === 0) {

            await removeFromCart(book);
            return;
        }
        else {
            setCartItems(cartItemObj);
            if (loginStatus) {
                let currentUserObj = currentUser;
                currentUserObj.cart = cartItemObj;

                await updateUserCartAPI({ user: currentUserObj, token: localStorage.getItem("token") })
            }
        }

    }

    return (
        <>
            <userLoginContextObj.Provider value={{ userOrders, handleUserTokenLogin, setUserOrders, handleQtyChange, emptyCart, isAdmin, removeFromCart, cartItems, setCartItems, loginStatus, currentUser, handleUserLogin, handleLogout, addToCart }}>{children}</userLoginContextObj.Provider>
        </>
    )
}

export default UserLoginStore