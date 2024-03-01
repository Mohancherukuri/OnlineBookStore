import React from 'react';
import BlackButton from '../Buttons/BlackButton';
import PaymentFormInput from '../PaymentFormInput/PaymentFormInput';
import './AddressForm.css'
const AddressForm = ({ handleClosePaymentLayout, openPaymentForm,handleInputChange,paymentDetailsData }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        openPaymentForm();
    };

    return (
        <div className="address-form-container">
            <div className='address-header'>

                <h2>Address Form</h2>
                <button className="close-button" onClick={handleClosePaymentLayout}>
                    &times;
                </button>
            </div>
            <form onSubmit={handleSubmit} className="address-form">

                <PaymentFormInput
                    label = "Full Name"
                    type = "text"
                    name="fullName"
                    value={paymentDetailsData.fullName}
                    handleInputChange = {handleInputChange}
                />

                <PaymentFormInput
                    label = "Street Address"
                    type = "text"
                    name="streetAddress"
                    value={paymentDetailsData.streetAddress}
                    handleInputChange = {handleInputChange}
                />

                <PaymentFormInput
                    label = "City"
                    type = "text"
                    name="city"
                    value={paymentDetailsData.city}
                    handleInputChange = {handleInputChange}
                />

                <PaymentFormInput
                    label = "State"
                    type = "text"
                    name="state"
                    value={paymentDetailsData.state}
                    handleInputChange = {handleInputChange}
                />

                <PaymentFormInput
                    label = "Zip Code"
                    type = "text"
                    name="zipCode"
                    value={paymentDetailsData.zipCode}
                    handleInputChange = {handleInputChange}
                />

                <BlackButton text="Procced to Payment" className="address-submit-button"/>
            </form>
        </div>
    );
};

export default AddressForm;