import React, { useState } from 'react'
import * as FaIcons from "react-icons/fa";
import * as GrIcons from "react-icons/gr";
import { Link } from "react-router-dom";
import "./Drawer.css";


const Drawer = ({ onSend }) => {
    const [burger, setDrawer] = useState(false)
    const showDrawer = () => setDrawer(!burger)

    const [start, setStart] = useState("")
    const [dest, setDest] = useState("")
    const [rack, setRack] = useState(false)


    const onSubmit = (e) => {
        e.preventDefault()
        if (!start) {
            alert("Please enter starting location")
            return
        }
        onSend({ start, dest, rack })
    }

    return (
        <>
            <div className={burger ? "burger" : "not-burger"}>
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showDrawer} />
                </Link>
            </div>
            <nav className={burger ? "nav-menu active" : "nav-menu"}>
                <ul className='nav-menu-items'>
                    <li className="navbar-toggle">
                        <Link to="#" className='menu-bars'>
                            <GrIcons.GrClose onClick={showDrawer} />
                        </Link>
                    </li>
                    <li>
                        <form className="add-form" onSubmit={onSubmit}>
                            <div className="form-control">
                                <label className="form-control-header">Starting Location</label>
                                <input
                                    type="text"
                                    placeholder="Starting Location"
                                    value={start}
                                    onChange={(e) => setStart(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label className="form-control-header">Ending Location</label>
                                <input
                                    type="text"
                                    placeholder="Ending Location"
                                    value={dest}
                                    onChange={(e) => setDest(e.target.value)} />
                            </div>
                            <div className="form-control form-control-check">
                                <label className="form-control-header">Set nearest racks as destination</label>
                                <input
                                    type="checkbox"
                                    checked={rack}
                                    value={rack}
                                    onChange={(e) => setRack(e.currentTarget.checked)}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Submit"
                                className="btn btn-block" />
                        </form>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Drawer
