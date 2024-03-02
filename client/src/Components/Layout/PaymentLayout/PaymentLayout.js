import React, { useState } from 'react'
import './PaymentLayout.css';
import AddressForm from '../../AddressForm/AddressForm';
import PaymentForm from '../../PaymentForm/PaymentForm';
import { Toaster, toast } from 'react-hot-toast';
import { addressFormValidation, paymentFormValidation } from '../../../utils/formValidation';

function PaymentLayout({ handleClosePaymentLayout, cartItems, processPayment }) {

  let [displayAddressForm, setDisplayAddressForm] = useState(true);

  let addressDetails = {
    fullName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: ''
  }

  let paymentDetails = {
    cardNumber: '',
    expiry: '',
    cvc: ''
  }

  let [addressDetailsState, setAddressDetailsState] = useState(addressDetails)
  let [paymentDetailsState, setPaymentDetailsState] = useState(paymentDetails)

  //handle form state change
  const handleAddressFormChange = (e) => {
    const { name, value } = e.target;
    setAddressDetailsState({
      ...addressDetailsState,
      [name]: value,
    });
  }

  //handle form state change
  const handlePaymentFormChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetailsState({
      ...paymentDetailsState,
      [name]: value,
    });
  }

  //Handle Form Submission
  const handlePaymentForm = () => {

    //Perform paymentDetailsState validation
    let error = paymentFormValidation(paymentDetailsState);

    //If there are no error
    if (error === null) {
      const orderDate = new Date();
      let formData = {
        address: addressDetailsState,
        card: paymentDetailsState,
        orderItems: cartItems,
        date: orderDate.toDateString()
      }

      processPayment(formData);
    }
    else {
      toast.error(error);
    }


  }

  //Switch between address and payment form
  let openPaymentForm = () => {

    //Perform Address Details Validation 
    let error = addressFormValidation(addressDetailsState);

    // If no validation Errors
    if (error === null) {
      setDisplayAddressForm(!displayAddressForm);
    }

    //If there are validation errors
    else {
      toast.error(error);
    }


  }


  return (
    <>
      <Toaster />
      <div className="popup-overlay">
        <div className="popup-container">

          {
            displayAddressForm ?
              <AddressForm
                handleClosePaymentLayout={handleClosePaymentLayout}
                openPaymentForm={openPaymentForm}
                handleInputChange={handleAddressFormChange}
                paymentDetailsData={addressDetailsState}
              />
              :
              <PaymentForm
                handleClosePaymentLayout={handleClosePaymentLayout}
                handlePaymentForm={handlePaymentForm}
                openPaymentForm={openPaymentForm}
                handleInputChange={handlePaymentFormChange}
                paymentDetailsData={paymentDetailsState}
              />
          }
        </div>
      </div>
    </>
  )
}

export default PaymentLayout