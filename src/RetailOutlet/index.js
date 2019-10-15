import React from 'react'
import Footer from "Components/footer"
import './retailOutlet.scss'
import Icon from "Components/icon"
import FirstGiftCard from "Components/gift-card-ad"
import * as Api from './../api'
import Button from "Components/button"

class RetailOutlet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      availableDeliveryList: [],
      retailerOutletData: [],
      loading: false,
      isSelectedCity: false,
      selectedCity: null,
      deliveryMap: {},
      selectedCityId: "",
      // username: props.username ? props.username : "",
      // isLoggedIn: props.isLoggedIn ? props.isLoggedIn : false
    }
    this.findRetailer = this.findRetailer.bind(this)
    this.successCallback = this.successCallback.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.fetchAvailableHipbarDelivery = this.fetchAvailableHipbarDelivery.bind(this)
    this.successRetailerListCallback = this.successRetailerListCallback.bind(this)
    this.failureRetailerListCallback = this.failureRetailerListCallback.bind(this)
  }

  componentDidMount() {
    if(location.search.length) {
      this.setState({
        selectedCityId: location.search.split("=")[1]
      }, () => this.fetchAvailableHipbarDelivery())
    } else {
      this.fetchAvailableHipbarDelivery()
    }
  }

  fetchAvailableHipbarDelivery() {
    Api.fetchAvailableHipbarDelivery(this.successCallback)
    if (this.state.selectedCityId) {
      this.findRetailer(this.state.selectedCityId)
    }
  }

  successCallback(response) {
    const deliveryMap = {}
    response.map((item) => {
      deliveryMap[item.id] = item
    })
    this.setState({ availableDeliveryList: response, deliveryMap })
  }

  findRetailer(cityId) {
    console.log("city details", cityId)
    const payload = {
      city_id: parseInt(cityId),
      limit: 1000,
      offset: 0
    }
    //this.setState({retailerOutletData: retailerData.data})
    Api.fetchRetailers(payload, this.successRetailerListCallback, this.failureRetailerListCallback)
  }

  successRetailerListCallback(response) {
    this.setState({ loading: false, isSelectedCity: true, retailerOutletData: response.data })
  }

  failureRetailerListCallback() {
    this.setState({ loading: false, retailerOutletData: [], isSelectedCity: true })
  }

  renderItem(item) {
    return <option key={item.id} value={item.id}>{item.name}</option>
  }

  handleChange(e) {
    //console.log("value", e.target.value)
    const { deliveryMap } = this.state
    if (e.target.value === "select city") {
      this.setState({ selectedCityId: "" })
      return
    }
    this.setState({ selectedCityId: e.target.value, selectedCity: deliveryMap[e.target.value].name })
  }

  handleClick() {
    const { selectedCityId } = this.state
    if (selectedCityId && selectedCityId !== "select city") {
      this.findRetailer(selectedCityId)
      this.props.history.push(`/retail-outlet?cityId=${this.state.selectedCityId}`)
      return
    }
    if (window.gtag) {
      gtag("event", "city_wise_retailer_search_count", {
        "event_label": selectedCity,
      })
    }
    this.setState({ retailerOutletData: [] })
  }

  triggerEvent(item) {
    if (window.gtag) {
      gtag("event", "view_retailer_directions", {
        "event_label": JSON.stringify({
          retailerId: item.retailer_id,
          retailerName: item.retailer_name,
          user_city: JSON.parse(localStorage.getItem("receiver_info")).cityName
        })
      })
    }
  }

  renderOutlet(item) {
    const gpsCoordinates = item.retailer_gps.split(",")
    return (
      <div className="retailer">
        <div className="details">
          <p className="name os s5">{item.retailer_name}</p>
          <p className="os s7">{item.retailer_address}</p>
        </div>
        {/* <p className="direction os s8" onClick={() => this.loadMap(item.retailer_gps)}>DIRECTIONS</p> */}
        <a className="direction os s8" onClick={() => this.triggerEvent(item)} href={` https://www.google.com/maps/search/?api=1&query=${gpsCoordinates[0]},${gpsCoordinates[1]}`} target="_blank">
          <span className="os s6" style={{ marginRight: '13px' }}>DIRECTIONS</span>
          <span style={{ position: 'relative', top: '3px' }}><Icon name="rightArrowWhite" /></span>
        </a>
      </div>
    )
  }

  render() {
    const { availableDeliveryList, retailerOutletData, isSelectedCity, selectedCity } = this.state
    //console.log("outlet data", this.state.retailerOutletData)
    return (
      <div>
        <div id="retailOutlet">
          <div className="content">
            <h2 className="cm s1">Find a HipBar powered retailer near you</h2>
            <div className="retailer-list-container">
              <div className="options">
                <div className="city--select">
                  <select onChange={(e) => this.handleChange(e)} value={this.state.selectedCityId}>
                    {
                      !this.state.selectedCity &&
                      <option className="os s8" value="select city">-- Select a city --</option>
                    }
                    {
                      availableDeliveryList.map((item) => (
                        this.renderItem(item)
                      ))
                    }
                  </select>
                  <Icon name="caret" />
                </div>
                <Button primary onClick={() => this.handleClick()}>FIND RETAILERS</Button>
              </div>
              <div className="retailer-list">
                {
                  retailerOutletData.length > 0 &&
                  <div className="header">
                    <h2 className="os s7">OUTLETS - {retailerOutletData.length} AVAILABLE</h2>
                  </div>
                }
                {
                  retailerOutletData.length > 0 && retailerOutletData.map((item) => (
                    this.renderOutlet(item)
                  ))
                }
                {
                  isSelectedCity && retailerOutletData.length === 0 &&
                  <p className="note os s4">No retailers found</p>
                }
                {
                  !isSelectedCity &&
                  <p className="note os s4">Select a city to find retailers there </p>
                }
              </div>

            </div>
          </div>
          <FirstGiftCard pageTitle="retailOutlet" />
          {/* <Footer /> */}
        </div>
      </div>
    )
  }
}

export default RetailOutlet