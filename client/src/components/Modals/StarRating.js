import React,{useState} from 'react'

const StarRating = ({value}) => {
  
    const Star = ({ marked, starId }) => {
        return (
            <span data-star-id={starId} className="star-product-page" role="button">
                {marked ? '\u2605' : '\u2606'}
            </span>
        );
    };


    return (
        <div className="review-rating-product-page">
            {Array.from({ length: 5 }, (v, i) => (
                <Star
                    starId={i + 1}
                    key={`star_${i + 1}`}
                    marked={value >= i + 1}
                />
            ))}
        </div>
    );
}

export default StarRating
