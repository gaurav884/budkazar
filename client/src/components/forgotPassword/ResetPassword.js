import React, { useState } from 'react'
import { useParams} from "react-router-dom"
import "./ForgotResetPass.css"
import Navbar from "../navbar/Navbar"

const ResetPassword = () => {
    const [newPass, setNewPass] = useState("");
    const [confirmNewPass, setConfirmNewPass] = useState("");
    const { resetToken } = useParams();
    const [tokenExp, setTokenExp] = useState(false);
    const [sucess, setSucess] = useState(false);


    const [isNewPassTouched, setIsNewPassTouched] = useState(false);
    const isNewPassValid = newPass.trim() !== "" && newPassChecker()
    const isnewPassInvalid = !isNewPassValid && isNewPassTouched



    function newPassChecker() {
        const re = /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;

        if (re.test(String(newPass))) {
            return true
        }
        else {
            return false
        }

    }

    function newPassHandler(e) {
        setNewPass(e.target.value)
    }

    function newPassBlurHandler() {
        setIsNewPassTouched(true)
    }


    function resetPassHandler() {
        fetch("/auth/reset-password/jhvuyf678rfytfd767dyft", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                resetToken,
                newPass
            })
        }).then(res => {
            res.json().then(data => {

                if (data.error) {
                    console.log(data.error)
                    setTokenExp(true)
                }
                else {
                    setSucess(true)

                }

            }).catch(err => {
                console.log(err)
            })

        }).catch(err => {
            console.log(err)
        })
    }




    var isFormValid = false;



    if (isNewPassValid && (confirmNewPass == newPass)) {

        isFormValid = true
    }

    if (tokenExp) {
        return <div className="reset-password-container">
            <div className="forgot-password-email-sent-container">
                <p >Sorry the token has expired please <a href="/forgot-password" style={{ color: `blue` }}>try again</a>.</p>
            </div>
        </div>
    }



    return (<>
        <Navbar />
        <div className="reset-password-container">

            {(!sucess) ? <> <p className="forgot-password-container-heading" > Reset password </p>

                <div className="reset-password-newpass">


                    <input type="password" value={newPass} value={newPass} onChange={(e) => { newPassHandler(e) }} onBlur={() => { newPassBlurHandler() }} placeholder="New Password" />

                    {!isnewPassInvalid ? null :
                        <div className="settings-error-container">
                            <p>new Password must contain a digit, an uppercase letter, a lowercase letter, a character not being alphanumeric.</p>
                        </div>}
                </div>

                <div className="reset-password-confirmpass">

                    <input type="password" value={confirmNewPass} onChange={(e) => { setConfirmNewPass(e.target.value) }} placeholder="Confirm Password" />

                    {(newPass !== confirmNewPass) ?
                        <div className="settings-error-container">
                            <p>new password and confirm password does not match</p>
                        </div> : null}
                </div>




                {isFormValid ? <button onClick={(e) => { resetPassHandler() }}>Submit</button> : <button >Submit</button>

                }</>

                :

                <div className="forgot-password-email-sent-container">
                    <p >Your password has been changed sucessfully.You can now <a href="/sign-in" style={{ color: `blue` }}>sign in</a>.</p>
                </div>

            }
        </div>
    </>
    )
}

export default ResetPassword
