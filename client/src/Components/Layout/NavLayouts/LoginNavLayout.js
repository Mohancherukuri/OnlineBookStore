import React from 'react'
import NavLinkComp from '../../NavLink/NavLinkComp'
import NavIconLink from '../../NavIconLink/NavIconLink'
function LoginNavLayout({ theme }) {
    return (
        
        <ul className="navbar-nav">
            <NavLinkComp path="/" text="Home" theme={theme}/>
            <NavLinkComp path="/books" text="Books" theme={theme}/>
            <NavIconLink path="/cart" theme={theme} icon="fa-sharp fa-solid fa-cart-shopping"/>
            <NavLinkComp path="/login" text="Log In" theme={theme}/>
        </ul>
        
    )
}

export default LoginNavLayout
