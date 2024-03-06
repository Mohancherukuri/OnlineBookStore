import React from 'react'
import './Footer.css'
const Footer = () => {
    return (
        <>
            <div className="Footer bg-dark text-white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-12 ft-1">
                            <h3>Book<span>Shop</span></h3>
                            <p>From Classics to contemporary bestsellers, find your next adventure.</p>
                            <div className="footer-icons">
                                <i class="fa-brands fa-facebook"></i>
                                <i class="fa-brands fa-twitter"></i>
                                <i class="fa-brands fa-instagram"></i>
                                <i class="fa-brands fa-linkedin-in"></i>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-12 ft-2">
                            <h5>Quick Links</h5>
                            <ul>
                                <li className="nav-item">
                                    <a className="text-white">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="text-white">Portfolio</a>
                                </li>
                                <li className="nav-item">
                                    <a className="text-white">Contact Us</a>
                                </li>
                                
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-4 col-12 ft-3">
                            <h5>Quick Links</h5>
                            <p className='quick-links'><i class="fa-solid fa-phone-volume"></i> +91 7032810531</p>
                            <p className='quick-links'><i class="fa-solid fa-envelope"></i> bookie@gmail.com</p>
                            <p className='quick-links'><i class="fa-solid fa-paper-plane"></i> Hyderabad,India</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
