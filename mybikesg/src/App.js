import React from 'react'
import Drawer from './components/Drawer'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Map from './components/Map'


const App = () => {
    return (
        <>
            <Map />
            <Router>
                <Drawer onSend={send_loc}/>
            </Router>
            
            
        </>
    )
}

const send_loc = (locs) => {
    console.log(locs)
}

export default App