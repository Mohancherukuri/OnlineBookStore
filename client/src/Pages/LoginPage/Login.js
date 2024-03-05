// Login.jsx
//Import required Modules
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from "react-redux"
import { Toaster, toast } from 'react-hot-toast';

//Import required Styling
import './Login.css';

//Import required Components
import Navbar from '../../Components/Navbar/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BlackButton from '../../Components/Buttons/BlackButton';
import FormInputField from '../../Components/FormInputField/FormInputField';
import LoginImage from './../../Components/LoginImage/LoginImage';
import { signUpFormValidation } from '../../utils/formValidation';
import Footer from '../../Components/Footer/Footer';

//Import Context or Redux
import { userLoginContextObj } from '../../Context/userLoginContext';
import { showLoading, hideLoading } from '../../Redux/Slices/spinnerSlice';

//Return Login page
function Login() {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    let { handleUserLogin } = useContext(userLoginContextObj);

    //Form States
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    //Handle Form Submit
    let handleSubmit = async (e) => {
        e.preventDefault();

        // Perform Validations
        let errMsg = signUpFormValidation({ username, password });

        if (errMsg) {
            toast.error(errMsg)
        }

        //If there is no errors
        else {
            try {
                let userObj = {
                    username: username,
                    password: password
                };

                //Display Spinner
                dispatch(showLoading())
                //Handle Login Process
                let res = await handleUserLogin(userObj);
                //Hide Spinner
                dispatch(hideLoading());

                //If userLogin navigate to Home page
                if (res === "USER_LOGIN") {
                    toast.success("Login SuccessFull", 500)
                    setTimeout(() => {
                        navigate("/");
                    }, 550)
                }
                //If admin Login Navigate to Admin Page.
                else if (res === "ADMIN_LOGIN") {
                    toast.success("Login Successful");
                    setTimeout(() => {
                        navigate("/admin")
                    }, 500)
                }
                else if(res === "AXIOS_ERROR"){
                    navigate("/error");
                }
                else{
                    toast.error(res);
                }
            } catch (error) {
                
                navigate("/error");
                dispatch(hideLoading());
            }

        }
    };

    return (
        <div>
            <Navbar theme={true} />
            <Toaster />
            <div className='signup-container'>
                <LoginImage />
                <div className='signup-content-container'>
                    <div className='container'>
                        <div className='content-wrapper'>
                            <div className='signup-heading'>
                                <h2>Log In</h2>
                            </div>
                            <form onSubmit={handleSubmit}>

                                <FormInputField
                                    label='User Name'
                                    type='text'
                                    className='form-input w-100'
                                    placeholder='Enter your User Name'
                                    handleChange={setUsername}
                                />

                                <FormInputField
                                    label='Password'
                                    type='password'
                                    className='form-input w-100'
                                    placeholder='Enter your Password'
                                    handleChange={setPassword}
                                />

                                <div className='text-center'>
                                    <BlackButton text="Log In" className="submit-btn" type="submit" />
                                </div>
                            </form>
                            <div className='text-center mt-3 fs-5'>
                                Don't Have a account? <span ><Link to="/signup" className='link'>Sign Up Here</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;