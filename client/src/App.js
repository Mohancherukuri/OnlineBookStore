import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import HomePage from './Pages/HomePage/HomePage';
import BooksPage from './Pages/BooksPage/BooksPage';
import Login from './Pages/LoginPage/Login';
import SignUp from './Pages/RegisterPage/SignUp';
import DetailsPage from './Pages/DetailsPage/DetailsPage';
import CartPage from './Pages/CartPage/CartPage';
import SearchPage from './Pages/SearchPage/SearchPage';

import { userLoginContextObj } from './Context/userLoginContext';

import AdminBooksPage from './Pages/AdminBooksPage/AdminBooksPage';
import AdminAddBooksPage from './Pages/AddBooksPage/AddBooksPage';
import UpdateBookpage from './Pages/UpdateBooksPage/UpdateBooksPage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import OrdersPage from './Pages/OrdersPage/OrdersPage';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import { useNavigate } from 'react-router-dom';

import { validateToken } from './utils/apicalls';

import axios from 'axios';
import { useSelector } from 'react-redux';
import AdminProtectedRoute from './Components/ProtectedRoutes/AdminProtectedRoute';
import UserProtectedRoute from './Components/ProtectedRoutes/UserProtectedRoute';
import PublicProtected from './Components/ProtectedRoutes/PublicProtected';
import LoginProtected from './Components/ProtectedRoutes/LoginProtected';

function App() {
  const { loading } = useSelector(state => state.spinner);
  let { loginStatus, isAdmin, handleUserTokenLogin } = useContext(userLoginContextObj);
  const navigate = useNavigate();

  let checkTokenSession = async () => {
    let token = localStorage.getItem("token");
    //If no token is present Do nothing
    if (token === null) {
      return;
    }
    //If Token Exists
    else {
      try {
    
      //check token for it's expired
      let tokenStatus = await axios.post("http://localhost:4000/user-api/check-session-validity", { token });

      //If the token is expired
      if (tokenStatus.message === 'Expired') {
        return;
      }
      //Else perform a login with all the received data;
      else {
        handleUserTokenLogin(tokenStatus.data.payload)
      }
      } catch (error) {
          navigate("/error");
      }
    }


  }

  useEffect(() => {
    checkTokenSession();
  }, []);

  


  return (
    <div>
      {
        loading && (
          <div className='spinner-parent'>
            <div class="spinner-border" role="status">
            </div>
          </div>
        )
      }
      <Routes>
        <Route path="/" element={<PublicProtected><HomePage/></PublicProtected>} />
        <Route path="/books" element={<PublicProtected><BooksPage /></PublicProtected>} />

        <Route path="/login" element={<LoginProtected><Login /></LoginProtected>} />
        <Route path="/signup" element={<LoginProtected><SignUp /></LoginProtected>} />

        <Route path="/search" element={<PublicProtected><SearchPage /></PublicProtected>} />
        <Route path="/book-details/:id" element={<DetailsPage />} />
        <Route path="/cart" element={<PublicProtected><CartPage /></PublicProtected>} />
       
        <Route path="/order-details" element={<UserProtectedRoute><OrdersPage /></UserProtectedRoute>} />

        <Route path="/admin" element={<AdminProtectedRoute><AdminBooksPage /></AdminProtectedRoute>} />
        <Route path="/add-books" element={<AdminProtectedRoute><AdminAddBooksPage /></AdminProtectedRoute>} />
        <Route path="/update-books" element={<AdminProtectedRoute><UpdateBookpage /></AdminProtectedRoute>} />

        <Route path="*" element={<NotFoundPage />} />
        <Route path = "/error" element ={<ErrorPage/>}/>
      </Routes>

    </div>
  );
}

export default App;