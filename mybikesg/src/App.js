import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import {Main} from './components/Main'



const App = () => {
    return (
        <>
            <Main/>
            <Navbar/>
        </>
    )
}



export default App