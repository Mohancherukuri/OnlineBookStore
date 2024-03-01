import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import BooksLayout from '../../Components/Layout/BooksLayout/BooksLayout'

function AdminBooksPage() {

    return (
        <div>
            <Navbar theme={true} />
            <div className='bg-dark text-white' style={{minHeight:"94vh",height:"fit-content",padding:"3rem"}}>
                <div className='d-flex justify-content-center align-items-center'>
                    <h2 className='text-white'>Update or Delete Books</h2>
                </div>
                <BooksLayout isAdmin = {true} />

            </div>
        </div>
    )
}

export default AdminBooksPage