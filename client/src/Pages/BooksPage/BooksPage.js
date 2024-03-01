import React from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import SearchInput from '../../Components/SearchInput/SearchInput';
import './BooksPage.css'
import Footer from '../../Components/Footer/Footer';
import BooksLayout from '../../Components/Layout/BooksLayout/BooksLayout'
function BooksPage() {

    return (
        <div>
            <Navbar theme={true} />
            {/* <div className='background-image'> */}
                <div className='search-container'>
                    <h3>Find your Book</h3>
                    <SearchInput theme={false} />
                </div>
                <BooksLayout />
            {/* </div> */}
            <Footer />
        </div>
    )
}

export default BooksPage