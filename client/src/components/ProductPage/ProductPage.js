import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom"
import "./ProductPage.css"
import { UserContext } from "../../contexts/UserContext"
import { FaWindows } from "react-icons/fa";
import { BsClipboardX } from "react-icons/bs";
import { useParams } from "react-router-dom"
import StarRating from "../Modals/StarRating"
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"



const ProductPage = () => {
    const history = useHistory();
    const { productid } = useParams();
    const [largeImage, setLargeImage] = useState([]);
    const [isExtended, setIsExteded] = useState(false)
    const [product, setProduct] = useState();
    const { state, dispatch } = useContext(UserContext);
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [buyNowItem, setbuyNowItem] = useState([]);
    const [productRating, setProductRating] = useState([]);


    useEffect(() => {
        window.scrollTo(0, 0)
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            dispatch({ type: "USER", payload: user })
            if (productid) {
                getProduct()
                getWishlistCart()
            }

        }
        else {
            if (productid) {
                getProduct()
            }
        }
    }, [])



    useEffect(() => {
        var temp = 0;
        if (product && product.reviews) {
            product.reviews.forEach((review) => {
                temp = temp + parseInt(review.rating)
            })

            const avg = temp / product.reviews.length;
            if ((avg - Math.floor(avg)) > 0.5) {
                setProductRating(Math.ceil(avg))
            }
            else {
                setProductRating(Math.floor(avg))
            }

        }
    }, [product])


    function getWishlistCart() {
        fetch("/user/get-wishlist-cart-array", {
            method: "GET",
            headers: {

                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        }).then(response => {

            response.json().then(data => {

             
             setWishlist(data.found.wishlist)
                setCart(data.found.cart)

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
                    setCart(data.result.cart)
                   

                }
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
                    setWishlist(data.result.wishlist)
                  

                }
            })
        })

    }


    function getProduct() {
        fetch(`/product/get-product/${productid}`, {
            method: "GET",
            header: {
                "content-type": "application/json"
            },

        }).then(response => {
            response.json().then(data => {
                if (data.error) {
                    history.push("/ERROR500/sadfijsoaidfjosidjfoi34234242423sdfsdf")
                }
                else {
       
                    setbuyNowItem([data])
                    setProduct(data)
                    setLargeImage(data.previewImages[0])
                }

            }).catch(err => {
                console.log(err)
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
                cart: buyNowItem,
                from: "buynow"
            })
        }).then(response => {

            response.json().then(data => {
                window.location = data.url

            })
        })

    }




    return (<>
        <Navbar />
        {(product) && <div className="product-page-conatainer">
            <div className="image-buyoptions-conatainer">
                <div className="image-buyoptions-conatainer-img-container">
                    <div className="product-page-big-img-container">
                        <img src={largeImage} />
                    </div>

                    <div className="product-page-small-img-container">
                        {product.previewImages.map((each, index) => {
                            return <div className="product-page-small-img-container-one" onClick={() => { setLargeImage(each) }} key={index}>
                                <img src={each} />
                            </div>
                        })}
                    </div>
                </div>


                <div className="buyoptions-container">

                    <div className="image-buyoptions-info-conatainer">
                        <h1 className="image-buyoptions-info-heading">{product.title}</h1>
                        <p className="image-buyoptions-info-sub-heading">Developer : {product.developer}</p>
                        <div className="image-buyoptions-info-ratings-container">
                            <span>Rating : </span>
                            <span className="image-buyoptions-info-ratings-star-container">
                                <StarRating
                                    value={productRating}
                                />
                            </span>
                        </div>
                        <p className="image-buyoptions-info-newprice">Price : <span> {product.price}</span> <label>{Math.floor((product.price * (100 - product.discount)) / 100)} Rs.</label></p>
                        <p className="image-buyoptions-info-discount">Discount : {product.discount}%</p>
                        <div className="image-buyoptions-info-platform-container">
                            <span>Platform : </span>
                            <span> {product.platform} <FaWindows /></span>

                        </div>

                    </div>
                    <div className="buyoptions--buttons-container">

                        {state ? <button className="buynow-button" onClick={() => { (buyNowItem) && payment() }}>Buy Now</button> : <button className="buynow-button" onClick={() => { history.push("/sign-in") }}>Buy Now</button>}

                        {(state) ? <>

                            {cart && cart.includes(product._id) ?

                                <button style={{ opacity: "0.7" }} onClick={() => {

                                }}>Already in cart</button>
                                :
                                <button onClick={() => {
                                    addToCart(product._id)
                                }}>Add to cart</button>
                            }
                        </>
                            :

                            <button className="addtocart-button" onClick={() => {
                                history.push("/sign-in")
                            }}>Add to Cart</button>

                        }

                        {(state) ? <>

                            {wishlist && wishlist.includes(product._id) ?

                                <button style={{ opacity: "0.7" }} onClick={() => {

                                }}>Already in Wishlist</button>
                                :
                                <button onClick={() => {
                                    addToWishList(product._id)
                                }}>Add to wishlist</button>
                            }

                        </>
                            :

                            <button className="addtocart-button" onClick={() => {
                                history.push("/sign-in")
                            }}>Add to Wishlist</button>

                        }

                    </div>
                </div>


            </div>

            <div className="product-description-container">
                <p className="product-description-container-heading">Product Description</p>
                <div className="product-description-about-container">
                    <p>{product.description}</p>
                    <div className="product-description-about-img-container">
                        <img src={product.coverImage} />
                    </div>
                </div>
                <div className="product-description-keyfeatures-container">
                    <p>Key Features</p>
                    <ul>
                        {product.keyFeatures.map((each, index) => {
                            return <li key={index}>{each}</li>
                        })}

                    </ul>

                </div>
            </div>

            <div className="product-requirements-container">
                <p className="product-requirements-container-heading">System Requirements</p>
                <div className="requirements-container">
                    <div className="requirements-min">
                        <p className="requirements-min-heading">Minimum Requirements</p>
                        <div className="requirements-OS"> <span>OS : </span> <span className="requirements-content"> {product.minReq.os}</span></div>
                        <div className="requirements-OProcessor"> <span>Processor : </span> <span className="requirements-content">{product.minReq.cpu}</span></div>
                        <div className="requirements-Memory"> <span> Memory : </span> <span className="requirements-content">{product.minReq.ram} </span></div>
                        <div className="requirements-Graphics"> <span>Graphics : </span> <span className="requirements-content">{product.minReq.graphicsCard}</span></div>
                        <div className="requirements-Storage"> <span>Storage : </span> <span className="requirements-content"> {product.minReq.storage}</span></div>
                    </div>

                    <div className="requirements-recom">
                        <p className="requirements-recom-heading">Recommended Requirements</p>
                        <div className="requirements-OS"> <span>OS : </span> <span className="requirements-content"> {product.minReq.os}</span></div>
                        <div className="requirements-OProcessor"> <span>Processor : </span> <span className="requirements-content">{product.minReq.cpu}</span></div>
                        <div className="requirements-Memory"> <span> Memory : </span> <span className="requirements-content"> {product.minReq.ram} </span></div>
                        <div className="requirements-Graphics"> <span>Graphics : </span> <span className="requirements-content">{product.minReq.graphicsCard}</span></div>
                        <div className="requirements-Storage"> <span>Storage : </span> <span className="requirements-content"> {product.minReq.storage}</span></div>

                    </div>
                </div>
            </div>

            <div className="product-reviews-container">
                <p className="product-reviews-container-heading">Customer Reviews</p>


                <div className={(isExtended) ? "product-reviews-cards-container product-reviews-cards-container-extended" : "product-reviews-cards-container"}>
                    {(product.reviews.length > 0) ? product.reviews.map((eachreview, index) => {
                        return <div className="product-reviews-card-container" key={index}>
                            <p className="product-reviews-card-by">by {eachreview.by.name} <span className="product-reviews-card-rating">{eachreview.rating} Star</span></p>

                            <p className="product-reviews-card-content">"{eachreview.text}"</p>
                        </div>

                    })
                        :
                        <div className="product-reviews-card-no-review-container">
                            <div className="product-reviews-empty">
                                <p>No reviews yet</p>
                                <div className="product-reviews-empty-img-wrapper"><BsClipboardX /></div>

                            </div>
                        </div>}




                </div>
                {(product.reviews.length > 3) && <div className="product-reviews-cards-extender"><span onClick={() => { setIsExteded(!isExtended) }}>{isExtended ? "Show Less" : "Show More"}</span></div>}

            </div>



        </div>}
        <Footer />
    </>
    )
}

export default ProductPage
