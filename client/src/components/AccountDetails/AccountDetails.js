import React, { useState, useContext ,useEffect} from 'react'
import {useHistory} from "react-router-dom"
import "./AccountDetails.css"
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineSave } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { IoKeySharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"

import { UserContext } from "../../contexts/UserContext"
import DeleteAccountModal from '../Modals/DeleteAccountModal/DeleteAccountModal';

const AccountDetails = () => {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext);
    const [oldPass, setOldPass] = useState();
    const [newPass, setNewPass] = useState("");
    const [confirmNewPass, setConfirmNewPass] = useState("");
    const [oldpassError, setOldPassError] = useState(false);
    const [passwordOk, setPassowrdOk] = useState(true);
    const [newName, setNewName] = useState();
    const [newNameOk , setNewNameOk] = useState(false);
    const [newNameEdit, setNewNameEdit] = useState(false);
    const [deleteAccountModal, setDeleteAccountModal] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            history.push("./sign-in")
        }

    }, [])

    function changeName() {
        fetch("/user/change-name", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                name: newName
            })
        }).then(res => {
            res.json().then(data => {
             
                localStorage.setItem("user", JSON.stringify(data.result));
                dispatch({ type: "USER", payload: data.user })
                window.location.reload(false);

            }).catch(err => {
                console.log(err)
            })

        }).catch(err => {
            console.log(err)
        })
    }

    function passwordChecker(e) {
        setNewPass(e.target.value)
        const re = /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;

        if (re.test(String(newPass))) {
            setPassowrdOk(true)
        }
        else {
            setPassowrdOk(false)
        }

    }

    function passwordChangeHandler() {
        fetch("/user/change-password", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')

            },
            body: JSON.stringify({
                oldPass,
                newPass
            })
        }).then(res => {
            res.json().then(data => {
           
                if (data.error) {
                    setOldPassError(true)
                }
                else {
                    window.location.reload(false);
                }


            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })

    }

    function deleteUserAccount() {
        fetch("/user/delete-account", {
            method: "delete",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                
            })
        }).then(res => {
            res.json().then(data => {
                if(data.error){
        
                }
                else{
                 
                 localStorage.clear();
                 dispatch({ type: "CLEAR" })
                 history.push("/")
                }

            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    }

    function nameChecker(e){
        setNewName(e.target.value)
        var regex = /^\s+$/
        
        if (regex.test(String(newName)) || !newName) {
            setNewNameOk(false)
      
        }
        else {
            setNewNameOk(true)
      
        }

    }


    return (
        <>
        <Navbar/>
            {(deleteAccountModal) && <DeleteAccountModal
              
              deleteAccount={(deleteAccount) => {
                    deleteUserAccount();
                }}
              close={(close) => {
                    setDeleteAccountModal(false)
                }}
            />}
            <div className="Account-details-page-container">
                <div className="Account-details-container">


                    <p className="Account-details-heading-general-settings">GENERAL SETTINGS  <FiSettings/></p>
                    <p className="Account-details-heading-general-settings-content">Manage the account details you've shared with Epic Games including your name, contact info and more</p>


                    <div className="Account-details-ID">
                        <span>ID : </span>
                        <label> {state ? state._id : ""}</label>
                    </div>

                    <div className="Account-details-credentials">
                        <span>Name : </span>
                        <input type="text" readOnly={newNameEdit ? false : true} value={newName} placeholder={state ? state.name : ""} onChange={(e) => { nameChecker(e) }} />
                        {newNameEdit ?
                            <button onClick={() => { newNameOk && changeName() }}> <AiOutlineSave /></button>
                            :
                            <button onClick={() => { setNewNameEdit(true) }}><AiOutlineEdit /></button>}

                    </div>





                    <p className="Account-details-heading-security">SECURITY <IoKeySharp/></p>

                    <div className="Account-details-change-pass">
                        <p className="Account-details-heading-change-pass">Change Password <RiLockPasswordFill/></p>
                        <input type="password" value={oldPass} onChange={(e) => { setOldPass(e.target.value) }} placeholder="Present Password" />
                        <input type="password" value={newPass} onChange={(e) => { passwordChecker(e) }} placeholder="New Password" />
                        <input type="password" value={confirmNewPass} onChange={(e) => { setConfirmNewPass(e.target.value) }} placeholder="Confirm Password" />
                        {(newPass !== confirmNewPass) ?
                            <div className="settings-error-containerr">
                                <p><li>new password and confirm password does not match</li></p>
                            </div> : null}


                        {(passwordOk) ? null :
                            <div className="settings-error-containerr">
                                <p><li>new Password must contain a digit, an uppercase letter, a lowercase letter, a character not being alphanumeric.</li></p>
                            </div>}



                        {(oldpassError) ? <div className="settings-error-containerr">
                            <p><li>Wrong present password</li></p>
                        </div> : null}


                        {(oldPass) && (passwordOk) && (newPass === confirmNewPass) ? <button onClick={() => { passwordChangeHandler() }}>Change Password</button> : <button style={{ opacity: "0.7" }} >Change Password</button>}


                    </div>








                    <div className="Account-details-delete-account">
                        <p className="Account-details-heading-delete-account">Delete Account <RiDeleteBin6Line/></p>
                        <p className="Account-details-heading-delete-account-content">Click REQUEST ACCOUNT DELETE to start the process of permanently deleting your BudKaZar account including all personal information, purchases, in-game content.</p>
                        <button onClick={()=>{setDeleteAccountModal(true)}}>Delete Account </button>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default AccountDetails
