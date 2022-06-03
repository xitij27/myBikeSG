import React from 'react'
import { Link } from "react-router-dom";
import CryptoJS from 'crypto-js'
import "./SignUpForm.css"
import axios from 'axios'

const SignUpForm = ({ url, showSignUp }) => {

    const otp_url = url.concat("/api/sendOTP/0/")
    const signup_url = url.concat("/api/signUp/")

    // function that sends data to backend
    const sendOTP = () => {
        const user_email = document.getElementById("email").value
        const name = document.getElementById("name").value
        const dob = document.getElementById("dob").value
        const password = CryptoJS.SHA256(document.getElementById("password").value).toString()
        if (!user_email || !name || !dob || !password) {
            alert("Please ensure you have filled in all fields");
            return;
        }
        axios.get(otp_url.concat(user_email).toString())
        .then(response => alert(response.data))
        .catch(err => console.log(err))
    }

    const signUpSubmit = () => {
        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: CryptoJS.SHA256(document.getElementById("password").value).toString(),
            dob: document.getElementById("dob").value,
            otp: document.getElementById("OTP").value
        }
        axios.post(signup_url, data)
            .then(response => alert(response.data))
            .catch(err => console.log(err))
    }

    return (
        <form className="add-form">
            <div className="header"><h1 className='header'>Sign Up</h1></div>
            <div className="signupform-control">
                <input id="name" type="text" placeholder="Enter Name" required={true} />
            </div>
            <div className="signupform-control">
                <input id="email" type="email" placeholder="Enter Email" required={true}/>
            </div>
            <div className="signupform-control">
                <input id="password" type="password" placeholder="Enter Password" required={true}/>
            </div>
            <div className="signupform-control">
                <label>Enter Date of Birth</label>
                <input id="dob" type="date" placeholder="Enter Date of Birth" required={true}/>
            </div>

            <button type="button" className='signupbtn signupbtn-block' onClick={sendOTP}>Email OTP</button>
            <div className="signupform-control">
                <input id="OTP" type="number" placeholder="Enter OTP Here" required={true}/>
                <label>OTP is sent to your email, remember to check the junk folder</label>
            </div>
            <button type="button" className='signupbtn signupbtn-block' onClick={signUpSubmit}>Sign Up</button>
            <Link to='#' className='signup'>
                <p onClick={showSignUp}>Already have an account? Sign in instead</p>
            </Link>
        </form>
    )
}

export default SignUpForm