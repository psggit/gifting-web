import React from "react"
import PropTypes from "prop-types"
import Icon from "Components/icon"
import { fetchCities } from "./../api"
import "./sass/city-select.scss"
import { capitalize } from "Utils/logic-utils"
import Moment from "moment"

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

  getCityIndexByName(cities, name) {
    return cities.findIndex(city => city.name === name)
  }

  getSortedCities(cities) {
    return cities.sort((a, b) => {
      if(a.name > b.name) { return -1 }
      if(a.name < b.name) { return 1 }
      return 0
    })
  }
  
  componentDidMount() {
    fetchCities()
      .then(cities => {
        this.setState({ cities: this.getSortedCities(cities) })
        const activeCity = capitalize(this.props.activeCity)

        const cityIdx = this.getCityIndexByName(cities, activeCity)
        const city = {
          gps: cities[cityIdx].gps,
          name: cities[cityIdx].name
        }
        const receiverInfo = JSON.parse(localStorage.getItem("receiver_info")) || {}
        receiverInfo.gps = city.gps
        localStorage.setItem("receiver_info", JSON.stringify(receiverInfo))
        this.setState({ cityIdx })
      })
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps.activeCity, this.props.activeCity)
    if (prevProps.activeCity !== this.props.activeCity) {
      const activeCity = capitalize(this.props.activeCity)
      this.setState({ cityIdx: this.getCityIndexByName(this.state.cities, activeCity) })
    }
  }

  handleCityChange(e) {
    const target = e.target
    const cityIdx = target.value
    const selectedCity = this.state.cities[cityIdx]
    if(window.gtag) {
      gtag("event", "change_city", {
        "event_label": JSON.stringify({
          selectedCity: this.state.cities[cityIdx].name,
          date: Moment(new Date()).format("DD/MM/YYYY")
        })
      })
    }
    this.setState({ cityIdx: parseInt(cityIdx) })
    this.props.onCityChange(selectedCity)
    this.props.clearBasket()
  }
  
  render() {
    return (
      <div className="city--select">
        <Icon name="locationCitySelect" />
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