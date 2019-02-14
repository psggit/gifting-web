import React from "react"
import Basket from "./basket"
import Icon from "Components/icon"
import Button from "Components/button"
import BasketTotal from "./BasketTotal"
import { getBasketTotalPrice } from "./../ProductDetails/SkuItem"
import PromoCodesWeb from "./../PromoCodesWeb"
import { mountModal, unmountModal } from "Components/modal-box2/utils"
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

function PromoAfterApply({promoCode, discount, onRemove}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <p className="os s5">{promoCode}</p>
        <p className="os s8">Rs. {discount} off</p>
      </div>
      <div style={{ cursor: "pointer" }} onClick={onRemove}>
        <Icon name="promoCodeClose" />
      </div>
    </div>
  )
}

class GiftBasket extends React.Component {
  constructor() {
    super()
    const basket = JSON.parse(localStorage.getItem("basket")) || []
    const subtotal = basket ? getBasketTotalPrice(basket) : "N/A"
    this.state = {
      basket: basket,
      subtotal,
      total: subtotal,
      discount: null,
      giftSummary: null,
      isPromoApplied: false,
      settingGiftSummary: false
    }
    this.setBasketTotalPrice = this.setBasketTotalPrice.bind(this)
    this.onApplyPromo = this.onApplyPromo.bind(this)
    this.setGiftSummary = this.setGiftSummary.bind(this)
    this.handleRemovePromo = this.handleRemovePromo.bind(this)
    this.updateLocalBasket = this.updateLocalBasket.bind(this)
  }
  
  setBasketTotalPrice(price) {
    this.setState({ subtotal: price })
  }

  onApplyPromo(promoCode, CB) {
    const basket = JSON.parse(localStorage.getItem("basket"))
    this.setGiftSummary(promoCode, basket, (err) => {
      if (err) {
        CB(err)
        this.setState({ settingGiftSummary: false })
      } else {
        localStorage.setItem("promo_code", promoCode)
        this.setState({ isPromoApplied: true, promoCode })
        unmountModal()
      }
    })
  }

  handleRemovePromo() {
    const basket = JSON.parse(localStorage.getItem("basket"))
    localStorage.removeItem("promo_code")
    this.setGiftSummary(null, basket)
    this.setState({ isPromoApplied: false })
  }

  setGiftSummary(promoCode, basket, CB) {
    localStorage.setItem("basket", JSON.stringify(basket))
    this.setState({ settingGiftSummary: true })
    const products = basket.map(item => {
      return {
        count: item.count,
        product_id: item.sku.sku_pricing_id,
        type: "normal"
      }
    })
    const giftCardSummaryReq = {
      promo_code: promoCode,
      gps: localStorage.getItem("gps"),
      products
    }
    return fetchGiftCardSummary(giftCardSummaryReq)
      .then(giftSummary => {
        this.updateLocalBasket(giftSummary.products)
        localStorage.setItem("amount", giftSummary.balance)
        this.setState({
          settingGiftSummary: false,
          promoCode,
          giftSummary,
          subtotal: giftSummary.total.slice(1).split(" ").join(""),
          total: giftSummary.format_balance.slice(1).split(" ").join(""),
          discount: giftSummary.promo_discount.slice(1).split(" ").join("")
        }, () => {
          if (CB) CB(null)
        })
      })
      .catch((err) => {
        if (CB) CB(err)
      })
  }

  updateLocalBasket(basket) {
    this.setState({ basket })
    if (!basket.length) {
      localStorage.removeItem("basket")
    } else {
      localStorage.setItem("basket", basket)
    }
    // you were here..
  }

  componentDidMount() {
    const basket = JSON.parse(localStorage.getItem("basket"))
    if (basket) {
      const promoCode = localStorage.getItem("promo_code")
      this.setGiftSummary(promoCode, basket, () => {
        if (promoCode) {
          this.setState({ promoCode, isPromoApplied: true })
        }
      })
    }
  }

  render() {
    return (
      <div id="gift--basket">
        <div className="container">
          {
            this.state.basket.length
              ? (
                <React.Fragment>
                  <div className="row">
                    <div className="col">
                      <div className="paper basket">
                        <Basket
                          updateLocalBasket={this.updateLocalBasket}
                          getGiftSummary={this.getGiftSummary}
                          setGiftSummary={this.setGiftSummary}
                          {...this.props}
                          setBasketTotalPrice={this.setBasketTotalPrice} 
                        />
                      </div>
                    </div>

                    <div className="col">
                      <div className="paper coupon">
                        {
                          this.state.isPromoApplied
                            ? <PromoAfterApply
                              promoCode={this.state.promoCode}
                              discount={this.state.discount}
                              onRemove={this.handleRemovePromo}
                            />
                            : <PromoBeforeApply onApply={this.onApplyPromo} />
                        }
                      </div>

                      <div className="paper total">
                        <BasketTotal
                          subtotal={this.state.subtotal}
                          total={this.state.total}
                          discount={this.state.discount}
                        />
                      </div>
                      <div style={{ marginTop: "20px", width: "100%" }}>
                        <a href="/personalise">
                          <Button icon="rightArrowWhite" primary>Personalise</Button>
                        </a>
                      </div>
                    </div>

                  </div>
                  {
                    this.state.settingGiftSummary &&
                    <div className="updating--cart-loader">
                      <p className="os s3">Loading basket...</p>
                    </div>
                  }
                </React.Fragment>
              )
              : (
                <div className="paper no-basket">
                  <p className="os s4">Gift basket is empty</p>
                  <div style={{ marginTop: "20px" }}>
                    <a href="/"><Button primary>Add products</Button></a>
                  </div>
                </div>
              )
          }
        </div>
      </div>
    )
  }
}

export default GiftBasket