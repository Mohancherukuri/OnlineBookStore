
export const signUpFormValidation = ({ username, email, password }) => {
    if (username === "") {
        return "User name is Required";
    }
    let userNameRegex = /^[a-zA-Z0-9 ]*$/
    let patternMatch = userNameRegex.test(username);
    if (!patternMatch) {
        return "User Name can only contain AlphaNumerics and Spaces";
    }

    if (email !== undefined) {
        if (email === "") {
            return "Email is required";
        }
        let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        patternMatch = emailRegex.test(email);
        if (!patternMatch) {
            return "Invalid Email Format";
        }
    }

    if (password === "") {
        return "Password is Required";
    }
    if (password.length < 5) {
        return "Password should have atleast 5 characters";
    }
    return null
}


export const addressFormValidation = (addressDetails) => {

    // Validating full name
    if (addressDetails.fullName === '') {
        return "Please enter your Full Name";
    }
    else if (addressDetails.fullName.length < 3) {
        return "Name should be more than 3 characters";
    }

    // Validating street Address
    if (addressDetails.streetAddress === '') {
        return 'Please enter your Address';
    }

    // Validating City
    if (addressDetails.city === '') {
        return 'Please enter the name of the city';
    }

    // Validating State
    if (addressDetails.state === '') {
        return "Please enter the name of the state";
    }

    // Validate Zip Code
    // Validate Zip Code
    if (addressDetails.zipCode === '') {
        return "Please enter your zip code";
    } else if (!/^\d+$/.test(addressDetails.zipCode)) {
        return "Zip code should only contain digits";
    } else if (addressDetails.zipCode.length !== 6) {
        return "Please enter a valid 6-digit zip code";
    }

    return null;
}

export const paymentFormValidation = (paymentDetails) => {
    if(paymentDetails.cardNumber === ''){
        return "Card Number is required"
    } 
    else if(paymentDetails.cardNumber.length !== 12){
        return "Please enter a valid Card Number"
    }

    if(paymentDetails.cvc === ''){
        return "CVC is required";
    }
    else if(paymentDetails.cvc.length !== 3){
        return "Please enter a valid cvc";
    }

    if(paymentDetails.expiry === ''){
        return "Expiry is required";
    }

    return null
  
}

export const bookFormValidation = (bookDetails) =>{
    if(bookDetails.title === ''){
        return "Title is required";
    }
    if(bookDetails.author === ''){
        return "Author Name is required";
    }
    if(bookDetails.genere === ''){
        return 'Genere is required';
    }
    if(bookDetails.description < 10){
        return 'Description should be more than 10 characters';
    }
    console.log(bookDetails.image)
    if(bookDetails.image === null ){
        return 'You need to upload a image';
    }
    if(bookDetails.price === ''){
        return 'Please enter the book price';
    }
    
    return null;
}

