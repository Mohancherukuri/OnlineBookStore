import React from 'react'

function PaymentFormInput({ label,name, type,value, placeholder,handleInputChange }) {
    return (
        <>
            <label className="address-form-label">
                {label}:
            </label>

            <input
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={handleInputChange}
                className="address-form-input"
                value={value}
            />
        </>
    )
}

export default PaymentFormInput