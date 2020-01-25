import React from "react"
import Basket from "./basket"
import Icon from "Components/icon"
import Button from "Components/button"
import BasketTotal from "./BasketTotal"
import { getBasketTotal } from "./../ProductDetails/SkuItem"
import PromoCodesWeb from "./../PromoCodesWeb"
import { mountModal, unmountModal } from "Components/modal-box2/utils"
import SignIn from "./../SignIn"
import { fetchGiftCardSummary } from "./../api"
import "./gift-basket.scss"
import { scrollToTop } from "Utils/ui-utils"
import NavLink from "Components/NavLink"

function mountPromoCodesWeb(props) {
  mountModal(PromoCodesWeb({
    onApply: props.onApply
  }))
}

function PromoBeforeApply(props) {
  return (
    <div onClick={() => { mountPromoCodesWeb(props) }} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
      <Icon name="promoCode" />
      <span className="os s5" style={{ margin: "0 10px" }}>Apply Promo Code</span>
      <Icon name="rightArrowBlack" />
    </div>
  )
}

function PromoAfterApply({ promoCode, discount, onRemove, shortDescription }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <p className="os s5">{promoCode}</p>
        <p className="os s8">{shortDescription}</p>
      </div>
      <div style={{ cursor: "pointer" }} onClick={onRemove}>
        <Icon name="promoCodeClose" />
      </div>
    </div>
  )
}

function PromoBeforeSignIn(props) {
  return (
    <div onClick={() => { mountModal(SignIn({})) }} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
      <Icon name="promoCode" />
      <span className="os s5" style={{ margin: "0 10px" }}>Sign in to view promo codes</span>
      <Icon name="rightArrowBlack" />
    </div>
  )
}

function PromoInvalid({ message, onRemove }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <p style={{ color: "#c23934" }} className="os s5">{message}</p>
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
    this.state = {
      basket: basket,
      subtotal: null,
      total: null,
      discount: null,
      giftSummary: null,
      isPromoApplied: false,
      isPromoInvalid: false,
      settingGiftSummary: false,
      promoModalMounted: false,
      totalDrinks: null,
      key: 0
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
    console.log("basket", basket)
    // if (window.gtag) {
    //   gtag("event", "applied_promo", {
    //     "event_label": JSON.stringify({
    //       appliedPromo: promoCode,
    //       cartTotal: localStorage.getItem("amount"),
    //       city: JSON.parse(localStorage.getItem("receiver_info")).cityName
    //     })
    //   })
    // }
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
        sku_id: item.sku.sku_id
      }
    })
    const giftCardSummaryReq = {
      promo_code: promoCode,
      state_id: JSON.parse(localStorage.getItem("receiver_info")).state_id,
      city_id: JSON.parse(localStorage.getItem("receiver_info")).city_id,
      products
    }
    return fetchGiftCardSummary(giftCardSummaryReq)
      .then(giftSummary => {
        const updatedBasket = this.getUpdatedBasket(giftSummary.products)
        this.updateLocalBasket(updatedBasket)
        const total = giftSummary.format_balance.slice(1).split(" ").join("")
        localStorage.setItem("amount", total)
        this.setState({
          settingGiftSummary: false,
          promoCode,
          giftSummary,
          shortDescription: giftSummary.short_description,
          subtotal: giftSummary.total.slice(1).split(" ").join(""),
          total,
          discount: giftSummary.promo_discount.slice(1).split(" ").join(""),
          totalDrinks: getBasketTotal(updatedBasket)
        }, () => {
          if (CB) CB(null)
        })
      })
      .catch((err) => {
        this.setState({ settingGiftSummary: false })
        err.response.json().then(json => {
          if (CB) {
            CB(json.message)
          }
          if (json.errorCode === "Promo not Valid") {
            const amount = (parseFloat(this.state.subtotal) - parseFloat(this.state.discount)).toFixed(2)
            localStorage.setItem("amount", amount)
            this.setState({
              isPromoApplied: false,
              isPromoInvalid: localStorage.getItem("promo_code") !== null,
              discount: 0,
              total: amount,
              invalidPromoMessage: json.message,
              subtotal: amount
            })
            localStorage.removeItem("promo_code")
            this.setGiftSummary(null, basket)
          }
        })
      })
  }

  updateLocalBasket(basket) {
    this.setState({ basket })
    // console.log("basket", basket)
    // let cartDetails = basket.map((item) => {
    //   return ({
    //     productName: item.brand.brand_name,
    //     quantity: item.count,
    //     volume: item.sku.volume,
    //     promoApplied: this.state.promoCode ? this.state.promoCode : "",
    //   })
    // })
    // console.log("cart Details", cartDetails)
    // if(window.gtag) {
    //   gtag("event", "view_cart", {
    //     "event_label": JSON.stringify({
    //       cartItems: cartDetails,
    //       totalToPay: localStorage.getItem("amount") ? localStorage.getItem("amount")  : ""
    //     })
    //   })
    // }
    if (!basket.length) {
      localStorage.removeItem("basket")
    } else {
      localStorage.setItem("basket", JSON.stringify(basket))
    }
  }

  getUpdatedBasket(products) {
    const basket = JSON.parse(localStorage.getItem("basket"))
    return basket.map((item) => {
      item.sku.price = this.getPriceUsingSkuId(item.sku.sku_id, products)
      return item
    })
  }

  getPriceUsingSkuId(id, products) {
    return products.find((item) => item.sku_id === id).price
  }

  UNSAFE_componentWillMount() {
    const transactionCompleted = localStorage.getItem("transaction--completed")
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info"))
    if (!receiverInfo || !receiverInfo.gps || transactionCompleted) {
      localStorage.removeItem("basket")
      location.href = "/send-gift"
    }
  }

  componentDidMount() {
    scrollToTop()
    const basket = JSON.parse(localStorage.getItem("basket"))
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info"))
    this.setState({ viewProductsUrl: `/brands/${receiverInfo.state_id}/${receiverInfo.genre_id}/${receiverInfo.city_id}` })
    // console.log("basket", basket)
    // let cartDetails = basket.map((item) => {
    //   return ({
    //     productName: item.brand.brand_name,
    //     quantity: item.count,
    //     volume: item.sku.volume,
    //     promoApplied: this.state.promoCode ? this.state.promoCode : "",
    //   })
    // })
    // console.log("cart Details", cartDetails)
    // if(window.gtag) {
    //   gtag("event", "view_cart", {
    //     "event_label": JSON.stringify({
    //       cartItems: cartDetails,
    //       totalToPay: localStorage.getItem("amount") ? localStorage.getItem("amount")  : ""
    //     })
    //   })
    // }
    if (basket) {
      const promoCode = localStorage.getItem("promo_code")
      this.setGiftSummary(promoCode, basket, () => {
        if (promoCode) {
          this.setState({ promoCode, isPromoApplied: true })
        }
      })
    }
  }

  renderPromoItem() {
    if (this.state.isPromoApplied && !this.state.isPromoInvalid) {
      return (
        <PromoAfterApply
          promoCode={this.state.promoCode}
          discount={this.state.discount}
          shortDescription={this.state.shortDescription}
          onRemove={this.handleRemovePromo}
        />
      )
    } else if (!this.state.isPromoApplied && !this.state.isPromoInvalid) {
      return <PromoBeforeApply onApply={this.onApplyPromo} />
    } else if (this.state.isPromoInvalid && !this.state.promoModalMounted) {
      return (
        <PromoInvalid
          onRemove={() => { this.setState({ isPromoApplied: false, isPromoInvalid: false }) }}
          message={this.state.invalidPromoMessage}
        />
      )
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
                  <div className="row main">
                    <div className="col main">
                      <div className="paper basket">
                        <Basket
                          basket={this.state.basket}
                          updateLocalBasket={this.updateLocalBasket}
                          getGiftSummary={this.getGiftSummary}
                          setGiftSummary={this.setGiftSummary}
                          {...this.props}
                          setBasketTotalPrice={this.setBasketTotalPrice}
                        />
                      </div>
                    </div>

                    <div className="col main">
                      <div className="paper coupon">
                        {
                          localStorage.getItem("hasura-id")
                            ? this.renderPromoItem()
                            : <PromoBeforeSignIn />
                        }
                      </div>

                      <div className="paper total">
                        <BasketTotal
                          key={this.state.key}
                          subtotal={this.state.subtotal}
                          total={this.state.total}
                          discount={this.state.discount}
                        />
                      </div>
                      <div className="personalise-btn" style={{ marginTop: "20px", width: "100%", zIndex: 1 }}>
                        <div>
                          <p className="os s4">{this.state.totalDrinks} drinks in basket</p>
                          <p className="os s4"><b>&#8377; {this.state.total}</b></p>
                        </div>
                        <NavLink history={this.props.history} href="/personalise">
                          <Button icon="rightArrowWhite" primary>Personalise</Button>
                        </NavLink>
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
                  <p className="os s4">Gift Basket is empty</p>
                  <div style={{ marginTop: "20px" }}>
                    <NavLink history={this.props.history} href={this.state.viewProductsUrl}><Button primary>Add products</Button></NavLink>
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