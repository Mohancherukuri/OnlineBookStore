import React, { useState } from 'react'
import './PaymentLayout.css';
import AddressForm from '../../AddressForm/AddressForm';
import PaymentForm from '../../PaymentForm/PaymentForm';


function PaymentLayout({ handleClosePaymentLayout, handlePaymentForm, handleInputChange,paymentDetailsData }) {

  let [displayAddressForm, setDisplayAddressForm] = useState(true);

  let openPaymentForm = () => {
    setDisplayAddressForm(!displayAddressForm);
  }


  return (
    <div className="popup-overlay">
      <div className="popup-container">

        {
          displayAddressForm ?
            <AddressForm handleClosePaymentLayout={handleClosePaymentLayout} openPaymentForm={openPaymentForm} handleInputChange={handleInputChange} paymentDetailsData={paymentDetailsData} />
            :
            <PaymentForm handleClosePaymentLayout={handleClosePaymentLayout} handlePaymentForm={handlePaymentForm} openPaymentForm={openPaymentForm} handleInputChange={handleInputChange} paymentDetailsData={paymentDetailsData} />
        }
      </div>
    </div>
  )
}

export default PaymentLayout