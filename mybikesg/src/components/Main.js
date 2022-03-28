import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
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
import * as FaIcons from "react-icons/fa";
import * as GrIcons from "react-icons/gr";
import MapStyle from './MapStyle'
import "./Drawer.css";
import racks_lta_json from "../data/lta-bicycle-rack-geojson.json";
import bike_repairs_json from "../data/bike_repair.json";

const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
}
const center = {
    lat: 1.352083,
    lng: 103.819839
}
const options = {
    styles: MapStyle,
    disableDefaultUI: true,
    zoomControl: true
}

const libraries = ["places"];


export function Main({ }) {
    // misc stuff
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [selectedRack, setSelectedRack] = React.useState(null);
    const [selectedShop, setSelectedShop] = React.useState(null);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);


    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    // array to hold rack locations (LTA)
    var racks_lta_locs = []
    for (const rack_details of racks_lta_json.features) {
        racks_lta_locs.push({ rack_details, "vis": true });
    }


    // array to hold rack locations (user supplied)
    var racks_user_locs = []


    // array to hold repair shop locations
    var repair_shop_locs = []
    for (const repair_details of bike_repairs_json) {
        repair_shop_locs.push({ repair_details, "vis": true });
    }

    // start and dest locations, {lat, lng}
    const [start, setStart] = useState({ lat: 0, lng: 0 });
    const [dest, setDest] = useState({ lat: 0, lng: 0 });

    // this chunk is the logic for showing only markers in radius of start and dest
    const range = 0.5 // 500m
    var marker_lat, marker_lng, start_kx, start_dx, start_dy, dest_kx, dest_dx, dest_dy;
    if (start && (start.lat !== 0 && start.lng !== 0)) {
        // logic for lta racks, need to do one more for user added
        for (const rack_lta_loc of racks_lta_locs) {
            marker_lat = rack_lta_loc.rack_details.geometry.coordinates[1]
            marker_lng = rack_lta_loc.rack_details.geometry.coordinates[0]
            start_kx = Math.cos(Math.PI * start.lat / 180) * 111;
            start_dx = Math.abs(start.lng - marker_lng) * start_kx;
            start_dy = Math.abs(start.lat - marker_lat) * 111;

            // if dest is given
            if (dest && (dest.lat !== 0 && dest.lng !== 0)) {
                dest_kx = Math.cos(Math.PI * dest.lat / 180) * 111;
                dest_dx = Math.abs(dest.lng - marker_lng) * dest_kx;
                dest_dy = Math.abs(dest.lat - marker_lat) * 111;
                // if marker distance > range, make it disappear
                if ((Math.sqrt(start_dx * start_dx + start_dy * start_dy) > range) && (Math.sqrt(dest_dx * dest_dx + dest_dy * dest_dy) > range)) {
                    rack_lta_loc.vis = false;
                } else rack_lta_loc.vis = true;
            }
            // if only start is given
            else {
                // if marker distance > range, make it disappear
                if (Math.sqrt(start_dx * start_dx + start_dy * start_dy) > range) {
                    rack_lta_loc.vis = false;
                } else rack_lta_loc.vis = true;
            }
        }
    }


    // helper functions for misc stuff
    const send_loc = (locs) => {
        console.log(locs)
        setDest(locs.dest);

    }

    const markStart = React.useCallback(({ lat, lng }) => {
        console.log("marking start")
        setStart({ lat, lng });
    }, []);

    const markDest = React.useCallback(({ lat, lng }) => {
        console.log("marking dest")
        setDest({ lat, lng });
    }, []);

    if (loadError) return "Error loading map"
    if (!isLoaded) return "Loading Map"



    return <div>
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12.8}
            center={center}
            options={options}
            onLoad={onMapLoad}
        >
            {/* marks both starting and dest */}
            if (start && (start.lat != 0 && start.lng != 0)) {
                <Marker position={{ lat: start.lat, lng: start.lng }} />
            }
            if (dest && (dest.lat != 0 && dest.lng != 0)) {
                <Marker position={{ lat: dest.lat, lng: dest.lng }} />
            }

            {/* plot all the racks on the map */}
            {racks_lta_locs.map(rack => (
                <Marker
                    key={rack.rack_details.properties.Name}
                    position={{ lat: rack.rack_details.geometry.coordinates[1], lng: rack.rack_details.geometry.coordinates[0] }}
                    icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                        scaledSize: new window.google.maps.Size(30, 30),
                        anchor: new window.google.maps.Point(15, 0)
                    }}
                    visible={rack.vis}
                    onClick={() => {
                        setSelectedRack(rack)
                        setSelectedShop(null)
                    }}
                />
            ))}

            {/* plot all the repair shops on the map */}
            {repair_shop_locs.map(shop => (
                <Marker
                    key={shop.repair_details.Name}
                    position={{ lat: shop.repair_details.Lat, lng: shop.repair_details.Lng }}
                    icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/pink-dot.png",
                        scaledSize: new window.google.maps.Size(30, 30),
                        anchor: new window.google.maps.Point(15, 0)
                    }}
                    visible={shop.vis}
                    onClick={() => {
                        setSelectedShop(shop)
                        setSelectedRack(null)
                    }}
                />
            ))}

            {/* Display info window for racks when marker selected */}
            {selectedRack ? (<InfoWindow
                position={{ lat: selectedRack.rack_details.geometry.coordinates[1], lng: selectedRack.rack_details.geometry.coordinates[0] }}
                onCloseClick={() => { setSelectedRack(null); }}
            >
                <div
                    dangerouslySetInnerHTML={{ __html: selectedRack.rack_details.properties.Description }}
                >
                </div>
            </InfoWindow>) : null}

            {/* Display info window for repair shops when marker selected */}
            {selectedShop ? (<InfoWindow
                position={{ lat: selectedShop.repair_details.Lat, lng: selectedShop.repair_details.Lng }}
                onCloseClick={() => { setSelectedShop(null); }}
            >
                <div>
                    <b>{selectedShop.repair_details.Name}</b>
                    <p>{selectedShop.repair_details.Address.substring(0, selectedShop.repair_details.Address.indexOf('Tel'))}</p>
                    <p>{selectedShop.repair_details.Telephone}</p>
                </div>
            </InfoWindow>) : null}


        </GoogleMap>
        <Router>
            <Drawer onSend={send_loc} panTo={panTo} markStart={markStart} markDest={markDest} />
        </Router>



    </div>
}

const Drawer = ({ onSend, panTo, markStart, markDest }) => {
    const [burger, setDrawer] = useState(false)
    const showDrawer = () => setDrawer(!burger)

    const [start, setStart] = useState({ lat: 0, lng: 0 })
    const [dest, setDest] = useState({ lat: 0, lng: 0 })
    const [rack, setRack] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if (!start) {
            alert("Please enter starting location")
            return
        }
        onSend({ start, dest, rack })
        // getLoc({start, dest, rack})
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
                                <Search
                                    placeholder="Starting Location"
                                    setInput={({ lat, lng }) => setStart({ lat, lng })}
                                    panTo={panTo}
                                    markMap={markStart}
                                />
                            </div>
                            <div className="form-control">
                                <label className="form-control-header">Ending Location</label>
                                <Search
                                    placeholder="Ending Location"
                                    setInput={({ lat, lng }) => setDest({ lat, lng })}
                                    panTo={panTo}
                                    markMap={markDest}
                                />
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

function Search({ placeholder, setInput, panTo, markMap }) {
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
                    console.log(",\n\"Lat\":" + lat + ",\n\"Lng\":" + lng);
                    setInput({ lat, lng })
                    markMap({ lat, lng })
                    panTo({ lat, lng })
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
                <ComboboxPopover>
                    <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}
