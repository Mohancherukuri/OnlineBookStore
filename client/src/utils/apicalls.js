import axios from "axios";
import {DOMAIN} from '../config'

//user Login API
export const userLoginAPI = async(userObj) =>{
    return await axios.post(DOMAIN+'/user-api/login',userObj)
}

//User Registration API
export const signUpAPI = async (userObj) => {
    return await axios.post(DOMAIN+'/user-api/register', userObj);
}


//Update user cart data
export const updateUserCartAPI = async (currentUser) => {
    return await axios.put(DOMAIN+`/user-api/update-cart`, currentUser);
}

//Get all the books details
export const getAllBookDetailsAPI = async () => {
    return await axios.get(DOMAIN+`/book-api/get-books`);
}

//Delete the book Api
export const deleteBookDataAPI = async (id) => {
    return axios.delete(DOMAIN+"/book-api/delete-book-data",{params : {id: id}});
}

//Get book data based on ID
export const getBookDetailsAPI = async (id) => {
    return await axios.get(DOMAIN+`/book-api/get-book-details?id=${id}`);
}



//Add Book into the database
export const addBookDetailsAPI = async (bookDetails,token) => {
    return await axios.post(DOMAIN+`/book-api/add-books`,bookDetails);
}


//Update book Data
export const updateBookDetailsAPI = async (location, bookDetails) => {
    return await axios.put(DOMAIN+`/books/${location.state[0].id}`, bookDetails)
}



export const processOrder = async (updatedOrders) =>{
    
    return await axios.put(DOMAIN+"/order-api/process-order",updatedOrders);
}

export const getPreviousOrders = async (username,token) =>{
    return await axios.get(DOMAIN+`/order-api/get-orders?username=${username}`,{token});
}
