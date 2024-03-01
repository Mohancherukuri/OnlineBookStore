import React from 'react'
import {Link} from 'react-router-dom'
function NavIconLink({path,theme,icon}) {
    return (
        <li className="nav-item">
            <Link className={theme ? `nav-links` : `dark-nav-links`} to={path}>
            <i className={icon}></i>
            </Link>
        </li>
    )
}

export default NavIconLink
