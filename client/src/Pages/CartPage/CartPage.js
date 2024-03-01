import React from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import CartItemsContainer from '../../Components/Layout/CartItemsContainer/CartItemsContainer';
// import CartItemsContainer from '../Components/CartItemsContainer/CartItemsContainer';
function CartPage() {
  return (
    <div>
        <Navbar theme={true}/>
            <div style={{minHeight:"80vh"}}>
              <CartItemsContainer/>
            </div>
        <Footer/>
    </div>
  )
}

export default CartPage