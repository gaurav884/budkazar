import React,{useState ,useContext} from 'react'
import { Link, useHistory } from "react-router-dom"
import "./Signin.css"
import { UserContext } from '../../contexts/UserContext'
import Navbar from "../navbar/Navbar"

const Signin = () => {
    const {state , dispatch} = useContext(UserContext)
    const [email , setEmail] = useState()
    const [password , setPassword] = useState();
    const [invalidLogin , setInvalidLogin] = useState(false)
    const history = useHistory();

    function signInHandler() {
        fetch("/auth/sign-in/hgjghgu76t78ufu6rf67uftf", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => {

            response.json().then(data => {
                if (data.error) {
                    console.log(data.error);
                    setInvalidLogin(true);
                    setEmail("")
                    setPassword("")
                }
                else {
                  
                    setInvalidLogin(false);
                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    dispatch({ type: "USER", payload: data.user })
                    history.goBack();
                    
                }
            })
        })

    }
     

    return (
        <>
        <Navbar/>
        <div className="signin-container">
            <div className="signin-box">
                <p className="signin-heading">Sign In</p>
                <div className="signin-email-container">
                   
                    <input autoComplete="on" type="email" className="signin-email-input" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="signin-password-container">
                   
                    <input autoComplete="on" type="password" className="signin-pass-input" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>

                <div className="signin-rembemberme-forgotpass-container">
                   
                    <Link to="/forgot-password">Forgot Password ?</Link>
                </div>

                {(invalidLogin)?<p className="sign-up-error">Your Email and Passoword does not match.</p>:null}
                { (password && email ) ? 
               <button onClick={()=>{signInHandler()}}>LOG IN NOW</button>:  <button style={{opacity:0.5}}>LOG IN NOW</button>}
 
                <p className="signin-signup-link">Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
                      

            </div>
        </div>
        </>
    )
}

export default Signin
