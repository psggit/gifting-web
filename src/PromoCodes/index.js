import React from "react"
import PromoCodeItem from "./PromoCodeItem"
import "./sass/promo-code.scss"

class PromoCodes extends React.Component {
  render() {
    return (
      <div id="promo--codes">
        <div className="promo--code__header">
          <div className="form-group">
            <input placeholder="Enter Coupon Code" />
            <span className="os s8">APPLY</span>
          </div>
        </div>
        <div className="promo--code__body">
          {
            [1,2,3,4,5].map((item, i) => (
              <PromoCodeItem key={i} />
            ))
          }
        </div>
      </div>
    )
  }
}

export default PromoCodes