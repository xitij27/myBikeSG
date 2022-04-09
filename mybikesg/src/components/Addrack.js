import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BrowserRouter as Router } from "react-router-dom";
import "./Addrack.css"
import "./Navbar.css"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "./Drawer.css";
import axios from 'axios';

export function Addrack({ modalShow, setModalShow, toggleGuest, guest, reloadmap }) {

    const user_email = "scared2compile@gmail.com"

    const handleClose = () => {
        setModalShow(!modalShow);
    }
    const handleShow = () => {
        if (guest) {
            alert("Please log in first before performing this action")
            toggleGuest()
            console.log(guest)
            return
        }
        setModalShow(!modalShow);
    }
    const onUserRackSubmit = () => {

        if (rack_user_loc.lat == null || rack_user_loc.lng == null) {
            alert("A location is required")
            return
        }

        // console.log("in submit")
        // console.log(max_id)

        var rackinfo = {
            rack_id: max_id,
            user_email: user_email,
            lat: rack_user_loc.lat,
            long: rack_user_loc.lng,
            verified: false
        }
        axios
            .post('http://localhost:9000/api/addRacks', rackinfo)
            .then(response => alert(response.data))
            .catch(err => console.log(err));

        // console.log(rack_user_loc)

        rackinfo.rack_id = null
        rackinfo.user_email = null
        rackinfo.lat = null
        rackinfo.long = null
        rackinfo.verified = false


        setModalShow(!modalShow);

    }

    const [rack_user_loc, setLoc] = useState({ lat: null, lng: null })
    const [max_id, setId] = useState(0)

    // to get the max id
    const callAPI = () => {
        fetch("http://localhost:9000/api/BikeRacks")
            .then(response => response.json())
            .then(data => setId([data.length][0]))
    }
    useEffect(() => {
        callAPI()
    }, [])

    return (
        <>
            <button
                className='btn-nav'
                onClick={handleShow}>Add Racks</button>
            <Router>
                <Modal
                    dialogClassName='modal'
                    show={modalShow}
                    onHide={handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h3>
                                Add Racks
                            </h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-control">
                            <Search
                                placeholder={"Location"}
                                setInput={({ lat, lng }) => setLoc({ lat, lng })}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={onUserRackSubmit}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Router>
        </>
    )
}

function Search({ placeholder, setInput }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete();

    const renderSuggestions = () => {
        const suggestions = data.map(({ place_id, description }) => (
            <ComboboxOption key={place_id} value={description} />
        ));
        return (
            <>
                {suggestions}
            </>
        );
    };

    return (
        <div>
            <Combobox onSelect={async (address) => {
                setValue(address, false);
                clearSuggestions();
                try {
                    const results = await getGeocode({ address });
                    const { lat, lng } = await getLatLng(results[0]);
                    console.log(placeholder, { lat, lng });
                    setInput({ lat, lng })
                } catch (error) {
                    console.log("error in Search onSelect")
                    console.log(error)
                }
                console.log(address);
            }}
            >
                <ComboboxInput
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => { setValue(e.target.value); setInput({ lat: 0, lng: 0 }) }}
                    disabled={!ready}
                />
                <ComboboxPopover portal={false}>
                    <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}
