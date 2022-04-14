import React from 'react'
import { Link } from "react-router-dom";
import "./resetpasswordform.css"
import CryptoJS from 'crypto-js'
import axios from 'axios'

const ResetPasswordForm = ({ url, showForgetPw }) => { 
    const sendOTP = () => {
        const otp_url = url.concat("/api/sendOTP/1/")
        const user_email = document.getElementById("email").value
        const password = CryptoJS.SHA256(document.getElementById("password").value).toString()
        const confirmpassword = CryptoJS.SHA256(document.getElementById("confirmpassword").value).toString()
        if (!user_email || !password || !confirmpassword) {
            alert("Please ensure you have filled in all fields");
            return;
        } else if (password !== confirmpassword) {
            alert("Make sure both your passwords match");
            return;
        }
        axios.get(otp_url.concat(user_email).toString())
        .then(response => alert(response.data))
        .catch(err => console.log(err))
    }
    const resetpwdSubmit = () => {
        const reset_url = url.concat("/api/resetPassword/")
        const data = {
            email: document.getElementById("email").value,
            password: CryptoJS.SHA256(document.getElementById("password").value).toString(),
            otp: document.getElementById("OTP").value
        }
        
        axios.post(reset_url, data)
            .then(response => alert(response.data))
            .catch(err => console.log(err))

        showForgetPw()
    }
    return (
        <form className="add-resetform">
            <div className="header"><h1 className='header'>Reset Password</h1></div>
            <Link to='#' className='goback'>
                <p onClick={showForgetPw}>Go back</p>
            </Link>
            <div className="resetform-control">
                    <input id="email" type="email" placeholder="Enter Email" required={true}/>
            </div>
            <div className="resetform-control">
                    <input id="password" type="password" name="password" placeholder="Enter New Password" required={true}/>
            </div>  
            <div className="resetform-control">
                    <input id="confirmpassword" type="password" name="confirmpassword" placeholder="Confirm Password" required={true}/>
            </div>  
            <button type="button" className='resetbtn resetbtn-block' onClick={sendOTP}>Email OTP</button>
            <div className="form-control">
                    <input id="OTP" type="number" placeholder="Enter OTP Here" required={true}/>
                    <label>OTP is sent to your email, remember to check the junk folder</label>
            </div>    
            <button type='button' className='resetbtn resetbtn-block' onClick={resetpwdSubmit}>Submit</button>
        </form>
    )
}

export default ResetPasswordForm;