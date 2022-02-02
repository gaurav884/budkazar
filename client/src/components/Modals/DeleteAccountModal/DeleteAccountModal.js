import React,{useState , useEffect} from 'react'
import "./DeleteAccountModal.css"

const DeleteAccountModal = (props) => {
    const [Password,setPassword] = useState("");
    const [passError, setPassError] = useState(false);
    const [passOK ,setPassOK] = useState(false);
    
    useEffect(()=>{
        passwordCheck()
    },[Password])


    function passwordCheck(){
       
        fetch("/user/password-check", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                Password: Password
            })
        }).then(res => {
            res.json().then(data => {
                if(data.sucess){
                    setPassOK(true)
                    setPassError(false)
                }
                else{
                    setPassError(true)
                }

            }).catch(err => {
                console.log(err)
            })

        }).catch(err => {
            console.log(err)
        })
    }
    
    return (
        <div className="DeleteAccountModal-modal-background">
            <div className="DeleteAccountModal-modal-container">
                 <div className="DeleteAccountModal-modal-heading-container">
                     <p>Do you want to delete your account ?</p>
                     <input type="password" value={Password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                     {(passError) ? <div className="settings-error-containerr">
                            <p><li>Wrong password</li></p>
                        </div> : null}
                 </div>
                 <div className="DeleteAccountModal-modal-buttons-container">
                 {passOK ? <button onClick={()=>{props.deleteAccount("deleteAccount")}}>Yes</button>:<button style={{opacity:"0.7"}}>Yes</button>}
                     
                     <button onClick={()=>{props.close("close")}}>No</button>
                 </div>
            </div>
        </div>
    )
}

export default DeleteAccountModal
