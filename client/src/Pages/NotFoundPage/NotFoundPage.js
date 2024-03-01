import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className='container '>
            <div className="text-center mt-5">
                <h1 className="display-1">404</h1>
                <p className="lead">Oops! Page not found.</p>
                <p className="mb-4">The page you are looking for might not exist.</p>
                <Link to="/" className="btn btn-primary">Go to Home</Link>
            </div>
        </div>
    );
}

export default NotFoundPage;
