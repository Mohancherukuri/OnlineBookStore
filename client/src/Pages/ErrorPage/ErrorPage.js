import React from 'react'

function ErrorPage() {
    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div className='alert alert-danger text-center'>
                        Oops something went Wrong!!!<br/>
                        Please Try again later
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
