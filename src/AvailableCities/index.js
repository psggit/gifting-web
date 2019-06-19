import React from "react"
import { fetchCities } from "./../api"
import ServicableCities from "Components/ServicableCities"
import "./available-cities.scss"

class AvailableCities extends React.Component {
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
      <div id="AvailableCities">
        <ServicableCities />
      </div>
    )
  }
}

export default AvailableCities