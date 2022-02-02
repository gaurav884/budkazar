import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom"
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaPercentage } from "react-icons/fa";
import { IoGameControllerOutline } from "react-icons/io5";


import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import Card from "../card/Card"

const Home = () => {
    const history = useHistory();
    const [caraImages, setCaraImages] = useState();
    const [currentCaraImage, setCurrentCaraImage] = useState(0);
    const [latestProducts, setLatestProducts] = useState();

    useEffect(() => {
        window.scrollTo(0, 0)
        getCaraImages()
        getAllProducts()
    }, [])


    useEffect(() => {
        if(window.innerWidth>1050){
        const changeSlide = setInterval(() => rightCaraImages(), 5000)
        return () => clearInterval(changeSlide);
    }
    }, [currentCaraImage, caraImages])

    function leftCaraImages() {
        if (caraImages) { setCurrentCaraImage(currentCaraImage === 0 ? caraImages.length - 1 : currentCaraImage - 1) };
    }
    function rightCaraImages() {
        if (caraImages) { setCurrentCaraImage(currentCaraImage === caraImages.length - 1 ? 0 : currentCaraImage + 1) };
    }

    function getCaraImages() {
        fetch("/misc/get-cara-images", {

            method: "GET",
            headers: {
                "content-type": "application/json"

            }

        }).then(response => {
            response.json().then(data => {
                if (data.error) {
                    history.push("/ERROR500/sadfijsoaidfjosidjfoi34234242423sdfsdf")
                }
                else {

                    setCaraImages(data.found)

                }

            }).catch(err => {
                console.log(err)
                history.push("/ERROR500/sadfijsoaidfjosidjfoi34234242423sdfsdf")
            })
        })
    }


    function getAllProducts() {
        fetch("./product/all-products", {

            method: "POST",
            headers: {
                "content-type": "application/json"

            },
            body: JSON.stringify({
                indexOfFirstProduct: 0,
                indexofLastProduct: 10
            })

        }).then(response => {
            response.json().then(data => {
                
                setLatestProducts(data.found)

            }).catch(err => {
                console.log(err)
            })
        })
    }



    return (
        <>
            <Navbar />
           
            <div className="home-page-container">

                <div className="home-caraousel-container">

                    <div className="carousel-left-container" onClick={() => { leftCaraImages() }}><BsFillArrowLeftCircleFill /></div>

                    {(caraImages) && <div className='home-caraousel-slider'>
                        {caraImages.map((each, index) => {
                            return <Link to={`/product/${each.linktoProduct}`} key={index}><img src={each.linktoImage} alt={each.title} className={currentCaraImage === index ? "active-slide-img" : "nonactive-slide-img"} key={-index} /></Link>
                        })}
                    </div>}

                    <div className="carousel-right-container" onClick={() => { rightCaraImages() }}><BsFillArrowRightCircleFill /></div>
                </div>



                <div className="latest-products-section">
                    <p className="latest-products-heading">Latest Products <IoGameControllerOutline/></p>

                    <div className="categories-container">
                        {latestProducts && latestProducts.map((each, index) => {

                            return <Card
                                product={each}
                                index={index}
                                key={index}

                            />
                        })

                        }

                    </div>

                </div>


                <div className="home-page-browse-collection-container">
                    <Link className="home-page-browse-collection-img-container" to="/products">
                    <img src="https://res.cloudinary.com/dagwb842k/image/upload/v1636956773/games_mekrxg.jpg"/>
                    </Link>
                    <div className="home-page-browse-collection-info-container">
                    <p className="home-page-browse-collection-heading">Browse</p>
                    <p className="home-page-browse-collection-sub-heading">Explore our products for your next game.</p>
                    
                    <button onClick={() => history.push("/products")}>Browse Products</button>
                    </div>
                </div>



                <div className="home-page-features-container">
                    <div className="home-page-feature-container">
                        <div className="home-page-feature-img-container">

                            <RiSecurePaymentLine />


                        </div>

                        <p className="home-page-feature-heading">Secure Transactions</p>
                        <p className="home-page-feature-sub-heading">Feel confident each time you transact with us. Stripe comes with SSL protection and wide range of payment processors under a safe and secured platform.</p>
                    </div>
                    <div className="home-page-feature-container">
                        <div className="home-page-feature-img-container">
                            <MdSupportAgent />
                        </div>

                        <p className="home-page-feature-heading">Customer Support</p>
                        <p className="home-page-feature-sub-heading">Our dedicated Customer Service team are available to help with any queries about your orders and provide exceptional after-sales support.</p>
                    </div>
                    <div className="home-page-feature-container">
                        <div className="home-page-feature-img-container">
                            <FaPercentage />
                        </div>

                        <p className="home-page-feature-heading">Best Offers</p>
                        <p className="home-page-feature-sub-heading">BudKazar provides competitive pricing to the buyers driven by a free market economy while striving to keep the cost low for our sellers.</p>
                    </div>
                </div>




                <Footer />


            </div>
        </>
    )
}

export default Home
