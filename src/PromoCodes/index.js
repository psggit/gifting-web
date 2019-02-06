import React from "react"
import PromoCodeItem from "./PromoCodeItem"
import "./sass/promo-code.scss"

class PromoCodes extends React.Component {
  constructor() {
    super()
    this.handleApplyPromo = this.handleApplyPromo.bind(this)
    this.handlePromoChange = this.handlePromoChange.bind(this)
    this.state = {
      promoCode: null
    }
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
            [1,2,3,4,5].map((item, i) => (
              <PromoCodeItem onApply={this.props.onApply} key={i} />
            ))
          }
        </div>
      </div>
    )
  }
}

export default PromoCodes