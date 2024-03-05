import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { updateBookDetailsAPI } from '../../utils/apicalls'
import {  useNavigate } from 'react-router-dom'
import BooksFormLayout from '../../Components/Layout/BooksFormLayout/BooksFormLayout'
import { Toaster, toast } from 'react-hot-toast'
import { bookFormValidation } from '../../utils/formValidation'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../../Redux/Slices/spinnerSlice'

import axios from 'axios'
function UpdateBookpage() {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [isUpdate, setIsUpdate] = useState(false)

    let handleUpdate = async (data) => {
        let error = bookFormValidation(data);
        if(error === null){
            try {
            

                data.price = parseInt(data.price);
                const formData = new FormData();
                formData.append("_id", data._id);
                formData.append('image', data.image);
                formData.append("title", data.title);
                formData.append("author", data.author);
                formData.append("description", data.description);
                formData.append("genere", data.genere);
                formData.append("price", data.price);
                formData.append("oldImage", data.oldImage);
    
                dispatch(showLoading());
                let dbRes = await axios.put("http://localhost:4000/book-api/update-book", formData);
                dispatch(hideLoading());
    
                if (dbRes.status === 200) {
                    toast.success("Book Data Updated");
                    setTimeout(() => {
                        navigate('/admin')
                    }, 1000);
                }
                else{
                    toast.error("Something went wrong. Try again later")
                }
            } catch (error) {
                dispatch(hideLoading());
                navigate("/error");
            }
        }
        else{
            dispatch(hideLoading());
            toast.error(error);
        }
    }



    return (
        <div>
            <Navbar theme={true} />
            <Toaster />
            <div>
                <div className='bg-dark d-flex justify-content-center align-items-center' style={{ minHeight: "94vh" }}>
                    <div className='container p-4 ' style={{ marginTop: "-90px" }}>
                        <BooksFormLayout heading="Update Book Details" onSubmit={handleUpdate} isEdit={true} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UpdateBookpage