import React from 'react'
import './ProductCard.css'
import { Link } from 'react-router-dom'
import BlackButton from '../Buttons/BlackButton'
import BookImage from '../BookImage/BookImage'
import { useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../../Redux/Slices/spinnerSlice'

function ProductCard({ book, isAdmin, handleUpdate, handleDelete }) {

    const dispatch = useDispatch();

    let handleDeleteButton = async () => {
        dispatch(showLoading());
        await handleDelete(book._id);
        dispatch(hideLoading());
    }

    let handleUpdateButton = async () => {
        dispatch(showLoading());
        await handleUpdate(book._id);
        dispatch(hideLoading());
    }

    return (
        <div className='product-listing-card mx-auto mb-5'>
            <div className='product-img-container'>
                <BookImage className='product-listing-image' image={book.image} style={{}} />
            </div>
            <div className='product-details-container'>
                <h4 className='mb-0  title-container'>{book.title}</h4>
                <p className='mb-0 author-name'>{book.author}</p>
                <p className='mb-0 pricing'>&#8377; {book.price}</p>
            </div>
            <div className='card-btn-container'>
                {
                    isAdmin ?
                        <>
                            <BlackButton text="Delete Book Details" className="product-listing-button" onClick={handleDeleteButton} />
                            <BlackButton text="Update Book Details" className="product-listing-button" onClick={handleUpdateButton} />
                        </>
                        :
                        <Link to={`/book-details/${book._id}`}>
                            <BlackButton text="Add to Cart" className="product-listing-button" />
                        </Link>
                }

            </div>
        </div>
    )
}

export default ProductCard