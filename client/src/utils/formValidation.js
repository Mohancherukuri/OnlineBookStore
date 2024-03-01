
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

export const paymentFormValidation = (paymentDetails,cartItems) =>{
    
    let address = {
        fullName: paymentDetails.fullName,
        streetAddress: paymentDetails.streetAddress,
        city: paymentDetails.city,
        state: paymentDetails.state,
        zipCode: paymentDetails.zipCode,
    }
    
    let cardDetails = {
        cardNumber: paymentDetails.cardNumber,
        expiry: paymentDetails.expiry,
        cvc: paymentDetails.cvc
    }

    //Validate Address 
    if(address.streetAddress.length === 0){
        return {}
    }
    if(address.city.length === 0){
        return {}
    }
    if(address.state.length === 0){
        return {}
    }
    if(address.zipCode.length !== 6 ){
        return {}
    }

    //Validate Card details
    if(cardDetails.cardNumber.length !== 12 ){
        return {}
    }
    else if(cardDetails.cvc.length !== 3){
        return {}
    }

    const orderDate = new Date();

    let userObj = {
        address : address,
        cardDetails : cardDetails,
        orderItems : cartItems,
        date : orderDate.toDateString()
    }
    return userObj

}


