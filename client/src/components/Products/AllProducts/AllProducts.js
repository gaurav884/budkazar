import React, { useEffect, useState } from 'react'
import Sidebar from "../../sidebar/Sidebar"
import Card from "../../card/Card"
import SortBar from "../../sortbar/Sortbar"
import Pagination from "../../pagination/Pagination"
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";
import "./AllProducts.css"
import Navbar from "../../navbar/Navbar"
import Footer from "../../footer/Footer"
import {useHistory } from "react-router-dom"

const AllProducts = () => {
   const [allProducts, setAllProducts] = useState();
    const [filtered, setFiltered] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(11);
    const [totalProducts, setTotalProducts] = useState();

    const indexofLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexofLastProduct - productsPerPage;

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Number.MAX_VALUE);
    const [byRating, setByRating] = useState(0);
    const [byDiscount, setByDiscount] = useState(0);

    const [shooter, setShooter] = useState(false);
    const [racing, setRacing] = useState(false);
    const [simulation, setSimulation] = useState(false);
    const [sports, setSports] = useState(false);
    const [fighting, setFighting] = useState(false);

    const [sortingMethod, setSortingMethod] = useState(1);


    let [color, setColor] = useState("#ffffff");
    let [loading, setLoading] = useState(true);

    const override = css`
    display: block;
    margin: 180px auto;
    border-color: white;`;


    useEffect(() => {
        window.scrollTo(0, 0)
        getAllProducts()
    }, [currentPage])


    useEffect(() => {
        if (allProducts) {
            filterProducts()
        }
    }, [allProducts, shooter, racing, simulation, sports, fighting, minPrice, maxPrice, byRating, byDiscount])


    useEffect(() => {
        getAllProducts()

    }, [sortingMethod])

    

    function filterProducts() {
        if (allProducts) {

            const newData = allProducts.filter((each) => {
                let eachRating = 0;
                let eachDiscount = parseInt(each.discount)
                let eachPrice = Math.floor((parseInt(each.price) * (100 - parseInt(each.discount))) / 100)
                let categoryMatch

                if (each.reviews.length > 0) {
                    each.reviews.forEach((review) => {
                        eachRating = eachRating + parseInt(review.rating)
                    })

                    const avg = eachRating / each.reviews.length;
                    if ((avg - Math.floor(avg)) > 0.5) {
                        eachRating = (Math.ceil(avg))
                    }
                    else {
                        eachRating = (Math.floor(avg))
                    }
                }

                if ((shooter || racing || simulation || sports || fighting) === false) {
                    categoryMatch = true;
                }
                else {
                    categoryMatch = ((shooter ? each.category == "shooter" : each.category == "asdfasdas") || (racing ? each.category == "racing" : each.category === "asdfasdf") || (sports ? each.category == "sports" : each.category === "adfaadf") || (simulation ? each.category == "simulation" : each.category === "asdfsadf") || (fighting ? each.category == "fighting" : each.category === "asdfsadf"))
                }


                return (eachPrice >= minPrice && eachPrice <= maxPrice && eachRating >= byRating && eachDiscount >= byDiscount && categoryMatch)
            })

            setFiltered(newData)

        }
    }

    function getAllProducts() {
        fetch("./product/all-products", {

            method: "POST",
            headers: {
                "content-type": "application/json"

            },
            body: JSON.stringify({
                indexOfFirstProduct: indexOfFirstProduct,
                indexofLastProduct: indexofLastProduct,
                sortingMethod
            })

        }).then(response => {
            response.json().then(data => {
             
                setAllProducts(data.found)
                setFiltered(data.found)
                setTotalProducts(data.total)


            }).catch(err => {
                console.log(err)
            })
        })
    }



    return (
        <>
            <Navbar />
            <Sidebar
                sortingMethod={sortingMethod}

                categoryFilter={(category, status) => {
                    if (category === "shooter") {
                        (status ? setShooter(true) : setShooter(false))
                    }
                    else if (category === "simulation") {
                        (status ? setSimulation(true) : setSimulation(false))
                    }
                    else if (category === "fighting") {
                        (status ? setFighting(true) : setFighting(false))
                    }
                    else if (category === "sports") {
                        (status ? setSports(true) : setSports(false))
                    }
                    else if (category === "racing") {
                        (status ? setRacing(true) : setRacing(false))
                    }
                }}
                priceFilter={(min, max) => {
                    setMinPrice(min)
                    setMaxPrice(max)
                }}

                discountFilter={(val) => {
                    setByDiscount(val)
                }}

                ratingFilter={(val) => {
                    setByRating(val)
                }}

                highToLow={() => {
                    setFiltered()
                    setSortingMethod(2)


                }}
                popularity={() => {
                    setFiltered()
                    setSortingMethod(1)


                }}
                lowToHigh={() => {
                    setFiltered()
                    setSortingMethod(3)


                }}
            />

            <div className="products-section-container">
                <div className="products-section-sort"> <SortBar
                    sortingMethod={sortingMethod}

                    highToLow={() => {
                        setFiltered()
                        setSortingMethod(2)


                    }}
                    popularity={() => {
                        setFiltered()
                        setSortingMethod(1)


                    }}
                    lowToHigh={() => {
                        setFiltered()
                        setSortingMethod(3)


                    }}
                /></div>


                <div className={`products-section-cards-container ${(!filtered) && "p-s-c-c-loading"}`}>
                    {(!filtered) && <div className="products-section-cards-container-loader"> <BarLoader color={color} loading={loading} css={override} size={30} /></div>}
                    {filtered && filtered.length > 0 && filtered.map((each, index) => {

                        return <Card
                            product={each}
                            index={index}
                            key={index}

                        />


                    })

                    }


                    {filtered && filtered.length === 0 &&
                        <p className="products-section-no-product">No products found. Please reduce the number of filters for better results</p>

                    }


                </div>
                {(filtered && filtered.length > 0 &&
                    <div className="allproducts-pagination-container">

                        <Pagination
                            productsPerPage={productsPerPage}
                            totalProducts={totalProducts}
                            currentPage={currentPage}
                            paginate={(pageNum) => {
                                setFiltered()
                                setCurrentPage(pageNum)

                            }}
                        />
                    </div>
                )}


            </div>


            <div className="products-page-footer">
                <Footer />
            </div>

        </>
    )
}

export default AllProducts
