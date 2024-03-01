
import React, { useState } from 'react';
import NavIconLink from '../../NavIconLink/NavIconLink';
import NavLinkComp from '../../NavLink/NavLinkComp';

function UserNavLayout({ theme, handleLogout }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <ul className={`navbar-nav `}>
            {/* User Dropdown - Visible only on larger screens */}
            <li className={`nav-item p-0 d-none d-lg-block ${isDropdownOpen ? 'show' : ''}`} onClick={toggleDropdown}>
                <div
                    className="nav-item"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen ? 'true' : 'false'}
                >
                    <NavIconLink path="" theme={theme} icon="fa-sharp fa-solid fa-user" />
                </div>
                <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''} dropdown-menu-right mt-3`}>
                    {/* <NavLinkComp path="/user-profile" text="User Profile" theme={false} /> */}
                    {/* <div className="dropdown-divider"></div> */}
                    <NavLinkComp path="/order-details" text="Your Orders" theme={false} />
                    <div className="dropdown-divider"></div>
                    <NavLinkComp path="/" text="Logout" theme={false} handleLogout={handleLogout} />
                </div>
            </li>

            {/* User Options - Visible only on smaller screens */}


            <NavLinkComp path="/" text="Home" theme={theme} />
            <NavLinkComp path="/books" text="Books" theme={theme} />

            <NavIconLink path="/cart" theme={theme} icon="fa-sharp fa-solid fa-cart-shopping" />
            <div className="d-lg-none">
                <li className="nav-item">
                    <NavLinkComp path="/user-profile" text="User Profile" theme={theme} />
                </li>
                <li className="nav-item">
                    <NavLinkComp path="/" text="Logout" theme={theme} handleLogout={handleLogout} />
                </li>
            </div>
        </ul>
    );
}

export default UserNavLayout;
