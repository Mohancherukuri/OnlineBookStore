import React, { useState, useEffect } from 'react'
import ProductCard from '../../ProductCard/ProductCard';
import './ProductListing.css'
import { getAllBookDetailsAPI } from '../../../utils/apicalls';
import { useNavigate } from 'react-router-dom';
import { showLoading,hideLoading } from '../../../Redux/Slices/spinnerSlice';
import { useDispatch } from 'react-redux';
import { shuffleArray } from '../../../utils/shuffleArray';
function ProductListing() {
    const navigate = useNavigate();
    let [bookData, setBookData] = useState([]);
    const dispatch = useDispatch();
    let getData = async () => {
        try{
            dispatch(showLoading());
            let res = await getAllBookDetailsAPI();//getAllBookDetails
            dispatch(hideLoading());
            if(res.status === 200){
                let bookList = res.data.payload;
                let shuffledList = shuffleArray(bookList)
                setBookData(shuffledList);
            }
        }
        catch(e){
            navigate("/error");
        }
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <div className='produjct-listing-container mt-5'>
            <div className='container'>
                <h2><span className='text-warning'>Bored?</span> <br />Books that might interest you.</h2>
                <div className='row mt-5'>
                    {
                        bookData.slice(0, 4).map((book) => {
                            return (
                                <div className='col-sm-3 mx-auto' key={book._id}>
                                    <ProductCard book={book} />
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default ProductListing