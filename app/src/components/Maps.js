import React from 'react';
// import { GoogleMap, Marker } from "react-google-maps"

const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

//get end user's current location
export function getUsersCurrentLocation() {
    if (navigator.geolocation) { //check if geolocation is available

        navigator.geolocation.getCurrentPosition(function (position) {
            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;
            const geo = { userLatitude, userLongitude };
            const personLocation = JSON.stringify(geo);
            localStorage.setItem('coordinates', JSON.stringify(personLocation));
            localStorage.setItem('userLatitude', userLatitude);
            localStorage.setItem('userLongitude', userLongitude);
        });
    }

}
export const userlat = localStorage.getItem('userLatitude');
export const userlong = localStorage.getItem('userLongitude');


const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCmJcHTEJg-k78nyc2GqH050YS2jtSlI8U&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers()
            console.log(`Current clicked markers length: ${clickedMarkers.length}`)
            console.log(clickedMarkers)
        },
    }),

    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    // defaultCenter={{ lat: userlat, lng: userlong }}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.markers.map(marker => (
                <Marker
                    key={marker.photo_id}
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                />
            ))}
        </MarkerClusterer>
    </GoogleMap >
);

class DemoApp extends React.PureComponent {
    componentWillMount() {
        this.setState({ markers: [] })
    }

    componentDidMount() {
        const url = [
            // Length issue
            `https://gist.githubusercontent.com`,
            `/farrrr/dfda7dd7fccfec5474d3`,
            `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
        ].join("")

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({ markers: data.photos });
            });




    }

    render() {
        return (
            <MapWithAMarkerClusterer markers={this.state.markers} />
        )
    }
}

export default DemoApp;