import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Navbar.css"
import * as FaIcons from "react-icons/fa";
import * as GrIcons from "react-icons/gr";


function Navbar() {

    const [cloud, setClouds] = useState(false)
       
    const showClouds = () => {
        setClouds(!cloud)
    }

    function Home(){
        alert("Hi")
    }

    return (
        <>
            <button 
            className='btn-home'
            onClick={Home}>Home</button> 
            <button 
            className='btn-route'
            onClick={Home}>Route</button> 
            <button 
            className='btn-repair'
            onClick={Home}>Repair Shops</button> 
            <button 
            className='btn-racks'
            onClick={Home}>Racks</button> 
            <button 
            className='btn-add'
            onClick={Home}>Add Racks</button>
            <Router>
            <div className={cloud ? "cloud" : "not-cloud"}>
                <Link to="#" className="nav-cloud">
                    <FaIcons.FaCloud size="40px" onClick={showClouds}/>
                </Link>
            </div>
            </Router>
            

        </>
    )
}

export default Navbar