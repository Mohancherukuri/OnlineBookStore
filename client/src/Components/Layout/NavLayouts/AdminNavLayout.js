import React from 'react'
import NavLinkComp from '../../NavLink/NavLinkComp'
function AdminNavLayout({theme,handleLogout}) {
    return (
        <ul className="navbar-nav">
            {/* <NavLinkComp path="/" text="Home" theme={theme}/> */}
            <NavLinkComp path="/add-books" text="Add Books" theme={theme}/>
            <NavLinkComp path="/admin" text="Update/Delete Books" theme={theme}/>
            <NavLinkComp path="/" text="Logout" theme={theme} handleLogout={handleLogout}/>
        </ul>
    )
}

export default AdminNavLayout
