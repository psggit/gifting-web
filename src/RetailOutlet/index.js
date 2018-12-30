import React from 'react'
import Header from 'Components/header'
import Footer from "Components/footer"
import './retailOutlet.scss'
import FirstGiftCard from "Components/first-gift-card"
import * as Api from './../api'
//import {retailerData} from './../TransactionHistory/mockdata'

class RetailOutlet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      availableDeliveryList: [],
      retailerOutletData: [],
      loading: false,
      isSelectedCity: false,
      selectedCity: "",
      deliveryMap: {},
      selectedCityId: "",
      username: props.username ? props.username : "",
      isLoggedIn: props.isLoggedIn ? props.isLoggedIn : false
    }
    this.findRetailer = this.findRetailer.bind(this)
    this.successCallback = this.successCallback.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.successRetailerListCallback = this.successRetailerListCallback.bind(this)
    this.failureRetailerListCallback = this.failureRetailerListCallback.bind(this)
  }

  componentDidMount() {
    this.fetchAvailableHipbarDelivery()
  }

  componentWillReceiveProps(newProps) {
    //console.log("helo", newProps)
    if(this.props.username !== newProps.username || this.props.isLoggedIn !== newProps.isLoggedIn) {
      this.setState({username: newProps.username, isLoggedIn: newProps.isLoggedIn})
    }
  }

  fetchAvailableHipbarDelivery() {
    Api.fetchAvailableHipbarDelivery(this.successCallback)
  }

  successCallback(response) {
    //console.log("retailer data", response)
    const deliveryMap = {}
    response.data.map((item) => {
      deliveryMap[item.id] = item
    })
    //console.log("delivery map", deliveryMap)
    this.setState({availableDeliveryList: response.data, deliveryMap})
  }

  findRetailer(cityId) {
    //console.log("city details", cityId)
    const payload = {
      city_id: parseInt(cityId),
      limit: 10,
      offset: 0
    }
    //this.setState({retailerOutletData: retailerData.data})
    Api.fetchRetailers(payload, this.successRetailerListCallback, this.failureRetailerListCallback)
  }

  successRetailerListCallback(response) {
    this.setState({loading: false,  isSelectedCity: true, retailerOutletData: response.data})
  }

  failureRetailerListCallback() {
    this.setState({loading: false, retailerOutletData: [], isSelectedCity: true})
  }

  renderItem(item) {
    //console.log("id", item.id)
    return <option value={item.id}>{item.name}</option>
  }

  handleChange(e) {
    //console.log("value", e.target.value)
    const {deliveryMap} = this.state
    if(e.target.value === "select city") {
      this.setState({selectedCityId: ""})
      return
    }
    this.setState({selectedCityId: e.target.value, selectedCity: deliveryMap[e.target.value].name})
  }

  handleClick() {
    const {selectedCityId} = this.state
    if(selectedCityId && selectedCityId !== "select city") {
      this.findRetailer(selectedCityId)
      return
    } 
    this.setState({retailerOutletData: []})
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
        <a className="direction os s8" href={`/locationMap?lat=${gpsCoordinates[0]}&lng=${gpsCoordinates[1]}`} target="_blank">DIRECTIONS</a>
      </div>
    )
  }

  render() {
    const {availableDeliveryList, retailerOutletData, isSelectedCity, selectedCity} = this.state
    //console.log("outlet data", this.state.retailerOutletData)
    return (
      <div>
        <Header username={this.state.username} isLoggedIn={this.state.isLoggedIn}/>
        <div id="retailOutlet">
          <div className="content">
            <h2 className="cm s1">Find a HipBar powered retailer near you</h2>
            <div className="retailer-list-container">
              <div className="options">
                <span class="custom-dropdown">
                  <select class="custom-dropdown-select" onChange={(e) => this.handleChange(e)} selected={this.state.selectedCity}>
                    <option className="os s8" value="select city">-- Select a city --</option>
                    {
                      availableDeliveryList.map((item) => (
                        this.renderItem(item)
                      ))
                    }
                  </select>
                </span>
                <button className={`btn btn-primary ${selectedCity.length === 0 ? 'disabled' : ''} `} size="small" onClick={() => this.handleClick()}>FIND</button>
              </div>
              <div className="retailer-list">
                {
                  retailerOutletData.length > 0 &&
                  <div className="header">
                    <h2 className="os s4">OUTLETS - {retailerOutletData.length} AVAILABLE</h2>
                  </div>
                }
                {
                  retailerOutletData.length > 0 && retailerOutletData.map((item) => (
                    this.renderOutlet(item)
                  ))
                }
                {
                  isSelectedCity && retailerOutletData.length === 0 &&
                  <p className="note os s8">No retailers found</p>
                }
                {
                  !isSelectedCity &&
                  <p className="note os s8">Select a city to find retailers there </p>
                }
              </div>
          
            </div>
          </div>
          <FirstGiftCard />
        </div>
        <Footer />
      </div>
    )
  }
}

export default RetailOutlet