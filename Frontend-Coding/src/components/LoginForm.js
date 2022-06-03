import React from 'react'
import { Link } from "react-router-dom";
import "./LoginForm.css"
import CryptoJS from 'crypto-js'
import axios from 'axios'

const loginform = ({ url, showSignUp, showForgetPw, toggleLogin, toggleGuest, setUser }) => {

    const loginSubmit = () => {
        
        const login_url = url.concat("/api/login/");

        const data = {
            email: document.getElementById("email").value,
            password: CryptoJS.SHA256(document.getElementById("password").value).toString()
        }
        if (!data.email || !data.password) {
            alert("Please enter login credentials")
            return;
        }
        if (!(data.email.indexOf('@') > -1)) {
            alert("Enter a valid email address")
            return;
        }
        axios.post(login_url, data)
            .then(response => {
                if (response.data) {
                    toggleLogin(); 
                    alert(response.data);
                    setUser(data.email)
                } else alert("TEST")})
            .catch(err => {
                console.log(err)
                alert("Account does not exist")
            })
    }

    return (
        <form className="add-form">
            <div className="header"><h1 className='header'>Login</h1></div>
            <div className="loginform-control">
                <input id="email" type="email" placeholder="Email" required={true}/>
            </div>
            <div className="loginform-control">
                <input id="password" type="password" placeholder="Password" required={true} />
                {/* <label><p href='#' >Forgot Password?</p></label> */}
            </div>
            
            <Link to='#' className='forgetpw' onClick={showForgetPw}>
                Forgot password?
            </Link>
            <button type='button' value='Continue' className='loginbtn loginbtn-block' onClick={loginSubmit}>Login</button>
            
            <Link to='#' onClick={showSignUp}>
                Sign up
            </Link>
            <Link to='#' className='guest' onClick={toggleGuest}>
                Continue as guest
            </Link>
        </form>
    )
}

export default loginform;