import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import "./WishList.css"
import { Link, useHistory } from "react-router-dom"
import { BiHeart } from "react-icons/bi";
import { GiBrokenHeartZone } from "react-icons/gi";
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"

const WishList = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext)
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");



    const override = css`
    display: block;
    margin: 250px auto;
    border-color: white;`;

    useEffect(() => {
        if (state) {
            getWishlistCartArray()
            getWishlist()
        }
    }, [state])



    useEffect(() => {
        window.scrollTo(0, 0)
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            history.push("./sign-in")
        }

    }, [])

    function getWishlist() {
        fetch("/user/get-wishlist-cart", {
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

                    setWishlist(data.found.wishlist)
                    setLoading(false)

                }

            }).catch(err => {
                history.push("/ERROR500/sadfijsoaidfjosidjfoi34234242423sdfsdf")
                console.log(err)
            })
        })

    }

    function addToCart(prodID) {
        fetch("/user/add-to-cart", {
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

                    getWishlist()

                }
            })
        })

    }

    function removefromWishlist(prodID) {
        fetch("/user/remove-from-wishlist", {
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
                    setWishlist(data.result.wishlist)

                }
            })
        })

    }

    function getWishlistCartArray() {
        fetch("/user/get-wishlist-cart-array", {
            method: "GET",
            headers: {

                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        }).then(response => {

            response.json().then(data => {

                setCart(data.found.cart)

            })
        })

    }


    if (loading) {
        return <div> <MoonLoader color={color} loading={loading} css={override} size={60} /></div>
    }

    if (!state) {
        history.push("./sign-in")
    }

    return (
        <>
            <Navbar />
            <div className="wishlist-page-container">
                <div className="wishlist-container">
                    <p className="wishlist-heading">Wishlist<span><BiHeart /></span></p>
                    {(wishlist) && <>
                        {wishlist.length === 0 &&
                            <div className="wishlist-empty">
                                <p>Your wishlist is empty</p>
                                <div className="wishlist-empty-img-wrapper"><GiBrokenHeartZone /></div>
                            </div>
                        }
                        {wishlist.map((each, index) => {
                            return <div className="wishlist-item-card" key={index}>
                                    <div className="wishlist-item-cart-left">
                                        <Link className="wishlist-items-img-container" to={`/product/${each._id}`} >
                                            <img src={each.thumbnail} />
                                        </Link>
                                        <Link className="wishlist-items-info-container" to={`/product/${each._id}`} >
                                            <div className="wishlist-item-info-wrapper">
                                                <div className="wishlist-items-info-container-headings">
                                                    <p className="wishlist-items-info-container-heading">{each.title}</p>
                                                    <p className="wishlist-items-info-container-subheading">Developer : {each.developer}</p>
                                                </div>
                                                <p className="wishlist-items-info-container-price">{Math.floor((each.price * (100 - each.discount)) / 100)} Rs.</p>
                                            </div>

                                        </Link>
                                    </div>
                                    <div className="wishlist-button-container">

                                        {cart && cart.includes(each._id) ?

                                            <button style={{ opacity: "0.7" }}>Already in cart</button>
                                            :
                                            <button onClick={() => {
                                                setWishlist()
                                                removefromWishlist(each._id)
                                                addToCart(each._id)
                                            }}>Add to cart</button>}
                                        <button onClick={() => {
                                            setWishlist()
                                            removefromWishlist(each._id)
                                        }}>Remove</button>
                                    </div>

                                </div>
                            
                        })}
                    </>}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default WishList
