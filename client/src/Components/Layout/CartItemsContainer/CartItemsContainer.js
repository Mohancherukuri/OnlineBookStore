import React, { useContext, useState, useEffect } from 'react'
import './CartItemsContainer.css'
import Popup from '../../Popup/Popup';
import { userLoginContextObj } from '../../../Context/userLoginContext';
import HorizontalProductCard from '../../HorizontalProductCard/HorizontalProductCard';
import PaymentLayout from '../PaymentLayout/PaymentLayout';
import BlackButton from '../../Buttons/BlackButton';
import { useNavigate } from 'react-router-dom';
import { paymentFormValidation } from '../../../utils/formValidation';
import { Toaster, toast } from 'react-hot-toast';
import { processOrder } from '../../../utils/apicalls';

import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../../../Redux/Slices/spinnerSlice';

function CartItemsContainer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [showPaymentLayout, setShowPaymentLayout] = useState(false);

    let { cartItems, userOrders, loginStatus, setUserOrders, setCartItems, emptyCart, currentUser } = useContext(userLoginContextObj);


    const [totalAmout, setTotalAmount] = useState(0)
    //Popup States
    let [showPopupAndNavigate, setShowPopupAndNavigate] = useState(false)
    let [showPopup, setShowPopup] = useState(false);
    let [promptMsg, setPromptMsg] = useState('');
    let [promptHeading, setPromptHeading] = useState('')
    let [popupPath, setPopupPath] = useState('');

    //Payment Form Data
    let paymentDetails = {
        fullName: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    }

    let [paymentDetailsData, setPaymentDetailsData] = useState(paymentDetails);

    //Handle Paymentform data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetailsData({
            ...paymentDetailsData,
            [name]: value,
        });
    };


    useEffect(() => {
        //calculate total price of items in cart
        let total = 0;
        cartItems.forEach((item) => {
            total = total + (item.price * item.qty);
        });
        setTotalAmount(total);
        // console.log(paymentDetailsData);
    }, [cartItems]);

    let handlePayment = () => {
        if (loginStatus) { setShowPaymentLayout(true); }
        else {
            setPromptHeading("Notice")
            setPromptMsg("Please Login to proceed to Payment");
            setShowPopup(true);
            setShowPopupAndNavigate(true);
            setPopupPath("/login")
        }

    }

    let handleClosePaymentLayout = () => {
        setShowPaymentLayout(false);
        setPaymentDetailsData(paymentDetails);
    }

    let handlePaymentForm = async () => {

        let orderDetails = paymentFormValidation(paymentDetailsData, cartItems);
        
        if (Object.keys(orderDetails).length !== 0) {
            // No errors
            //Send all the data into the database
            let updatedOrders = { ...orderDetails };
            // console.log(orderDetails)
            // updatedOrders.orderDetails.push(orderDetails);
            // setUserOrders(updatedOrders);
            let username = currentUser.username;
            // console.log();
            
            dispatch(showLoading())
            let res = await processOrder({ updatedOrders, username });
            dispatch(hideLoading());
            
            if (res.status === 200) {
                //Set user Cart to empty
                setCartItems([]);
                //Set total amount to 0
                setTotalAmount(0);
                //Empty the cart in user Object
                dispatch(showLoading())
                await emptyCart();
                dispatch(hideLoading());
                
                setPaymentDetailsData(paymentDetails);

                setShowPaymentLayout(false);

                setPromptHeading("Success")
                setPromptMsg("Payment Successful.You will be redirected to Home Page.");
                setShowPopup(true);

                setShowPopupAndNavigate(true);
                setPopupPath("/")
            }
        }
        else {
            toast.error("Please check all of your Details");
        }

    }

    return (
        <div className='cart-items-container'>
            {showPaymentLayout && <PaymentLayout handleClosePaymentLayout={handleClosePaymentLayout} handlePaymentForm={handlePaymentForm} handleInputChange={handleInputChange} paymentDetailsData={paymentDetailsData} />}
            {showPopup && <Popup message={promptMsg} heading={promptHeading} showPopupAndNavigate={showPopupAndNavigate} setShowPopup={setShowPopup} path={popupPath} />}
            <Toaster />
            <div className='container'>
                {
                    totalAmout === 0 ?
                        <>
                            <h1>Your Cart is Empty.......</h1>
                        </>
                        :
                        <>
                            <h1>Cart</h1>
                            {
                                cartItems.map((item) => {
                                    return (<HorizontalProductCard book={item} isCart={true} key={item.id} />)
                                })
                            }

                            <h2>Total Amount =&#8377; {totalAmout}</h2>
                            <BlackButton text="Proceed to Checkout" type="button" className="payment-button" onClick={handlePayment} />
                        </>
                }
            </div>
        </div>
    )
}

export default CartItemsContainer