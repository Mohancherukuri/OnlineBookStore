import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import './HorizontalProductCard.css'
import { userLoginContextObj } from '../../Context/userLoginContext';
import BookImage from '../BookImage/BookImage';
import Quantity from '../Quantity/Quantity';

import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../../Redux/Slices/spinnerSlice';

function HorizontalProductCard({ book, isCart,isProductCard }) {

    const dispatch = useDispatch();

    const { removeFromCart } = useContext(userLoginContextObj);
    const handleRemove = async() => {
        dispatch(showLoading());
        await removeFromCart(book);
        dispatch(hideLoading());
    };

    return (
        <div className='cart-item'>
            <div className='cart-item-img-container'>
            <BookImage className='cart-item-img' image={book.image} style={{ width: "150px", height: "220px" }} />
            </div>
            <div className='cart-item-content-container'>
                <h2>{book.title}</h2>
                <p>{book.author}</p>
                {isCart && <Quantity book={book} qty={book.qty}/>}
                <h3 className='cart-item-price'>&#8377;{book.price}</h3>
                {
                    isCart &&
                        <button className='delete-button mt-3' onClick={handleRemove}>
                            Remove from cart
                        </button>
                }
                {
                    isProductCard && <Link to={`/book-details/${book._id}`} className='product-listing-button add-to-cart-btn'>Add to Cart</Link>
                }
            </div>
        </div>
    );
}

export default HorizontalProductCard