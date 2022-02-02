import React from 'react'
import "./Sortbar.css"

const Sortbar = (props) => {
 
    return (
        <div className="Sortbar-container">
            <label>Sort By : </label>
            <span className={props.sortingMethod===1 ? "Sortbar-container-span-selected": ""} onClick={() => {
                props.popularity("popularity")
            }}>Popularity</span>

            <span className={props.sortingMethod===2 ? "Sortbar-container-span-selected": ""} onClick={() => {

                props.highToLow("highToLow")
            }}>Price - High to low</span>

            <span className={props.sortingMethod===3 ? "Sortbar-container-span-selected": ""} onClick={() => {
                props.lowToHigh("lowToHigh")

            }}> Price - Low to high</span>

        </div>
    )
}

export default Sortbar
