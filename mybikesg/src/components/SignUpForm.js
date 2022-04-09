import React from 'react'
import { Link } from "react-router-dom";
import "./SignUpForm.css"

const SignUpForm = ({ showSignUp }) => {
    return (
        <form className="add-form">
            <div className="header"><h1 className='header'>Sign Up</h1></div>
            <div className="signupform-control">
                <input type="text" placeholder="Enter Name" />
            </div>
            <div className="signupform-control">
                <input type="email" placeholder="Enter Email" />
            </div>
            <div className="signupform-control">
                <input type="password" placeholder="Enter Password" />
            </div>
            <div className="signupform-control">
                <label>Enter Date of Birth</label>
                <input type="date" placeholder="Enter Date of Birth" />
            </div>

            <input type='submit' value='Continue' className='signupbtn signupbtn-block' />

            <Link to='#' className='signup'>
                <p onClick={showSignUp}>Already have an account? Sign in</p>
            </Link>
        </form>
    )
}

export default SignUpForm