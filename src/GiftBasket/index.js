import React from "react"
import Basket from "./basket"
import Icon from "Components/icon"
import BasketTotal from "./BasketTotal"
import { getBasketTotalPrice } from "./../ProductDetails/SkuItem"
import PromoCodesWeb from "./../PromoCodesWeb"
import { mountModal } from "Components/modal-box2/utils"
import { fetchGiftCardSummary } from "./../api"
import "./gift-basket.scss"

function mountPromoCodesWeb(props) {
  mountModal(PromoCodesWeb({
    onApply: props.onApply
  }))
}

function PromoBeforeApply(props) {
  return (
    <div onClick={() => { mountPromoCodesWeb(props) }} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
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

class GiftBasket extends React.Component {
  constructor() {
    super()
    const basket = JSON.parse(localStorage.getItem("basket"))
    this.state = {
      subtotal: basket ? getBasketTotalPrice(basket) : 0
    }
    this.setBasketTotalPrice = this.setBasketTotalPrice.bind(this)
  }
  
  setBasketTotalPrice(price) {
    this.setState({ subtotal: price })
  }

  onApplyPromo(promoCode) {
    fetchGiftCardSummary({
      promoCode,
      products: localStorage.getItem("basket") ,
      gps: localStorage.getItem("gps")
    })
  }
  render() {
    const isPromoApplied = true
    return (
      <div id="gift--basket">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="paper basket">
                <Basket {...this.props} setBasketTotalPrice={this.setBasketTotalPrice} />
              </div>
            </div>

            <div className="col">
              <div className="paper coupon">
                {
                  !isPromoApplied ? <PromoAfterApply /> : <PromoBeforeApply onApply={this.onApplyPromo} />
                }
              </div>

              <div className="paper total">
                <BasketTotal subtotal={this.state.subtotal} />
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default GiftBasket