import React, { useEffect, useState } from 'react';
import './BooksLayout.css';
import ProductCard from '../../ProductCard/ProductCard';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { getAllBookDetailsAPI } from '../../../utils/apicalls';
import { deleteBookDataAPI } from '../../../utils/apicalls';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../../../Redux/Slices/spinnerSlice';
function AllProducts({ isAdmin }) {
  let navigate = useNavigate();
  const [booksData, setBookData] = useState([]);
  const dispatch = useDispatch();
  //Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;


  const getData = async () => {
    try {
      //Get all book Details
      dispatch(showLoading());
      const res = await getAllBookDetailsAPI();
      dispatch(hideLoading());
     
      setBookData(res.data.payload);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdate = async (id) => {
  
    const bookData = booksData.filter((book) => book._id === id);
  
    navigate('/update-books', { state: bookData });
  };

  const handleDelete = async (id) => {
    try {

      dispatch(showLoading());
      let dbRes = await deleteBookDataAPI(id);
      dispatch(hideLoading());

      if(dbRes.status === 200){
        toast.success("Book Deleted");
        const updatedBookData = booksData.filter((book) => book._id !== id);
        setBookData(updatedBookData);      
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Calculate the index of the first and last books to display on the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = booksData.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='mt-5'>
      <Toaster />
      {/* Display Product Cards */}
      <div className="container" key={"temp"}>
        <div className="row">
          {currentBooks.map((book, index) => (
            <div className="col-sm-3" key={book._id}>
              <ProductCard book={book} isAdmin={isAdmin} handleUpdate={handleUpdate} handleDelete={handleDelete} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            {[...Array(Math.ceil(booksData.length / booksPerPage)).keys()].map((number) => (
              <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'dark-active' : ''}`}>
                <span className="page-link" onClick={() => paginate(number + 1)}>
                  {number + 1}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AllProducts;