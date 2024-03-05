import React from 'react'
import ProductListing from '../../Components/Layout/ProductListing/ProductListing';
import ShowCase from '../../Components/Layout/Showcase/ShowCase'
import Footer from './../../Components/Footer/Footer';
function HomePage() {

    return (
        <div>
            <ShowCase/>
            <ProductListing/>
            <Footer/>
        </div>    
    )
}

export default HomePage