import React, { useState } from 'react'
import {Main} from './components/Main'
import Login from './components/Login'

// Base URL of the backend API (Backend-Coding). The original Heroku
// deployment, https://mybikesg-back.herokuapp.com, no longer exists.
const url = process.env.REACT_APP_API_URL || "http://localhost:9000"

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const toggleLogin = () => setLoggedIn(!loggedIn)
    const [guest, setGuest] = useState(false);
    const toggleGuest = () => setGuest(!guest)
    const [user, setUser] = useState(null)
    return (
        <>
            {loggedIn || guest ? null
                : <Login
                    url={url}
                    toggleLogin={toggleLogin}
                    toggleGuest={toggleGuest}
                    setUser={setUser}
                />}
            <Main 
                url={url}
                toggleGuest={toggleGuest}
                guest={guest}
                user={user}
                loggedIn={loggedIn}
            />
        </>
    )
}



export default App