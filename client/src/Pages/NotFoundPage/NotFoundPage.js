import React from 'react';
import {useNavigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleClick = () =>{
        let token = localStorage.getItem("token");
        if(token){
            let decodedToken = jwtDecode(token);
            if(decodedToken.isAdmin){
                navigate("/admin");
            }
            else{
                navigate("/");
            }
        }
        else{
            navigate("/")
        }
    }
    
    return (
        <div className='container '>
            <div className="text-center mt-5">
                <h1 className="display-1">404</h1>
                <p className="lead">Oops! Page not found.</p>
                <p className="mb-4">The page you are looking for might not exist.</p>
                <button className='btn btn-primary' onClick={handleClick}>Go to Home</button>
            </div>
        </div>
    );
}

export default NotFoundPage;
