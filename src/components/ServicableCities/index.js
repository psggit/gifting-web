import React from "react"
import { fetchCities } from "./../../../src/api"
import Icon from "./../icon"
import "./servicable-cities.scss"

class ServicableCities extends React.Component {
  constructor() {
    super()
    this.state = {
      cities: []
    }
  }

  componentDidMount() {
    fetchCities()
      .then(cities => {
        this.setState({ cities })
      })
  }

  render() {
    return (
      <div id="ServicableCities">
        <div className="located-cities">
          <span>
            <Icon name="location" />
          </span>
          <div style={{
            width: '100%',
            borderBottom: '1px solid #aeaeae',
            lineHeight: '10px',
            margin: '10px 0 50px'
          }}
          >
            <span
              className="title ft s8"
              style={{
                background: '#000',
                padding: '0 30px',
                color: '#bcbec0',
                letterSpacing: "2px",
                fontWeight: "500"
              }}
            >
              CITIES
          </span>
          </div>
          <div className="city-wrapper">
            {
              this.state.cities.map((city, i) => (
                <div key={i} className="city">
                  <span className="ft s7">{city.name}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ServicableCities