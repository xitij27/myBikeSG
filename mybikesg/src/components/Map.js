import React from 'react'
import { Wrapper } from "@googlemaps/react-wrapper"
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api"
import MapStyle from './MapStyle'

const libraries = ["places"]
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

export default function Map() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    })
    if (loadError) return "Error loading map"
    if (!isLoaded) return "Loading Map"

    return <div>
        <GoogleMap
        mapContainerStyle = {mapContainerStyle}
        zoom={12.8}
        center={center}
        options={options}
        ></GoogleMap>
    </div>
}