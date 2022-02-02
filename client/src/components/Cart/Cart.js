import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import "./Cart.css"
import { Link, useHistory } from "react-router-dom"
import { IoBagCheckOutline } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import { BsCartX } from "react-icons/bs";
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"



const Cart = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext)
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [totalpriceWOdiscount, SettotalpriceWOdiscount] = useState(0);
    const [totalDiscount, setTotalDisount] = useState(0);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const [cartString, setCartString] = useState([]);
    


    const override = css`
    display: block;
    margin: 250px auto;
    border-color: white;`;


    useEffect(() => {
        window.scrollTo(0, 0)
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            history.push("./sign-in")
        }

    }, [])

    useEffect(() => {
        if (state) {
            getWishlistCart()
            getCart()
           
        }

    }, [state])

    useEffect(() => {

        if (cart) {
            var sum1 = 0;
            var sum2 = 0;
            var sum3 = 0;
            cart.forEach(each => {
                let dicountedPrice = Math.floor((parseInt(each.price) * (100 - parseInt(each.discount))) / 100)
                let price = Math.floor((parseInt(each.price)))
                let discount = Math.floor((parseInt(each.price) * (parseInt(each.discount))) / 100)
                sum1 = sum1 + dicountedPrice;
                sum2 = sum2 + price;
                sum3 = sum3 + discount;

            })

            setSubtotal(sum1);
            SettotalpriceWOdiscount(sum2)
            setTotalDisount(sum3)

        }
    }, [cart])

    function getCart() {
        fetch("/user/get-wishlist-cart", {
            method: "GET",
            headers: {

                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        }).then(response => {

            response.json().then(data => {
                if(data.error){
                    history.push("/ERROR500/sadfijsoaidfjosidjfoi34234242423sdfsdf")
               }
               else{
                  
                setCart(data.found.cart)
                setLoading(false)
               }
           
            }).catch(err => {
                console.log(err)
                history.push("/ERROR500/sadfijsoaidfjosidjfoi34234242423sdfsdf")
            })
        })

    }

    function getWishlistCart() {
        fetch("/user/get-wishlist-cart-array", {
            method: "GET",
            headers: {

                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        }).then(response => {

            response.json().then(data => {
                setWishlist(data.found.wishlist)
                setCartString(data.found.cart)
                

            })
        })

    }

    function removefromCart(prodID) {
        fetch("/user/remove-from-cart", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                prodID
            })
        }).then(response => {

            response.json().then(data => {
                if (data.error) {
                    console.log(data.error);

                }
                else {
                  
                    setCart(data.result.cart)


                }
            })
        })

    }

    function payment() {
        fetch("/payment/create-checkout-session", {
            method: "POST",
            headers: {

                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                cart: cartString,
                from: "cart"

            })
        }).then(response => {

            response.json().then(data => {
                window.location = data.url

            })
        })

    }



    function addToWishList(prodID) {
        fetch("/user/add-to-wishlist", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                prodID
            })
        }).then(response => {

            response.json().then(data => {
                if (data.error) {
                    console.log(data.error);

                }
                else {
                    removefromCart(prodID)
               


                }
            })
        })

    }



    if (loading) {
        return <div> <MoonLoader color={color} loading={loading} css={override} size={60} /></div>
    }
    return (
        <>
        <Navbar/>
        <div>
            <div className="cart-page-container">
                <div className="cart-container">
                    <div className="cart-container-heading-list">
                        <p className="cart-heading">Cart <span><BsCart /></span></p>
                        {cart && <>
                            {cart.length === 0 &&
                                <div className="cart-empty">
                                    <p>Your cart is empty</p>
                                    <div className="cart-empty-img-wrapper"><BsCartX /></div>
                                </div>
                            }
                            {cart.map((each, index) => {
                                return <div className="cart-item-card" key={index}>
                                    <Link className="cart-items-img-container" to={`/product/${each._id}`} >
                                        <img src={each.thumbnail} />
                                    </Link>
                                    <Link className="cart-items-info-container" to={`/product/${each._id}`} >
                                        <div className="cart-item-info-wrapper">
                                            <div>
                                                <p className="cart-items-info-container-heading">{each.title}</p>
                                                <p className="cart-items-info-container-subheading">Developer : {each.developer}</p>
                                            </div>
                                            <p className="cart-items-info-container-price"> Price : {Math.floor((each.price * (100 - each.discount)) / 100)} Rs.</p>
                                        </div>
                                    </Link>
                                    <div className="cart-button-container">
                                        {wishlist && wishlist.includes(each._id) ?

                                            <button style={{ opacity: "0.7" }}>Already in Wishlist</button>
                                            :
                                            <button onClick={() => {
                                                setCart()
                                                addToWishList(each._id)
                                            }}>Move to Wishlist</button>
                                        }


                                        <button onClick={() => {
                                            setCart()
                                            removefromCart(each._id)
                                        }}>Remove</button>
                                    </div>
                                </div>
                            })}
                        </>
                        }
                    </div>
                    <div className="cart-order-summary-container">
                        <p className="cart-order-summary-heading">Order Summary</p>
                        <div className="cart-order-details">
                            <p className="cart-order-summary-total-price-without-discount">Total Price : {totalpriceWOdiscount} Rs.</p>
                            <p className="cart-order-summary-total-discount">Total Discount : - {totalDiscount} Rs.</p>
                            <p className="cart-order-summary-total-price">Subtotal ({cart && cart.length} items) : {subtotal} Rs.</p>

                            <button className="cart-order-summary-button" onClick={() => { (cart.length>0) && payment() }}><span>Proceed to checkout</span> <label><IoBagCheckOutline /></label></button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <Footer />
        </>
    )
}

export default Cart
