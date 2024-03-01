import React from 'react'
import './ShowCase.css'
import Navbar from '../../Navbar/Navbar'
import SearchInput from '../../SearchInput/SearchInput'
function ShowCase() {
    return (
        <section className='showcase-container d-flex justify-content-center align-items-center'>
            <Navbar theme={false} />

            <div className='showcase-content text-dark text-align-center'>
                <h1 >Best Books Ever</h1>
                <p>Buy your book here for cheaper price.</p>
                <SearchInput />
            </div>
        </section>
    )
}

export default ShowCase