import React from 'react'
import "./Navbar.css"
function Navbar() {

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

        </>
    )
}

export default Navbar