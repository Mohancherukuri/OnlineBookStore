import React, { useContext, useEffect, useState } from 'react'
import HorizontalProductCard from '../../Components/HorizontalProductCard/HorizontalProductCard';
import Navbar from '../../Components/Navbar/Navbar'
import { userLoginContextObj } from '../../Context/userLoginContext'
import {useDispatch} from 'react-redux'
import { showLoading,hideLoading } from '../../Redux/Slices/spinnerSlice';
import { getPreviousOrders } from '../../utils/apicalls';


function OrdersPage() {
    
    const dispatch = useDispatch();
    
    let { currentUser } = useContext(userLoginContextObj);

    let [userOrders,setUserOrders] = useState([]);

    const getData = async() =>{
       
        dispatch(showLoading());
        let token = localStorage.getItem('token');
        console.log(currentUser)
        let receivedData = await getPreviousOrders(currentUser.username,token)
        dispatch(hideLoading());

        if(receivedData.status === 200){
            let orderData = []
            orderData = receivedData.data.payload;
            orderData.reverse();
            setUserOrders(orderData);
        }
        
    }

    useEffect(()=>{
        getData();
    },[])

    return (
        <>
            <Navbar theme={true} />
            <div className='container mt-5'>
                <>
                    <h1>Your Previous Orders... </h1>
                </>
    
                {
                    userOrders.map((item) => {
                        return (
                            <div>
                                <div className='mt-5 bg-warning p-3 text-white'>
                                    <span style={{ fontSize: "30px", fontWeight:"bold" }}>{item.date}</span>
                                </div>
                                <div style={{ width: "90%" }}>
                                    {
                                        item.books.map((item2) => {
                                            return (<HorizontalProductCard book={item2} isCart={false} isProductCard={false} isOrderCard={true} key={item2.id} />)
                                        })
                                    }
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default OrdersPage