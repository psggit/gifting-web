import React from "react"
import Icon from "Components/icon"
import GiftBasketItem from "./GiftBasketItem"
import { getBasketTotalPrice } from "./../ProductDetails/SkuItem"
import { fetchGiftCardSummary } from "../api"

class Basket extends React.Component {
  constructor() {
    super()
    // this.removeItemFromBasket = this.removeItemFromBasket.bind(this)
    // this.addItemToBasket = this.addItemToBasket.bind(this)
    this.updateBasket = this.updateBasket.bind(this)
    this.state = {
      basket: JSON.parse(localStorage.getItem("basket")) || [],
      backUrl: ""
    }
  }

  componentDidMount() {
    this.setState({ backUrl: document.referrer })
  }

  updateBasket(skudId, count) {
    const { basket } = this.state
    let updatedBasket = basket.slice(1)
    if (count > 0) {
      updatedBasket = basket.map(item => {
        if (skudId === item.sku.sku_id) {
          item.count = count
        }
        return item
      })
    } else {
      updatedBasket = basket.filter(item => item.sku.sku_id !== skudId)
    }

    const promoCode = localStorage.getItem("promo_code")
    this.props.updateLocalBasket(updatedBasket)
    if (updatedBasket.length) {
      this.props.setGiftSummary(promoCode, updatedBasket)
    }
  }
  
  render() {
    console.log(this.state.basket)
    return (
      <div>
        <div className="header">
          <a
            href={this.state.backUrl}
            style={{
              cursor: "pointer",
            }} className="os s5">
            <Icon name="back" />
            <span style={{ marginLeft: "10px" }}>Back</span>
          </a>
        </div>

        <div className="basket-body">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Icon name="giftBasket" />
            <span className="os s5" style={{ marginLeft: "10px" }}>Gift Basket</span>
          </div>

          {
            this.state.basket.map(item => (
              <GiftBasketItem
                updateBasket={this.updateBasket}
                key={item.sku.sku_id}
                item={item}
                count={item.count}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

export default Basket