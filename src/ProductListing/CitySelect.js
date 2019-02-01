import React from "react"
import PropTypes from "prop-types"
import Icon from "Components/icon"
import { fetchCities, fetchGenres } from "./../api"
import "./sass/city-select.scss"

class CitySelect extends React.Component {
  constructor() { 
    super()
    this.handleCityChange = this.handleCityChange.bind(this)
    this.state = {
      cities: [],
      cityIdx: 0
    }
  }

  componentDidMount() {
    fetchCities((data) => {
      this.setState({ cities: data })
    })
  }

  handleCityChange(e) {
    const target = e.target
    const cityIdx = target.value
    const gps = this.state.cities[cityIdx].gps

    fetchGenres(gps, (data) => {
      this.setState({ genres: data })
    })
    this.setState({ cityIdx: parseInt(cityIdx) })
    this.props.onCityChange()
  }
  
  render() {
    return (
      <div className="city--select">
        <Icon name="location" />
        <select onChange={this.handleCityChange} value={this.state.cityIdx}>
          {
            this.state.cities.map((item, i) => {
              return (
                <option
                  key={item.id}
                  value={i}>
                  { item.name }
                </option>
              )
            })
          }
        </select>
        <Icon name="caret" />
      </div>
    )
  }
}

export default CitySelect

CitySelect.propTypes = {
  onCityChange: PropTypes.func
}