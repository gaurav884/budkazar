import React, { useState } from 'react'
import "./Sidebar.css"
import Sortbar from "../sortbar/Sortbar"
import { BsFilterRight } from "react-icons/bs";
import StarRating from "../Modals/StarRating"

const Sidebar = (props) => {
    const [isDown, setIsDown] = useState(false);

    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();

    const [oneStar, setOneStar] = useState(false);
    const [twoStar, setTwoStar] = useState(false);
    const [threeStar, setThreeStar] = useState(false);
    const [fourStar, setFourStar] = useState(false);

    const [tenPercent, setTenPercent] = useState(false);
    const [twentyPercent, setTwentyPercent] = useState(false);
    const [thirtyFivePercent, setTThirtyFivePercent] = useState(false);
    const [fiftyPercent, setFiftyPercent] = useState(false);

    function discountToggleHandler(val) {
        if (val === 10) {
            setTenPercent(!tenPercent)
            setTwentyPercent(false)
            setTThirtyFivePercent(false)
            setFiftyPercent(false)
        }
        else if (val === 20) {
            setTenPercent(false)
            setTwentyPercent(!twentyPercent)
            setTThirtyFivePercent(false)
            setFiftyPercent(false)
        }
        else if (val === 35) {
            setTenPercent(false)
            setTwentyPercent(false)
            setTThirtyFivePercent(!thirtyFivePercent)
            setFiftyPercent(false)
        }
        else if (val === 50) {
            setTenPercent(false)
            setTwentyPercent(false)
            setTThirtyFivePercent(false)
            setFiftyPercent(!fiftyPercent)
        }
    }
    function ratingToggleHandler(val) {
        if (val === 1) {
            setOneStar(!oneStar)
            setTwoStar(false)
            setThreeStar(false)
            setFourStar(false)
        }
        else if (val === 2) {
            setOneStar(false)
            setTwoStar(!twoStar)
            setThreeStar(false)
            setFourStar(false)
        }
        else if (val === 3) {
            setOneStar(false)
            setTwoStar(false)
            setThreeStar(!threeStar)
            setFourStar(false)
        }
        else if (val === 4) {
            setOneStar(false)
            setTwoStar(false)
            setThreeStar(false)
            setFourStar(!fourStar)
        }
    }

    return (
        <>

            <div className="sports-section-filter-toggler-container" onClick={() => { setIsDown(!isDown) }}>
                <div className="sports-section-filter-wrapper">
                    <BsFilterRight />
                    <p>Filter</p>
                </div>
            </div>



            <div className={(isDown) ? "sidebar-container sidebar-container-down" : "sidebar-container"}>
                <div className="sidebar-sort">
                    <Sortbar 
                       sortingMethod={props.sortingMethod}

                       highToLow={() => {
                        props.highToLow("highToLow")

                    }}
                    popularity={() => {
                        props.popularity("popularity")

                    }}
                    lowToHigh={() => {
                        props.lowToHigh("lowToHigh")

                    }}
                    />
                </div>

                <div className="sidebar-category-filter">
                    <p>Categories</p>
                    <div className="sidebar-category"><input type="checkbox" className="filter-checkbox-Shooter" onChange={(e) => { props.categoryFilter(`shooter`, e.target.checked) }} /><span>Shooter</span></div>
                    <div className="sidebar-category"><input type="checkbox" className="filter-checkbox-Racing" onChange={(e) => { props.categoryFilter(`racing`, e.target.checked) }} /><span>Racing</span></div>
                    <div className="sidebar-category"><input type="checkbox" className="filter-checkbox-Simulation" onChange={(e) => { props.categoryFilter(`simulation`, e.target.checked) }} /><span>Simulation</span></div>
                    <div className="sidebar-category"><input type="checkbox" className="filter-checkbox-Fighting" onChange={(e) => { props.categoryFilter(`fighting`, e.target.checked) }} /><span>Fighting</span></div>
                    <div className="sidebar-category"><input type="checkbox" className="filter-checkbox-Sports" onChange={(e) => { props.categoryFilter(`sports`, e.target.checked) }} /><span>Sports</span></div>
                </div>

                <div className="sidebar-price-range-filter">
                    <p>Price Range</p>
                    <input className="sidebar-price-range-filter-min" type="number" placeholder="Min" value={minPrice} onChange={(e) => { setMinPrice(e.target.value) }} />to
                    <input className="sidebar-price-range-filter-max" type="number" placeholder="Max" value={maxPrice} onChange={(e) => { setMaxPrice(e.target.value) }} />
                    <button onClick={() => {
                        if (minPrice == undefined) {
                            props.priceFilter(0, maxPrice)
                        }
                        else if (maxPrice == undefined) {
                            props.priceFilter(minPrice, Number.MAX_VALUE)
                        }
                        else {
                            props.priceFilter(minPrice, maxPrice)
                        }

                    }}>Find</button>
                </div>

                <div className="sidebar-rating-filter">
                    <p>By Rating</p>

                    <div className={oneStar?"sidebar-rating-one selected-rating-discount":"sidebar-rating-one"} onClick={() => {
                        ratingToggleHandler(1);
                        { !oneStar ? props.ratingFilter(1) : props.ratingFilter(0) }
                    }}>
                        <span > <StarRating value={1} /> </span>
                        <label>& up</label>
                    </div>

                    <div className={twoStar?"sidebar-rating-two selected-rating-discount":"sidebar-rating-two"} onClick={() => {
                        ratingToggleHandler(2);
                        { !twoStar ? props.ratingFilter(2) : props.ratingFilter(0) }

                    }}>
                        <span > <StarRating value={2} /> </span>
                        <label>& up</label>
                    </div>


                    <div className={threeStar?"sidebar-rating-three selected-rating-discount":"sidebar-rating-three"} onClick={() => {
                        ratingToggleHandler(3);
                        { !threeStar ? props.ratingFilter(3) : props.ratingFilter(0) }

                    }}>
                        <span > <StarRating value={3} /> </span>
                        <label>& up</label>
                    </div>

                    <div className={fourStar?"sidebar-rating-four selected-rating-discount":"sidebar-rating-four"} onClick={() => {
                        ratingToggleHandler(4);
                        { !fourStar ? props.ratingFilter(4) : props.ratingFilter(0) }
                    }}>
                        <span> <StarRating value={4} /> </span>
                        <label>& up</label>
                    </div>



                </div>


                <div className="sidebar-discount-filter">
                    <p>Discount</p>
                    <div className={tenPercent?"sidebar-category selected-rating-discount":"sidebar-category"}><span onClick={(e) => {
                        discountToggleHandler(10)
                        { (!tenPercent) ? props.discountFilter(10) : props.discountFilter(0) }

                    }
                    }>10% or more</span></div>

                    <div className={twentyPercent?"sidebar-category selected-rating-discount":"sidebar-category"}><span onClick={(e) => {
                        discountToggleHandler(20)
                        { (!twentyPercent) ? props.discountFilter(20) : props.discountFilter(0) }
                    }}>20% or more</span></div>

                    <div className={thirtyFivePercent?"sidebar-category selected-rating-discount":"sidebar-category"}><span onClick={(e) => {
                        discountToggleHandler(35)
                        { (!thirtyFivePercent) ? props.discountFilter(35) : props.discountFilter(0) }
                    }}>35% or more</span></div>

                    <div className={fiftyPercent?"sidebar-category selected-rating-discount":"sidebar-category"}><span onClick={(e) => {
                        discountToggleHandler(50)
                        { (!fiftyPercent) ? props.discountFilter(50) : props.discountFilter(0) }
                    }}>50% or more</span></div>

                </div>
            </div>
        </>
    )
}

export default Sidebar
