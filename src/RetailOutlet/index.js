import React from 'react'
import Header from 'Components/header'
import Footer from "Components/footer"
import './retailOutlet.scss'
import FirstGiftCard from "Components/first-gift-card"
import * as Api from './../api'
import {retailerData} from './../TransactionHistory/mockdata'

class RetailOutlet extends React.Component {
  constructor() {
    super()
    this.state = {
      availableDeliveryList: [],
      retailerOutletData: [],
      loading: false,
      isSelectedCity: false,
      selectedCity: '--Select a city--',
      deliveryMap: {}
    }
    this.findRetailer = this.findRetailer.bind(this)
    this.successCallback = this.successCallback.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.fetchAvailableHipbarDelivery()
  }

  fetchAvailableHipbarDelivery() {
    Api.fetchAvailableHipbarDelivery(this.successCallback)
  }

  successCallback(response) {
    console.log("retailer data", response)
    const deliveryMap = {}
    response.data.map((item) => {
      deliveryMap[item.id] = item
    })
    console.log("delivery map", deliveryMap)
    this.setState({availableDeliveryList: response.data, deliveryMap})
  }

  findRetailer(deliveryCityDetails) {
    const payload = {
      city_id: deliveryCityDetails.id
    }
    this.setState({retailerOutletData: retailerData.data})
    //Api.fetchRetailers(payload, this.successRetailerListCallback, this.failureRetailerListCallback)
  }

  successRetailerListCallback() {
    this.setState({loading: false})
  }

  failureRetailerListCallback() {
    this.setState({loading: false, retailerOutletData: []})
  }

  renderItem(item) {
    return <option value={item.id}>{item.name}</option>
  }

  handleChange(e) {
    const {deliveryMap} = this.state
    this.setState({isSelectedCity: true, selectedCity: deliveryMap[e.target.value].name})
    this.findRetailer(deliveryMap[e.target.value])
  }

  renderOutlet(item) {
    return (
      <div className="retailer">
        <div className="details">
          <p className="name os s5">{item.retailer_name}</p>
          <p className="os s7">{item.address}</p>
        </div>
        <p className="direction os s8">DIRECTIONS</p>
      </div>
    )
  }

  render() {
    const {availableDeliveryList, retailerOutletData, isSelectedCity} = this.state
    return (
      <div>
        <Header />
        <div id="retailOutlet">
          <div className="content">
            <h2 className="cm s1">Find a HipBar powered retailer near you</h2>
            <div className="retailer-list-container">
              <div className="options">
                <span class="custom-dropdown">
                  <select class="custom-dropdown-select" onChange={(e) => this.handleChange(e)} selected={this.state.selectedCity}>
                    <option className="os s8">-- Select a city --</option>
                    {
                      availableDeliveryList.map((item) => (
                        this.renderItem(item)
                      ))
                    }
                  </select>
                </span>
                <button className="btn btn-primary" size="small" onClick={() => this.findRetailer()}>FIND</button>
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