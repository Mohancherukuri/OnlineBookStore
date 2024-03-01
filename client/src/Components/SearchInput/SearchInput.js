import React, { useState } from 'react'
import './SearchInput.css'
import { useNavigate } from 'react-router-dom';
import OrangeButton from '../Buttons/OrangeButton';


function SearchInput() {
    const [searchFeild, setSearchFeild] = useState('');
    const navigate = useNavigate();

    let redirectToSearch = () =>{
        navigate('/search',{state:searchFeild})
    }
    
    return (
        <div className={`search-input-form-container d-flex mt-2`}>
            <input type="text"
                className='search-input'
                placeholder='Search your favorite book'
                value={searchFeild}
                onChange={(e) => setSearchFeild(e.target.value)} 
            />
            <OrangeButton onClick={redirectToSearch} text="Search" className='search-btn text-white'/>
        </div>
    )
}

export default SearchInput