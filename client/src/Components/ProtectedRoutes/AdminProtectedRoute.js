import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

function AdminProtectedRoute(props) {


    let token = localStorage.getItem("token");

    if (token) {
        let decodedToken = jwtDecode(token);
        console.log(decodedToken);    
        if(decodedToken.isAdmin){
            return props.children;    
        }
        return <Navigate to='/' />
    }


    else {
        return <Navigate to='/login' />
    }
}

export default AdminProtectedRoute;