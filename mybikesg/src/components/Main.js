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
import racks_user_json from "../data/users-bicycle-racks.json";
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

// array to hold rack locations (LTA)
var racks_lta_locs = []
for (const rack_details of racks_lta_json.features) {
    racks_lta_locs.push({ rack_details, "vis": true });
}

// array to hold rack locations (user supplied)
var racks_user_locs = []
for (const rack_details of racks_user_json) {
    racks_user_locs.push({ rack_details, "vis": true });
}

// array to hold repair shop locations
var repair_shop_locs = []
for (const repair_details of bike_repairs_json) {
    repair_shop_locs.push({ repair_details, "vis": true });
}

export function Main() {
    // misc stuff
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [selectedLTARack, setSelectedLTARack] = React.useState(null);
    const [selectedUserRack, setSelectedUserRack] = React.useState(null);
    const [selectedShop, setSelectedShop] = React.useState(null);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    // For nav bar toggle visibility
    const [visOverall, toggleOverall] = useState(true)
    const setOverall = () => {toggleOverall(!visOverall); plot_all()}
    const [visRacks, toggleRacks] = useState(true)
    const setRackVis = () => {toggleRacks(!visRacks)}
    const [visRepairs, toggleRepairs] = useState(true)
    const setRepairVis = () => toggleRepairs(!visRepairs)
    const [visRoute, toggleRoute] = useState(true)
    const setRouteVis = () => toggleRoute(!visRoute)

    // only remove ever market if all are shown, otherwise show all markers
    const plot_all = () => {
        if (visRacks && visRepairs && visRoute) {
            setRackVis()
            setRepairVis()
            setRouteVis()
        }
        // if any is set to false, we set to true and plot on map
        if (!visRacks) setRackVis()
        if (!visRepairs) setRepairVis()
        if (!visRoute) setRouteVis();
    }

    const plot_repair_shops = () => {
        for (const repairShop of repair_shop_locs) {
            if (visRepairs) {
                repairShop.vis = true
            } else repairShop.vis = false
        }
    }

    // start and dest locations, {lat, lng}
    const [start, setStart] = useState({ lat: 0, lng: 0 });
    const [dest, setDest] = useState({ lat: 0, lng: 0 });

    const plot_racks = () => {
        if (visRacks && start && (start.lat !== 0 && start.lng !== 0)) {
            const range = 0.5 // 500m
            var marker_lat, marker_lng, start_kx, start_dx, start_dy, dest_kx, dest_dx, dest_dy;
            // for lta racks
            for (const rack_lta_loc of racks_lta_locs) {
                // this chunk is the logic for showing only markers in radius of start and dest
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

            // for user added racks
            for (const rack_user_loc of racks_user_locs) {
                
                marker_lat = rack_user_loc.rack_details.Lat
                marker_lng = rack_user_loc.rack_details.Lng
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
                        rack_user_loc.vis = false;
                    } else rack_user_loc.vis = true;
                }
                // if only start is given
                else {
                    // if marker distance > range, make it disappear
                    if (Math.sqrt(start_dx * start_dx + start_dy * start_dy) > range) {
                        rack_user_loc.vis = false;
                    } else rack_user_loc.vis = true;
                }
            }
        }

        else {
            if (visRacks) {
                for (const rack_lta_loc of racks_lta_locs) rack_lta_loc.vis = true
                for (const rack_user_loc of racks_user_locs) rack_user_loc.vis = true
            } else {
                for (const rack_lta_loc of racks_lta_locs) rack_lta_loc.vis = false
                for (const rack_user_loc of racks_user_locs) rack_user_loc.vis = false
            }
            
        }
    }

    plot_repair_shops()
    plot_racks();

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

    // route planning
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(mapRef);
    const origin = { lat: 1.337078, lng: 103.7547249 };
    const destination = { lat: 1.269789, lng: 103.8149059 };

    directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            } else {
            console.error(`error fetching directions ${result}`);
            }
        }
    );

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

            {/* plot all the lta racks on the map */}
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
                        setSelectedLTARack(rack)
                        setSelectedUserRack(null)
                        setSelectedShop(null)
                    }}
                />
            ))}

            {/* plot all user racks on map */}
            {racks_user_locs.map(rack => (
                <Marker
                    key={racks_user_locs.indexOf(rack)}
                    position={{ lat: rack.rack_details.Lat, lng: rack.rack_details.Lng }}
                    icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
                        scaledSize: new window.google.maps.Size(30, 30),
                        anchor: new window.google.maps.Point(15, 0)
                    }}
                    visible={rack.vis}
                    onClick={() => {
                        setSelectedUserRack(rack)
                        setSelectedLTARack(null)
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
                        setSelectedLTARack(null)
                        setSelectedUserRack(null)
                    }}
                />
            ))}

            {/* Display info window for LTA racks when marker selected */}
            {selectedLTARack ? (<InfoWindow
                position={{ lat: selectedLTARack.rack_details.geometry.coordinates[1], lng: selectedLTARack.rack_details.geometry.coordinates[0] }}
                onCloseClick={() => { setSelectedLTARack(null); }}
            >
                <div
                    dangerouslySetInnerHTML={{ __html: selectedLTARack.rack_details.properties.Description }}
                >
                </div>
            </InfoWindow>) : null}

            {/* Display info for user racks when marker selected */}
            {selectedUserRack ? (
            <InfoWindow
                position={{ lat: selectedUserRack.rack_details.Lat, lng: selectedUserRack.rack_details.Lng }}
                onCloseClick={() => {setSelectedUserRack(null)}}
            >
                <div>
                    <b>User Added Rack</b>
                    <p>Verified: {selectedUserRack.rack_details.Verified? "yes" : "no"}</p>
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
        <Router>
            <Navbar 
                setOverall={setOverall} 
                setRepairVis={setRepairVis} 
                setRackVis={setRackVis}/>
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
        if (!start || (start.lat === 0 && start.lng === 0)) {
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
                    // console.log(",\n\"Lat\":" + lat + ",\n\"Lng\":" + lng);
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

function Navbar({ setOverall, setRepairVis, setRackVis }) {

    function Home(){
        alert("function not done")
    }

    return (
        <div className='nav-bar'>
            <button className='nav-pad'></button>
            <button 
            className='btn-nav'
            onClick={setOverall}>Home</button>
            <button className='btn-pad'></button>
            <button 
            className='btn-nav'
            onClick={Home}>Route</button>
            <button className='btn-pad'></button>
            <button 
            className='btn-nav'
            onClick={setRepairVis}>Repair Shops</button> 
            <button className='btn-pad'></button>
            <button 
            className='btn-nav'
            onClick={setRackVis}>Racks</button> 
            <button className='btn-pad'></button>
            <button 
            className='btn-nav'
            onClick={Home}>Add Racks</button>
            
        </div>
    )
}