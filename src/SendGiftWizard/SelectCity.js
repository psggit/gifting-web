import React from "react"
import "./sass/city.scss"
import Button from "Components/button"
import Icon from "Components/icon"
import MobileNavBar from "Components/mobile-nav-bar"
import CityCheckBox from "Components/city-checkbox"
import Moment from "moment"
import { PLATFORM } from "Utils/constants"
import { fetchCities } from "./../api"

class SelectCity extends React.Component {
  constructor(props) { 
    super(props)
    this.handleCityClick = this.handleCityClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleEnterPress = this.handleEnterPress.bind(this)
    this.state = {
      cities: [],
      activeCity: -1
    }
  }

  getCityIdByName(cities, name) {
    return cities.find(city => city.name === name).id
  }

  // componentWillMount() {
  //   const receiverInfo = JSON.parse(localStorage.getItem("receiver_info"))
  //   if (!receiverInfo) {
  //     this.props.history.goBack()
  //   }
  // }

  handleCityClick(activeCity) {
    if (window.gtag) {
      gtag("event", "choose_city", {
        "event_label": JSON.stringify({
          cityName: activeCity.name,
          date: Moment(new Date()).format("DD/MM/YYYY")
        })
      })
    }
    window.dataLayer.push({ 
      "event": "select_city", 
      "city_id": activeCity.id, 
      "platform": PLATFORM,
      "hasura_id": localStorage.getItem("hasura_id")
    }) 
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info")) || {}
    
    receiverInfo.gps = activeCity.gps
    receiverInfo.cityName = activeCity.name
    receiverInfo.state_id = activeCity.state_id
    receiverInfo.genre_id = -1
    receiverInfo.city_id = activeCity.id

    localStorage.setItem("receiver_info", JSON.stringify(receiverInfo))
    this.setState({ activeCity: activeCity.id })
  }

  handleClick(e) {
    e.preventDefault()
    if (this.state.activeCity === -1) {
      return false
    } else {
      const path = "/" + e.currentTarget.href.split("/").slice(3).join("/")
      this.props.history.push(path)
    }
  }

  getSortedCities(cities) {
    return cities.sort((a, b) => {
      if(a.name < b.name) { return -1 }
      if(a.name > b.name) { return 1 }
      return 0
    })
  }

  handleEnterPress(e) {
    if (e.keyCode === 13 && this.state.activeCity > 0) {
      this.props.history.push("/send-gift/select-drink")
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEnterPress)
  }

  componentDidMount() {
    const transactionCompleted = localStorage.getItem("transaction--completed")
    if (transactionCompleted) {
      localStorage.removeItem("receiver_info")
      localStorage.removeItem("amount")
      localStorage.removeItem("basket")
      localStorage.removeItem("promo_code")
    }
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info")) || {}
    if (receiverInfo.name) {
      this.setState({ name: receiverInfo.name })
    }
    fetchCities().then(cities => {
      if (receiverInfo.cityName) {
        this.setState({ activeCity: receiverInfo.city_id })
      }
      this.setState({ cities: this.getSortedCities(cities) })
    })

    document.addEventListener("keydown", this.handleEnterPress)
  }
 
  
  render() {
    return(
      <div id="send-gift-city">
        <div className="container">
          <div className="paper">
            <div className="paper-content">
              <div className="row city"> 
                <Icon name="locationOutlined" />
              </div>                           
              <div className="row">                            
                <p className="os s2">
                  Where does the recipient live?           
                </p>
                <p className="os s5">
                  This will let us show you the list of drinks available in that city.              
                </p>

                {
                  this.state.cities.length
                    ? (
                      <div className="flex-grid">
                        {
                          this.state.cities.map((item, i) => (
                            <div className="col" key={i}>
                              <CityCheckBox
                                active={this.state.activeCity}
                                handleClick={this.handleCityClick}
                                id={item.id}
                                state_id={item.state_id}
                                gps={item.gps}
                                name={item.name}
                              />
                            </div>
                          ))
                        }
                      </div>
                    )
                    : <p style={{ marginTop: "20px" }} className="os s5">Loading Cities...</p>
                }
                <div style={{ marginTop: "40px" }}>
                  <a onClick={this.handleClick} href={"/send-gift/select-drink"}>
                    <Button 
                      disabled={this.state.activeCity === -1}
                      primary
                      icon="rightArrowWhite"
                      className="small"
                    >
                      Choose Drink(s)
                    </Button>
                  </a>
                </div>

              </div>           
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SelectCity