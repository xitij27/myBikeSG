import React from 'react'
import { Link } from "react-router-dom";
import "./LoginForm.css"

const loginform = ({ showSignUp, toggleLogin, toggleGuest }) => {
  return (
    <form className="add-form">
      <div className="header"><h1 className='header'>Login</h1></div>
      <div className="loginform-control">
        <input type="email" placeholder="Email" />
      </div>
      <div className="loginform-control">
        <input type="password" placeholder="Password" />
        <label><a href='#' >Forgot Password?</a></label>
      </div>
      <input type='submit' value='Continue' className='loginbtn loginbtn-block' onClick={toggleLogin} />
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