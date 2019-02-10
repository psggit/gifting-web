import React from "react"
import PromoCodeItem from "./PromoCodeItem"
import "./sass/promo-code.scss"
import { fetchCoupons } from "./../api"

class PromoCodes extends React.Component {
  constructor() {
    super()
    this.handleApplyPromo = this.handleApplyPromo.bind(this)
    this.handlePromoChange = this.handlePromoChange.bind(this)
    this.state = {
      promoCode: null,
      coupons: null
    }
  }

  componentDidMount() {
    fetchCoupons({
      gps: localStorage.getItem("gps")
    })
      .then(coupons => {
        this.setState({ coupons })
      })
  }

  handlePromoChange(e) {
    this.setState({ promoCode: e.target.value })
  }

  handleApplyPromo() {
    const { promoCode } = this.state
    this.props.onApply(promoCode)
  }
  
  render() {
    return (
      <div id="promo--codes">
        <div className="promo--code__form">
          <div className="form-group">
            <input value={this.state.promoCode} onChange={this.handlePromoChange} placeholder="Enter Coupon Code" />
            <span onClick={this.handleApplyPromo} className="os s8">APPLY</span>
          </div>
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