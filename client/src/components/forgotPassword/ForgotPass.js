import React, { useState } from 'react'
import "./ForgotResetPass.css"
import Navbar from "../navbar/Navbar"

const ForgotPass = (props) => {
    const [email, setEmail] = useState();
    const [sucess, setSucess] = useState(false);
    const [notFoundError, setNotFoundError] = useState(false);

    function forgotPassHandler() {
        fetch("/auth/forgot-password/987y78gyfy54etdrdg", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                email
            })
        }).then(res => {
            res.json().then(data => {
           
                if (data.error) {
                    setNotFoundError(true)

                }
                else {
                    setNotFoundError(false)
                    setSucess(true)
                }

            }).catch(err => {
                console.log(err)
            })

        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
        <Navbar/>
        <div className="forgot-password-container">



            {(!sucess) ? <>   <p className="forgot-password-container-heading" >Forgot Your Password ? </p>
            <p className="forgot-password-container-subheading" >Enter the E-mail address that you used during registration further instructions will be given after that. </p>
                <div className="forgot-password-input-button-container">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <button onClick={() => { forgotPassHandler() }}>Submit</button>
                </div>
            </>
                :

                <div className="forgot-password-email-sent-container">
                    <p >Email has been sent to the given email address for confirmation purposes. Please click on the link provided in the email to reset your password.</p>
                </div>}

            {(notFoundError) ?
                <p className="forgot-password-notfound-error">No user found by this email !</p>
                : null}




        </div>
        </>
    )
}

export default ForgotPass
