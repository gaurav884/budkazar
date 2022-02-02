import React, { useEffect, useContext, useState } from 'react'
import "./Orders.css"
import { Link, useHistory } from "react-router-dom"
import MoonLoader from "react-spinners/MoonLoader";
import { BsCalendarX } from "react-icons/bs";
import { GoCalendar } from "react-icons/go";
import { UserContext } from '../../contexts/UserContext'
import { css } from "@emotion/react";
import Review from "../CustomerReview/Review"
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"


const Orders = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext)
    const [orders, setOrders] = useState();
    const [subTotal, setSubTotal] = useState();
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const [reviewModal, setReviewModal] = useState(false);
    const [reviewProductID, SetReviewProdductID] = useState("");

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
            getOrders()
        }
    }, [state])


    function getSubTotal(eachproduct) {
        var sum = 0;
        eachproduct.forEach(each => {

            let dicountedPrice = Math.floor((parseInt(each.price) * (100 - parseInt(each.discount))) / 100)
            sum = sum + dicountedPrice;

        })
        return sum

    }


    function getOrders() {
        fetch("/user/get-orders", {
            method: "GET",
            headers: {

                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        }).then(response => {

            response.json().then(data => {
                if (data.error) {
                    history.push("/ERROR500/sadfijsoaidfjosidjfoi34234242423sdfsdf")
                }
                else {
                    data.found.orders.sort((a, b) => {
                        return Date.parse(b.createdAt) - Date.parse(a.createdAt)
                    })
                    setOrders(data.found.orders)
                }

            }).catch(err => {
                console.log(err)
                history.push("/ERROR500/sadfijsoaidfjosidjfoi34234242423sdfsdf")
            })
        })

    }

    if (orders == undefined) {
        return <div> <MoonLoader color={color} loading={loading} css={override} size={60} /></div>
    }

    if (orders.length === 0) {
        <div className="orders-page-container">
            <div className="orders-container">
                <p className="orders-heading">Order History <span><GoCalendar /></span></p>
                <div className="orders-empty">
                    <p>No orders</p>
                    <div className="orders-empty-img-wrapper"><BsCalendarX /></div>
                </div>
            </div>
        </div>

    }



    return (
        <>
      <Navbar/>
            {reviewModal && <Review
                prodID={reviewProductID}
                close={(closemodal) => {
                    setReviewModal(false)
                }}
            />}

            <div className="orders-page-container">
                <div className="orders-container">
                    <p className="orders-heading">Order History <span><GoCalendar /></span></p>
                    {orders && orders.map((each, index) => {
                        return <div className="order-item-card" key={index}>
                            <div className="order-item-card-details">
                                <span>Order ID : {each._id}</span>
                                <span>Purchased on : {each.boughton}</span>

                            </div>

                            <div className="purchased-items-container">
                                <p>Order Items : </p>
                                {each.product.map((eachproduct, index) => {
                                    return <div className="purchased-each-item-container">
                                        <div className="purchased-each-item-img-title-container">
                                            <Link className="purchased-each-item-img-container" to={`/product/${eachproduct._id}`} ><img src={eachproduct.thumbnail} /></Link>
                                            <Link className="purchased-each-item-name-container" to={`/product/${eachproduct._id}`} >{eachproduct.title}</Link>
                                        </div>
                                        <button className="product-review-button" onClick={() => {
                                            SetReviewProdductID(eachproduct._id)
                                            setReviewModal(true)
                                        }}> Review the product</button>
                                        <span className="purchased-each-item-price-container"> Bought for : {Math.floor((eachproduct.price * (100 - eachproduct.discount)) / 100)} Rs.</span>
                                    </div>
                                })}
                            </div>
                            <div className="purchased-items--subtotal-container">
                                <p>Subtotal : {getSubTotal(each.product)} Rs.</p>
                            </div>

                        </div>
                    })}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Orders
