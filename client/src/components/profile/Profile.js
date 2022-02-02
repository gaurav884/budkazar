import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom"
import "./Profile.css"
import { RiSettings2Fill } from "react-icons/ri";
import { BsFillCartFill } from "react-icons/bs";
import { AiTwotoneHeart } from "react-icons/ai";
import { BsCalendar3 } from "react-icons/bs";
import { RiUserShared2Fill } from "react-icons/ri";
import Confirmation from "../Modals/Confimation/Confirmation"
import { UserContext } from "../../contexts/UserContext"
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"



const Profile = () => {
    const history = useHistory();
    const {dispatch } = useContext(UserContext)
    const [isConfirmation, SetIsConfirmation] = useState(false);
    const confirmationText = "Are you sure you want to sign out ?"

    useEffect(() => {
        window.scrollTo(0, 0)
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            history.push("./sign-in")
        }

    }, [])

    return (<>
        <Navbar />
        {(isConfirmation) && <Confirmation
            text={confirmationText}
            signout={(signout) => {
                SetIsConfirmation(false)
                localStorage.clear();
                dispatch({ type: "CLEAR" })
                history.push("/")
            }}
            close={(close) => {
                SetIsConfirmation(false)
            }}
        />}
        <div className="profile-page-container">
            <div className="profile-options-container-one">
                <Link className="profile-option-details profile-options-hover" to="/account-details">
                    <div className="profile-option-icon-container"><RiSettings2Fill /> </div>
                    <p className="profile-option-icon-heading">Account details</p>

                </Link>
                <Link className="profile-option-orders profile-options-hover" to="/orders">
                    <div className="profile-option-icon-container"><BsCalendar3 /> </div>
                    <p className="profile-option-icon-heading">Order History</p>
                </Link>
                <Link className="profile-option-cart profile-options-hover" to="/cart">
                    <div className="profile-option-icon-container"><BsFillCartFill /> </div>
                    <p className="profile-option-icon-heading">Cart</p>
                </Link>
                <Link className="profile-option-wishList profile-options-hover" to="/wishlist">
                    <div className="profile-option-icon-container"><AiTwotoneHeart /> </div>
                    <p className="profile-option-icon-heading">WishList</p>
                </Link>
                <div className="profile-option-sign-out profile-options-hover" onClick={() => { SetIsConfirmation(true) }}>
                    <div className="profile-option-icon-container"><RiUserShared2Fill /> </div>
                    <p className="profile-option-icon-heading">Sign out</p>
                </div>
            </div>

        </div>
        <Footer />
    </>
    )
}

export default Profile
