import React from 'react'

function FormInputField({ label, type, className, placeholder, handleChange, lableClass, divClass, padding, value }) {
    return (
        <>
            <div className={`form-group ${divClass}`}>
                <label className={`${lableClass} text-white`}>{label}</label>
                <div className={`input-container ${padding}`}>
                    <input type={type}
                        className={className}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => { handleChange(e.target.value) }} style={{ width: "100%" }}
                    />
                </div>
            </div>
        </>
    )
}

export default FormInputField