import React from 'react'
import "./Confirmation.css"

const Confirmation = (props) => {
    return (
        <div className="confirmation-modal-background">
            <div className="confirmation-modal-container">
                 <div className="confirmation-modal-heading-container">
                     <p>{props.text}</p>
                 </div>
                 <div className="confirmation-modal-buttons-container">
                     <button onClick={()=>{props.signout("signout")}}>Yes</button>
                     <button onClick={()=>{props.close("close")}}>No</button>
                 </div>
            </div>
        </div>
    )
}

export default Confirmation
