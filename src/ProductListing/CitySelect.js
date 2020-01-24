import React from "react"
import PropTypes from "prop-types"
import Icon from "Components/icon"
import { fetchCities } from "./../api"
import "./sass/city-select.scss"
import { capitalize } from "Utils/logic-utils"
import Moment from "moment"
import { PLATFORM } from "Utils/constants"

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

  getCityIndexByName(cities, activeCity) {
    return cities.findIndex(city => city.id === activeCity)
  }

  getSortedCities(cities) {
    return cities.sort((a, b) => {
      if (a.name > b.name) { return -1 }
      if (a.name < b.name) { return 1 }
      return 0
    })
  }

  componentDidMount() {
    fetchCities()
      .then(cities => {
        // this.setState({ cities: this.getSortedCities(cities) })
        this.setState({ cities })
        const cityIdx = this.getCityIndexByName(cities, this.props.activeCity)
        const city = {
          gps: cities[cityIdx].gps,
          state_id: cities[cityIdx].state_id,
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
      this.setState({ cityIdx: this.getCityIndexByName(this.state.cities, this.props.activeCity) })
    }
  }

  handleCityChange(e) {
    const target = e.target
    const cityIdx = target.value
    const selectedCity = this.state.cities[cityIdx]
    // if (window.gtag) {
    //   gtag("event", "change_city", {
    //     "event_label": JSON.stringify({
    //       selectedCity: this.state.cities[cityIdx].name,
    //       date: Moment(new Date()).format("DD/MM/YYYY")
    //     })
    //   })
    // }
    window.dataLayer.push({
      "event": "change_city", 
      "city_id": this.state.cities[cityIdx].id,
      "platform": PLATFORM
    })
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
                  {item.name}
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