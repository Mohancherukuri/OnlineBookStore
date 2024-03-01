import React from 'react'

import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import DetailsSection from '../../Components/Layout/DetailsSection/DetailsSection'

function DetailsPage() {
    return (
        <div>
            <Navbar theme={true}/>
            <DetailsSection />
            <Footer/>
        </div>
    )
}

export default DetailsPage