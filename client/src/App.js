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
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/book-details/:id" element={<DetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* {
          loginStatus ? <Route path="/order-details" element={<OrdersPage />} /> : <Route path="/order-details" element={<Navigate to="/login" />} />
        } */}
        <Route path="/order-details" element={<UserProtectedRoute><OrdersPage /></UserProtectedRoute>} />

        {/* {
          isAdmin ? <Route path="/admin" element={<AdminBooksPage />} /> : <Route path="/admin" element={<Navigate to="/login" />}></Route>
        } */}
        <Route path="/admin" element={<AdminProtectedRoute><AdminBooksPage /></AdminProtectedRoute>} />

        {/* {
          isAdmin ? <Route path="/add-books" element={<AdminAddBooksPage />} /> : <Route path="/add-books" element={<Navigate to="/login" />}></Route>
        } */}
        <Route path="/add-books" element={<AdminProtectedRoute><AdminAddBooksPage /></AdminProtectedRoute>} />

        {/* {
          isAdmin ? <Route path="/update-books" element={<UpdateBookpage />} /> : <Route path="/update-books" element={<Navigate to="/login" />}></Route>
        } */}
        <Route path="/update-books" element={<AdminProtectedRoute><UpdateBookpage /></AdminProtectedRoute>} />

        <Route path="*" element={<NotFoundPage />} />
        <Route path = "/error" element ={<ErrorPage/>}/>
      </Routes>

    </div>
  );
}

export default App;