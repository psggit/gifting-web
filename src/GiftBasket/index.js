import React from "react"
import Basket from "./basket"
import Icon from "Components/icon"
import "./gift-basket.scss"

function PromoBeforeApply() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Icon name="promoCode" />
      <span className="os s5" style={{ marginLeft: "10px" }}>Apply Promo Code</span>
    </div>
  )
}

function PromoAfterApply() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <p className="os s5">FLAT350OFF</p>
        <p className="os s8">Rs. 350 off</p>
      </div>
      <Icon name="promoCodeClose" />
    </div>
  )
}

function BasketTotal() {
  return (
    <div>
      <p style={{ paddingBottom: "12px", borderBottom: "1px solid #dfdfdf" }} className="os s5">Total</p>
      <div style={{ padding: "16px 0", borderBottom: "1px solid #dfdfdf" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="os s8">Gift Card Subtotal</p>
          <p className="os s8">Rs. 7,050</p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <p className="os s8">Promo Applied</p>
          <p className="os s8">-Rs. 350</p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <p className="os s8">To Pay</p>
        <p className="os s8">Rs. 6,700</p>
      </div>
    </div>
  )
}

class GiftBasket extends React.Component {
  render() {
    const isPromoApplied = true
    return (
      <div id="gift--basket">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="paper basket">
                <Basket />
              </div>
            </div>

            <div className="col">
              <div className="paper coupon">
                {
                  !isPromoApplied ? <PromoAfterApply /> : <PromoBeforeApply />
                }
              </div>

              <div className="paper total">
                <BasketTotal />
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default GiftBasket