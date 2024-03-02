import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { checkBookExistsAPI, addBookDetailsAPI } from '../../utils/apicalls'
import BooksFormLayout from '../../Components/Layout/BooksFormLayout/BooksFormLayout'
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"

import { showLoading,hideLoading } from '../../Redux/Slices/spinnerSlice';

function AdminAddBooksPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let handleAddBook = async (bookDetails) => {

    const formData = new FormData();
  
    formData.append("title", bookDetails.title);
    formData.append("author", bookDetails.author);
    formData.append("description", bookDetails.description);
    formData.append("genere", bookDetails.genere);
    formData.append("price", bookDetails.price);
    formData.append("image",bookDetails.image)

    try{
      
      dispatch(showLoading());
      const res = await addBookDetailsAPI(formData);
      dispatch(hideLoading());

      if(res.status === 200){
        toast.success("Book Data Added");
        setTimeout(() => {
          navigate("/admin");
        }, 500);
      }
    }
    catch(e){
  
      navigate("/error");
    }

  }


  return (
    <div>
      <Navbar theme={true} />
      <div>
        <Toaster />
        <div className='bg-dark d-flex justify-content-center align-items-center' style={{ minHeight: "94vh" }}>
          <div className='container p-4 text-white'>
            <BooksFormLayout heading="Add Book Details" onSubmit={handleAddBook} isEdit={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAddBooksPage