import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import {Main} from './components/Main'



const App = () => {
    return (
        <>
            <Main onSend={send_loc}/>
            <Navbar/>
        </>
    )
}

const send_loc = (locs) => {
    console.log(locs)
}

export default App