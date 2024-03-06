import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

function LoginProtected(props) {


    let token = localStorage.getItem("token");

    if (token) {
        let decodedToken = jwtDecode(token);
        
        if(decodedToken.isAdmin){
            return <Navigate to="/admin"/>;    
        }
        else{
            return <Navigate to="/"/>
        }
        
    }
    return props.children;

}

export default LoginProtected;