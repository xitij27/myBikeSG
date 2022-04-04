import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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

export function Addrack({ modalShow, setModalShow }) {
    const handleClose = () => {
        setModalShow(!modalShow);
    }
    const handleShow = () => {
        setModalShow(!modalShow);
    }
    const onUserRackSubmit = () => {

        //////////////////////////////////////////////
        //// NEED TO SEND RACK TO BACKEND HERE!!!! ///
        //////////////////////////////////////////////

        console.log(rack_user_loc)
        alert("Your request has been submitted!")
        setModalShow(!modalShow);
    }

    const [rack_user_loc, setLoc] = useState({lat: null, lng: null})

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
