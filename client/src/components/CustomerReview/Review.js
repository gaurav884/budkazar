import React, { useState, useEffect } from 'react'
import "./Review.css"
import { AiOutlineClose } from "react-icons/ai";


const Rating = (props) => {

    const [review, setReview] = useState();
    const [RRating, setRRating] = useState();


    const Star = ({ marked, starId }) => {
        return (
            <span data-star-id={starId} className="star" role="button">
                {marked ? '\u2605' : '\u2606'}
            </span>
        );
    };

    const StarRating = ({ value, Ratingset }) => {
        const [rating, setRating] = useState((parseInt(value)) || RRating);
        const [selection, setSelection] = useState(0);

        useEffect(() => {

            Ratingset(rating)
        }, [rating])

        const hoverOver = event => {
            let val = 0;
            if (event && event.target && event.target.getAttribute('data-star-id'))
                val = event.target.getAttribute('data-star-id');
            setSelection(val);
        };
        return (
            <div className="review-rating"
                onMouseOut={() => hoverOver(null)}
                onClick={e => {
                    setRating(e.target.getAttribute('data-star-id') || rating)
                }}
                onMouseOver={hoverOver}
            >
                {Array.from({ length: 5 }, (v, i) => (
                    <Star
                        starId={i + 1}
                        key={`star_${i + 1}`}
                        marked={selection ? selection >= i + 1 : rating >= i + 1}
                    />
                ))}
            </div>
        );
    }

    function addReview(prodID) {
        fetch("/product/review", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                prodID,
                review,
                RRating


            })
        }).then(response => {

            response.json().then(data => {
                console.log(data)
                if(data.error){
                
                }
                else{
                    setRRating();
                    setReview("");
                    props.close(`closemodal`)
                }
              
            })
        })

    }

    return (
        <div className="review-background">
            <div className="review-container">
            <div className="review-cancel"><div onClick={()=>{props.close(`closemodal`)}}><AiOutlineClose/></div></div>
                <p className="review-heading">Give us your feedback</p>
                <StarRating
                    Ratingset={(ratingvalue) => {
                        setRRating(ratingvalue)
                    }}
                />
                <textarea id="w3review" name="w3review" rows="5" cols="45" maxlength="300" value={review} onChange={(e) => { setReview(e.target.value) }} />
   {review && RRating ?   <button onClick={() => { addReview(props.prodID) }}>Submit</button>:  <button style={{opacity:"0.7"}}>Submit</button>}
              

            </div>
        </div>
    )
}

export default Rating
