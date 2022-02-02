import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import "./OrderSucess.css"
import { Checkmark } from 'react-checkmark'

const OrderSucess = () => {
    useEffect(() => {

    }, [])


   
    return (
        <div className="OrderSucess-page-container">
        <div className="OrderSucess-container">
           
                <Checkmark size='100px' color='green' />

                <p className="OrderSucess-subheading">Congratulations your order has been placed successfully. Check out your email for more info.</p>
                <div className="OrderSucess-links-container">
                    <Link to="/" className="OrderSucess-link-container">Go to Homepage</Link>
                    <Link to="/orders" className="OrderSucess-link-container">Go to My Orders</Link>
                </div>
            </div>
        </div>
    )
}

export default OrderSucess