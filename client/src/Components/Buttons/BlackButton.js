import React from 'react'

function BlackButton({ text, className, type, onClick }) {
    return (
        <>
            <button type={type} className={className} onClick={onClick}>{text}</button>
        </>
    )
}

export default BlackButton