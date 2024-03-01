import React from 'react'
import "./QuantityButtons.css"

function QuantityButtons({onClick,className,icon}) {
    return (
        <div className="qty-button">
            <button className={`bttn ${className}`} type="button" onClick={onClick}>
                <i className={icon}></i>
            </button>
        </div>
    )
}

export default QuantityButtons