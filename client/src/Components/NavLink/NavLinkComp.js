import React from 'react'
import { Link } from 'react-router-dom'
function NavLinkComp({ theme, path, text, handleLogout }) {
    return (
        <li className="nav-item">
            <Link className={theme  ? `nav-links` : `dark-nav-links`} to={path} onClick={handleLogout}>{text}</Link>
        </li>
    )
}

export default NavLinkComp
