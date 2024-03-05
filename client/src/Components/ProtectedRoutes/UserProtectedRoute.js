import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

function UserProtectedRoute(props) {


    let token = localStorage.getItem("token");

    if (token) {
        let decodedToken = jwtDecode(token);
        if (decodedToken.isAdmin) {
            return <Navigate to='/login' />
        }
        return props.children;
    }


    else {
        return <Navigate to='/login' />
    }
}

export default UserProtectedRoute;