import React from 'react'
import { Link } from "react-router-dom";
import "./LoginForm.css"
import CryptoJS from 'crypto-js'
import axios from 'axios'

const loginform = ({ showSignUp, toggleLogin, toggleGuest, setUser }) => {

    const loginSubmit = () => {
        const data = {
            email: document.getElementById("email").value,
            password: CryptoJS.SHA256(document.getElementById("password").value).toString()
        }
        axios.post("http://localhost:9000/api/login/", data)
            .then(response => {
                if (response.data) {
                    toggleLogin(); 
                    alert(response.data);
                    setUser(data.email)
                } else alert("Wrong password")})
            .catch(err => console.log(err))
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