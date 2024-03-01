import React from 'react'

function OrangeButton({ onClick, text, className }) {
    return (
        <button onClick={onClick} className={className}>{text}</button>
    )
}

export default OrangeButton