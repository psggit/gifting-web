import React from "react"
import "./sass/city.scss"
import Button from "Components/button"
import Icon from "Components/icon"
import MobileNavBar from "Components/mobile-nav-bar"
import CityCheckBox from "Components/city-checkbox"

import { fetchCities } from "./../api"

class SelectCity extends React.Component {
  constructor(props) { 
    super(props)
    this.handleCityClick = this.handleCityClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      cities: [],
      activeCity: -1
    }
  }

  componentWillMount() {
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info"))
    if (!receiverInfo) {
      this.props.history.goBack()
    }
  }

  handleCityClick(activeCity) {
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info"))
    if (receiverInfo) {
      receiverInfo.gps = activeCity.gps
      receiverInfo.cityName = activeCity.name
      receiverInfo.cityId = activeCity.id
    }
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

  componentDidMount() {
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info"))
    if (receiverInfo) {
      this.setState({ activeCity: receiverInfo.cityId || -1, name: receiverInfo.name })
    }
    fetchCities().then(data => {
      this.setState({ cities: data })
    })
  }
 
  
  render() {
    return(
      <div id="send-gift-city">
        {/* <MobileNavBar stepNo = {2} stepName = {"Recipient's City"}  */}
          {/* handleNavigatePageClick = {this.props.handleNavigatePageClick} /> */}
        <div className="container">
          <div className="paper">
            <div className="paper-content">
              <div className="row city"> 
                <Icon name="locationOutlined" />
              </div>                           
              <div className="row">                            
                <p className="os s2">
                  Which city does {this.state.name} reside in?            
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
                      primary
                      icon="rightArrowWhite"
                      className="small"
                    >
                      Favourite drink
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