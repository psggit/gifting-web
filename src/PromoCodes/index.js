import React from "react"
import PromoCodeItem from "./PromoCodeItem"
import Input from "Components/input"
import "./sass/promo-code.scss"
import { fetchCoupons } from "./../api"

class PromoCodes extends React.Component {
  constructor() {
    super()
    this.handleApplyPromo = this.handleApplyPromo.bind(this)
    this.handlePromoChange = this.handlePromoChange.bind(this)
    this.state = {
      promoCode: null,
      coupons: null,
      error: null
    }
  }

  componentDidMount() {
    fetchCoupons({
      gps: JSON.parse(localStorage.getItem("receiver_info")).gps
    })
      .then(coupons => {
        this.setState({ coupons })
      })
  }

  handlePromoChange(val) {
    console.log(val)
    this.setState({ promoCode: val.toUpperCase() })
  }

  handleApplyPromo() {
    const { promoCode } = this.state
    if (promoCode && promoCode.length) {
      this.props.data.onApply(promoCode, (err) => {
        err.response.json().then(json => {
          this.setState({ error: json.message })
        })
      })
    }
  }
  
  render() {
    return (
      <div id="promo--codes">
        <div className="promo--code__form">
          <div className="form-group">
            <Input maxLength="20" value={this.state.promoCode} onChange={this.handlePromoChange} placeholder="Enter Coupon Code" />
            <span onClick={this.handleApplyPromo} className="os s8">APPLY</span>
          </div>
          <p style={{ color: "#ff3b34", marginTop: "5px" }} className="os s8">{this.state.error}</p>
        </div>
        <div className="promo--code__body">
          {
            this.state.coupons && this.state.coupons.length
              ? this.state.coupons.map(item => (
                <PromoCodeItem promo={item} onApply={this.props.data.onApply} key={item.id} />
              ))
              : ""   
          }
          {
            this.state.coupons && !this.state.coupons.length &&
            <p className="os s6">No Coupons available</p>
          }
          {
            !this.state.coupons && 
            <p className="os s6">Loading coupons...</p>
          }
        </div>
      </div>
    )
  }
}

export default PromoCodes