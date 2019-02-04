import React from "react"
import PropTypes from "prop-types"
import Icon from "Components/icon"
import { fetchCities, fetchGenres } from "./../api"
import "./sass/city-select.scss"

class CitySelect extends React.Component {
  constructor(props) { 
    super(props)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.getCityIndexByName = this.getCityIndexByName.bind(this)
    this.state = {
      cities: [],
      cityIdx: -1
    }
  }

  getCityIndexByName(name) {
    return this.state.cities.findIndex(city => city.name === name)
  }
  
  componentDidMount() {
    fetchCities()
      .then(cities => {
        this.setState({ cities })
        this.setState({ cityIdx: this.getCityIndexByName(this.props.activeCity)})
      })
  }

  handleCityChange(e) {
    const target = e.target
    const cityIdx = target.value
    const selectedCity = this.state.cities[cityIdx]

    this.setState({ cityIdx: parseInt(cityIdx) })
    this.props.onCityChange(selectedCity)
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