import React, { useState } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm';
import ResetPasswordForm from './ResetPasswordForm'

const Login = ({ url, toggleLogin, toggleGuest, setUser }) => {

    const [signUp, setSignUp] = useState(false);
    const [login, setLogin] = useState(true);
    const [forgetpw, setforgetpw] = useState(false);
    const showSignUp = () => {
        setSignUp(!signUp)
        setLogin(!login)
    }
    const showForgetPw = () => {
        setforgetpw(!forgetpw)
        setLogin(!login)
    }

    // function to verify user

    return (
        <Router>
            <div className='container'>
                {login ? <LoginForm
                    url={url}
                    showSignUp={showSignUp}
                    showForgetPw={showForgetPw}
                    toggleLogin={toggleLogin}
                    toggleGuest={toggleGuest}
                    setUser={setUser}
                /> : null}

                {signUp ? <SignUpForm
                    url={url}
                    showSignUp={showSignUp}
                /> : null}

                {forgetpw ? <ResetPasswordForm
                    url={url}
                    showForgetPw={showForgetPw}
                    toggleLogin={toggleLogin}
                /> : null}

            </div>
        </Router>

    );
}

export default Login