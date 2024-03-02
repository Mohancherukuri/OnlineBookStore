import React, { useEffect, useState, useContext } from 'react'
import './DetailsSection.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import OrangeButton from '../../Buttons/OrangeButton';
import { userLoginContextObj } from './../../../Context/userLoginContext';
import BookImage from '../../BookImage/BookImage';
import Popup from '../../Popup/Popup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../../../Redux/Slices/spinnerSlice';
import { getBookDetailsAPI } from '../../../utils/apicalls';


import { toast,Toaster } from 'react-hot-toast';

function DetailsSection() {
    const navigate = useNavigate();
    const { id } = useParams();
    let { addToCart } = useContext(userLoginContextObj);

    let [bookData, setBookData] = useState('');

    //Popup States
    let [showPopupAndNavigate, setShowPopupAndNavigate] = useState(false)
    let [showPopup, setShowPopup] = useState(false);
    let [promptMsg, setPromptMsg] = useState('');
    let [promptHeading, setPromptHeading] = useState('')

    const dispatch = useDispatch();

    let getData = async () => {
        try {
            dispatch(showLoading());
            let res = await getBookDetailsAPI(id);
            dispatch(hideLoading());
         
          
            if (res.data.payload.length === 0) {

                navigate("*")
            }

            setBookData(res.data.payload);
        }
        catch (e) {
            
            if(e.response.status === 500){
                dispatch(hideLoading())
                navigate("*");
            }
            else{
                dispatch(hideLoading())
                navigate("/error");
            }
        }
    }
    useEffect(() => {
        getData();
    }, [])


    const handleAddToCart = async () => {
        dispatch(showLoading());
        let res = await addToCart(bookData);
        dispatch(hideLoading());        
        if(res === "Book Added to Cart"){
            toast.success("Book Added to Cart")
        }
        else{
            dispatch(hideLoading());      
            navigate("/error");
        }


    }
    return (
        <>
        <Toaster/>
        <div className='mt-5'>
            {showPopup && <Popup message={promptMsg} heading={promptHeading} showPopupAndNavigate={showPopupAndNavigate} setShowPopup={setShowPopup} path="/login" />}
            <div className='container details-container'>
                <div className='d-sm-flex justify-content-between'>
                    <div className='book-img-container d-flex justify-content-center w-100 mb-5'>
                        <BookImage className="" image={bookData.image} style={{}} />
                    </div>
                    <div className='book-detail-container w-100 p-sm-3'>
                        <h2 className='mb-0 '>{bookData.title}</h2>
                        <p className='mb-0 author'>{bookData.author}</p>
                        <p className='mb-0 p-0'>Gener : {bookData.genere}</p>
                        <p>{bookData.description}</p>
                        <p className='mb-0'><b>Language</b> : English</p>
                        <h3 className='mb-0 price'>&#8377;{bookData.price}</h3>
                        <OrangeButton onClick={handleAddToCart} className="cart-btn" text="Add to Cart" />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default DetailsSection