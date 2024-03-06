import React, { useState, useEffect } from 'react'
import BlackButton from '../../Buttons/BlackButton'
import FormInputField from '../../FormInputField/FormInputField'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../../../Redux/Slices/spinnerSlice'
function BooksFormLayout({ onSubmit, heading, isEdit }) {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();

    //Form States
    let [title, setTitle] = useState('')
    let [author, setAuthor] = useState('')
    let [description, setDescription] = useState('')
    let [image, setImage] = useState(null)
    let [price, setPrice] = useState()
    let [genere, setgenere] = useState('')
    let [oldImage, setOldImage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        if (isEdit) {
            
            let _id = location.state[0]._id;
            dispatch(showLoading());
            await onSubmit({ _id: _id, title, author, description, image, price, genere, oldImage });
            dispatch(hideLoading());
        }
        else {
            dispatch(showLoading());
            let res = await onSubmit({ title, author, description, image, price, genere });
            dispatch(hideLoading());
            if (res) {
                setAuthor('');
                setTitle('');
                setDescription('');
                setImage(null);
                setPrice('');
                setgenere('');
            }

        }
    }

    useEffect(() => {

        //If you get values for update fill the values in the input fields
        console.log(location.state);
        if (location.state) {

            const { author, title, description, image, price, genere } = location.state[0];
            setAuthor(author || '');
            setTitle(title || '');
            setDescription(description || '');
            setImage(image || '');
            setPrice(price || 0);
            setgenere(genere || '');
            setOldImage(image || '');

        }
        else{
            navigate("/add-books")
        }
    }, [location.state]);

    return (
        <>
            <h2 className='text-white text-center p-3'>{heading}</h2>
            <form >
                <FormInputField
                    label='Book Name'
                    type='text'
                    className='form-input'
                    placeholder='Enter Book Name'
                    handleChange={setTitle}
                    value={title}
                />

                <FormInputField
                    label='Author'
                    type='text'
                    className='form-input'
                    placeholder='Enter Author Name'
                    handleChange={setAuthor}
                    value={author}
                />


                <FormInputField
                    label='genere'
                    type='text'
                    className='form-input'
                    placeholder='Enter the genere of the Book'
                    handleChange={setgenere}
                    value={genere}
                />

                <div className="form-group  mb-3">
                    <label className='text-white'>Description</label>
                    <textarea rows="4" cols="50" className='form-control' value={description} placeholder="Enter Description of the Book" onChange={(e) => { setDescription(e.target.value) }} />
                </div>

                {/* <input type="file" onChange={handleImageChange} /> */}
                <label>Image</label>
                <input class="form-control" type="file" id="formFile" onChange={handleImageChange}/>
                <FormInputField
                    label='Price'
                    type='number'
                    className='form-input'
                    placeholder='Enter the Price of the Book'
                    handleChange={setPrice}
                    value={price}
                />

                <div className='card-btn-container text-center w-50 mx-auto'>
                    <BlackButton type="submit" className="product-listing-button" onClick={handleSubmit} text={heading} />
                </div>

            </form>
        </>
    )
}

export default BooksFormLayout
