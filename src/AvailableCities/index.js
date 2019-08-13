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
        <p className="ft s3" style={{ textAlign: 'center' }}>HipBar Gifting is available in the following cities</p>
        <ServicableCities />
        <p className="ft s3" style={{ textAlign: 'center' }}> We're expanding to more cities soon! </p>
      </div>
    )
  }
}

export default AvailableCities