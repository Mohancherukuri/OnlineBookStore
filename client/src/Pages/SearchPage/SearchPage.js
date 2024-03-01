import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import './SearchPage.css'
import axios from 'axios'
import {Toaster,toast} from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import { useDispatch, UseDispatch } from 'react-redux'
import { getAllBookDetailsAPI } from '../../utils/apicalls'

import SearchInput from '../../Components/SearchInput/SearchInput'
import HorizontalProductCard from '../../Components/HorizontalProductCard/HorizontalProductCard'
import { showLoading,hideLoading } from '../../Redux/Slices/spinnerSlice'
function SearchPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    // let [bookData,setBookData] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    let getData = async () => {
        try {
            dispatch(showLoading());
            const  res = await getAllBookDetailsAPI();
            dispatch(hideLoading());    

            let bookData = res.data.payload;
            console.log(bookData);
            let searchValue = [];
            searchValue = bookData.filter((data) => data.title.toLowerCase().includes(location.state.toLowerCase()));
            console.log(searchValue)
            setSearchResult(searchValue);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state])
    return (
        <div>

            <Navbar theme={true} />
            <Toaster/>
            {
                searchResult.length !== 0  ?
                    <div className='search-result-container'>
                        <div className='container'>
                            <div className='mb-4'>
                                <SearchInput />
                            </div>
                            <h2>Your Search Results</h2>
                            {
                                searchResult.map((book) => {

                                    return (<HorizontalProductCard book={book} isProductCard={true} />)
                                })
                            }
                        </div>
                    </div>
                    :
                    <div className='search-result-container'>
                        <div className='container'>
                            <div className='mb-4'>
                                <SearchInput />
                            </div>
                            <h1>No Results Found</h1>
                            
                        </div>
                    </div>
            }
            <Footer />
        </div>
    )
}

export default SearchPage