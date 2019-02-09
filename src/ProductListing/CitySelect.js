import React from "react"
import PropTypes from "prop-types"
import Icon from "Components/icon"
import { fetchCities } from "./../api"
import "./sass/city-select.scss"
import { capitalize } from "Utils/logic-utils"

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
        const activeCity = capitalize(this.props.activeCity)
        const cityIdx = this.getCityIndexByName(activeCity)
        localStorage.setItem("gps", cities[cityIdx].gps)
        this.setState({ cityIdx })
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeCity !== this.props.activeCity) {
      const activeCity = capitalize(this.props.activeCity)
      this.setState({ cityIdx: this.getCityIndexByName(activeCity) })
    }
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