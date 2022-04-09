import React, { useState } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm';

const Login = ({ toggleLogin, toggleGuest }) => {

    const [signUp, setSignUp] = useState(false);
    const [login, setLogin] = useState(true);
    const showSignUp = () => {
        setSignUp(!signUp)
        setLogin(!login)
    }

    return (
        <Router>
            <div className='container'>
                {login ? <LoginForm
                    showSignUp={showSignUp}
                    toggleLogin={toggleLogin}
                    toggleGuest={toggleGuest}
                /> : null}

                {signUp ? <SignUpForm
                    showSignUp={showSignUp}
                /> : null}
            </div>
        </Router>

    );
}

export default Login