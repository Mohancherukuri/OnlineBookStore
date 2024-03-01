import axios from "axios";


//user Login API
export const userLoginAPI = async(userObj) =>{
    return await axios.post('http://localhost:4000/user-api/login',userObj)
}

//User Registration API
export const signUpAPI = async (userObj) => {
    return await axios.post('http://localhost:4000/user-api/register', userObj);
}


//Update user cart data
export const updateUserCartAPI = async (currentUser) => {
    return await axios.put(`http://localhost:4000/user-api/update-cart`, currentUser);
}

//Get all the books details
export const getAllBookDetailsAPI = async () => {
    return await axios.get(`http://localhost:4000/book-api/get-books`);
}

//Delete the book Api
export const deleteBookDataAPI = async (id) => {
    return axios.delete("http://localhost:4000/book-api/delete-book-data",{params : {id: id}});
}

//Get book data based on ID
export const getBookDetailsAPI = async (id) => {
    return await axios.get(`http://localhost:4000/book-api/get-book-details?id=${id}`);
}



//Add Book into the database
export const addBookDetailsAPI = async (bookDetails) => {
    return await axios.post(`http://localhost:4000/book-api/add-books`,bookDetails);
}


//Update book Data
export const updateBookDetailsAPI = async (location, bookDetails) => {
    return await axios.put(`http://localhost:4000/books/${location.state[0].id}`, bookDetails)
}



export const processOrder = async (updatedOrders) =>{
    return await axios.put("http://localhost:4000/order-api/process-order",updatedOrders);
}

export const getPreviousOrders = async (username) =>{
    return await axios.get(`http://localhost:4000/order-api/get-orders?username=${username}`);
}
