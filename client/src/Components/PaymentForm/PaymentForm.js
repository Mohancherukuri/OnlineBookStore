import React from 'react'
import BlackButton from '../Buttons/BlackButton';
import PaymentFormInput from '../PaymentFormInput/PaymentFormInput';
import './PaymentForm.css'
function PaymentForm({ handleClosePaymentLayout,handleInputChange, handlePaymentForm, openPaymentForm,paymentDetailsData }) {


  let handleSubmit = (e) => {
    e.preventDefault();
    handlePaymentForm()
  }

  return (
    <div className="payment-form-container">
      <div className='address-header d-flex justify-content-between'>
        <button className="back-button" onClick={openPaymentForm}>
          <i className="fa-solid fa-backward"></i>
        </button>
        <h2>Pament Form</h2>
        <button className="close-button" onClick={handleClosePaymentLayout}>
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit} className="payment-form">

        <PaymentFormInput
          label="Card Number"
          type="text"
          name = "cardNumber"
          handleInputChange = {handleInputChange}
          value={paymentDetailsData.cardNumber}
          placeholder="4444 4444 4444"
        />

        <br />

        <PaymentFormInput
          label="Expiry Date"
          type="text"
          name = "expiry"
          handleInputChange = {handleInputChange}
          value={paymentDetailsData.expiry}
          placeholder='MM/YY'
        />
        <br />

        <PaymentFormInput
          label="CVC"
          type="text"
          name ="cvc"
          handleInputChange = {handleInputChange}
          value={paymentDetailsData.cvc}
          placeholder='123'
        />

        <br />
        <BlackButton text="Pay Now" className="address-submit-button" />
      </form>
    </div>
  )
}

export default PaymentForm