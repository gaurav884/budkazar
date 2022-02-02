import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom"
import "./SIgnup.css"
import { UserContext } from '../../contexts/UserContext'
import Navbar from "../navbar/Navbar"

const Signup = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory();
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [sameEmailError, setSameEmailError] = useState(false);


    const [isNameTouched, setIsNameTouched] = useState(false);
    const isNameValid = name.trim() !== ""
    const isNameInvalid = !isNameValid && isNameTouched

    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const isEmailValid = email.trim() !== "" && emailChecker()
    const isEmailInvalid = !isEmailValid && isEmailTouched

    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const isPasswordValid = password.trim() !== "" && passwordChecker()
    const isPasswordInvalid = !isPasswordValid && isPasswordTouched

    

    var isFormValid = false;

    

    if(isNameValid && isEmailValid && isPasswordValid && (confirmPassword==password)){
    
        isFormValid = true
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            history.push("/")
        }

    }, [])



    function createAccount() {
        fetch("/auth/sign-up/jfvuyfyt76rytufhjfjhgf", {
            method: "POST",
            headers: {
                'content-Type': "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password

            })
        }).then(res => {
            res.json().then(data => {
                if (data.error) {
                    console.log(data.error)
                    setSameEmailError(true)
                }
                else {
                    setSameEmailError(false)

                    history.goBack();

                }

            }).catch(err => {
                console.log(err)
            })
        })
    }


    function nameHandler(e) {
        setName(e.target.value)
    }

    function emailHandler(e) {
        setEmail(e.target.value)
    }

    function passworHandler(e) {
        setPassword(e.target.value)

    }

    function confirmPasswordHandler(e) {
        setConfirmPassword(e.target.value)

    }



    function nameBlurHandler() {
        setIsNameTouched(true)
    }

    function emailBlurHandler() {
        setIsEmailTouched(true)
    }

    function passwordBlurHandler() {
        setIsPasswordTouched(true)
    }

   



    function emailChecker() {

        const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

        if (re.test(String(email).toLowerCase())) {
            return true;
        }
        else {
            return false;
        }

    }

    function passwordChecker() {
        const re = /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;

        if (re.test(String(password))) {
            return true
        }
        else {
            return false
        }

    }

    

    if (state) {
        history.push("/profile")
    }

    return (
        <>
            <Navbar />
            <div className="signup-container">
                <div className="signup-box">
                    <p className="signup-heading">Sign Up</p>
                    <div className="signup-name-container">

                        <input type="text" className="signup-name-input" placeholder="Name" value={name} onChange={(e) => { nameHandler(e) }} onBlur={() => { nameBlurHandler() }} />
                        {(isNameInvalid) ? <p className="sign-up-error">Enter the name</p> : null}
                        
                    </div>
                    <div className="signup-email-container">

                        <input type="email" className="signup-email-input" placeholder="Email" value={email} onChange={(e) => { emailHandler(e) }} onBlur={() => { emailBlurHandler() }} />
                        {(isEmailInvalid) ? <p className="sign-up-error">Enter the correct email</p> : null}
                    </div>
                    <div className="signup-password-container">

                        <input type="password" className="signup-pass-input" placeholder="Password" value={password} onChange={(e) => { passworHandler(e) }} onBlur={() => { passwordBlurHandler() }} />

                        {(isPasswordInvalid) ? <p className="sign-up-error">Passoword must contain a digit, an uppercase letter, a lowercase letter, a character not being alphanumeric.</p> : null}
                    </div>
                    <div className="signup-confirmpassword-container">

                        <input type="password" className="signup-confirmpass-input" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => { confirmPasswordHandler(e) }} />
                        {(password === confirmPassword) ? null : <p className="sign-up-error">Passwords does not match</p>}

                    </div>


                    <div className="signup-rembemberme-forgotpass-container">

                        <Link to="/sign-in">Already have an account?</Link>
                        {(sameEmailError) ? <p className="sign-up-error">Email already exists</p> : null}
                    </div>

                    {(isFormValid) ?
                        <button onClick={() => { createAccount() }}>Sign up</button> : <button style={{ opacity: 0.5 }}>Sign up</button>}



                </div>
            </div>
        </>
    )
}

export default Signup
