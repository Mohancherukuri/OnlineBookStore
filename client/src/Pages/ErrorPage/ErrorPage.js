import React from 'react'

function ErrorPage() {
    return (
        <div className='container '>
            <div className="text-center mt-5">
                {/* <h1 className="display-1">404</h1> */}
                <h3 className="lead">Oops! Something went wrong in the Server.</h3>
                <p className="mb-4">Please try again later</p>
            </div>
        </div>
    )
}

export default ErrorPage
