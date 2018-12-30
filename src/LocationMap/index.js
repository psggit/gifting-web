import React from 'react'
import "./location.scss"
import { getQueryObj } from 'Utils/url-utils'

class LocationMap extends React.Component {

  constructor(props) {
    super(props)
    //console.log("props", props)
    this.state = {
      lat: "",
      lng: ""
    }
  }

  getGoogleMaps() {
    // If we haven't already defined the promise, define it
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise((resolve) => {
        // Add a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          // Resolve the promise
          resolve(google);

          // Tidy up
          delete window.resolveGoogleMapsPromise;
        };

        // Load the Google Maps API
        const script = document.createElement("script");
        const API = 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
      });
    }

    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

  componentWillMount() {
    // Start Google Maps API loading since we know we'll soon need it
    this.getGoogleMaps();
  }

  componentDidMount() {
    // Once the Google Maps API has finished loading, initialize the map
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({[item[0]]: parseInt(item[1]) },
        () => {console.log("state", this.state)})
        //this.filter[item[0]] = item[1]
    })

    this.getGoogleMaps().then((google) => {
      const uluru = {lat: this.state.lat, lng: this.state.lng};
      const map = new google.maps.Map(document.getElementById('map'), {
        // zoom: 4,
        // center: uluru
        zoom: 13,
        center: uluru,
      });
      const marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    });
  }

  render() {
    return (
      <div className="container">
        <div id="map_container"></div>
        <div id="map"></div>
      </div>
    )
  }
}
 export default LocationMap