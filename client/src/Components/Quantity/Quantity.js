import React, { useState, useContext, useEffect } from 'react'
import "./Quantity.css";
import { userLoginContextObj } from '../../Context/userLoginContext';
import QuantityButtons from '../Buttons/QuantityButtons/QuantityButtons';
export default function Quantity({ book }) {

    const { handleQtyChange } = useContext(userLoginContextObj)
    let [qty, setQty] = useState(0)

    useEffect(()=>{
        setQty(book.qty);
    })


    const handleQtyIncrement = () => {
        let currentQty = {...qty};
        setQty(currentQty + 1)
        handleQtyChange(book, +1)
    }

    const handleQtyDecrement = () => {
        let currentQty = qty;
        setQty(currentQty - 1)
        handleQtyChange(book, -1)
    }
    
    return (
        <div className="container d-flex">
            <QuantityButtons onClick={handleQtyDecrement} className="red-btn" icon="fas fa-minus" />
            <input type="number" className="qty-input text-center" value={qty} disabled />
            <QuantityButtons onClick={handleQtyIncrement} className="green-btn" icon="fas fa-plus" />

        </div>

    )
}
