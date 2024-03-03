import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { addBookDetailsAPI } from '../../utils/apicalls'
import BooksFormLayout from '../../Components/Layout/BooksFormLayout/BooksFormLayout'
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { bookFormValidation } from '../../utils/formValidation';

import { showLoading, hideLoading } from '../../Redux/Slices/spinnerSlice';

function AdminAddBooksPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let handleAddBook = async (bookDetails) => {

    let error = bookFormValidation(bookDetails);

    if (error === null) {
      const formData = new FormData();
      console.log(bookDetails);
      formData.append("title", bookDetails.title);
      formData.append("author", bookDetails.author);
      formData.append("description", bookDetails.description);
      formData.append("genere", bookDetails.genere);
      formData.append("price", bookDetails.price);
      formData.append("image", bookDetails.image)

      try {

        dispatch(showLoading());
        let token = localStorage.getItem("token")
        const res = await addBookDetailsAPI(formData);
        dispatch(hideLoading());

        if (res.status === 200) {
          toast.success("Book Data Added");
          setTimeout(() => {
            navigate("/admin");
          }, 500);
        }
      }
      catch (e) {
        dispatch(hideLoading());
        navigate("/error");
      }
    }
    else{
      toast.error(error);
      return false;
    }

  }


  return (
    <div>
      <Toaster/>
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