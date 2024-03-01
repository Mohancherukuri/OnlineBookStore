import React, { useContext, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { userLoginContextObj } from '../../Context/userLoginContext';
import LoginNavLayout from '../Layout/NavLayouts/LoginNavLayout';
import UserNavLayout from '../Layout/NavLayouts/UserNavLayout';
import AdminNavLayout from '../Layout/NavLayouts/AdminNavLayout';

function Navbar({ theme }) {

    let { loginStatus, handleLogout, isAdmin } = useContext(userLoginContextObj);

    let [collapse, setCollapse] = useState(true);

    const toggleNavbar = () => {
        setCollapse(!collapse);
    }


    return (
        <section className={`navbar-container  ${theme ? 'background-dark' : 'background-transparent'} ${collapse ^ theme ? '' : 'background-dark-absolute'}`}>
            <nav className="navbar navbar-expand-lg">

                <Link className="logo" to="/">BookShop</Link>

                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded={!collapse ? 'true' : 'false'}
                    aria-label="Toggle navigation"
                    onClick={toggleNavbar}
                >

                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse justify-content-end ${collapse ? '' : 'show'}`} id="navbarNav">
                    {
                        isAdmin ?
                            <>
                                <AdminNavLayout theme={theme} handleLogout={handleLogout} />
                            </>
                            :
                            <>
                                {
                                    loginStatus ?
                                        <UserNavLayout theme={theme} handleLogout={handleLogout} />
                                        :
                                        <LoginNavLayout theme={theme} handleLogout={handleLogout} />
                                }
                            </>

                    }
                </div>
            </nav>
        </section>
    );
}

export default Navbar;
