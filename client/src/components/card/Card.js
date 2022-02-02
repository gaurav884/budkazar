import React from 'react'
import "./Card.css"
import { useHistory } from "react-router-dom"

const Card = (props) => {
   
   const history = useHistory();
    return (
        <div className="product-card-conatiner"  onClick={()=>{
            history.push(`/product/${props.product._id}`)
        }}>
            <div className="product-card-img-container">
                <img src={props.product.thumbnail} alt="" />
            </div>
            <h4 className="product-card-heading">{props.product.title}</h4>
            <p className="product-card-sub-heading">{props.product.developer}</p>
            <div className="product-card-price">
                <span className="product-card-price-discounted">{Math.floor((props.product.price*(100-props.product.discount))/100)} Rs.</span>
                <span className="product-card-price-orignal">{props.product.price} Rs.</span>
            </div>
           
            
        </div>
    )
}

export default Card
