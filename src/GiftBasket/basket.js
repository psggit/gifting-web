import React from "react"
import Icon from "Components/icon"
import GiftBasketItem from "./GiftBasketItem"

class Basket extends React.Component {
  constructor(props) {
    super(props)
    this.updateBasket = this.updateBasket.bind(this)
    this.state = {
      basket: props.basket || [],
      backUrl: ""
    }
  }

  componentDidUpdate() {
    if (this.props.basket.length !== this.state.basket.length) {
      this.setState({ basket: this.props.basket })
    }
  }

  /**
   * Updates the basket (add/remove sku) using sku id and sku count.
   * @param {integer} skudId
   * @param {integer} count 
   */
  updateBasket(skudId, count) {
    const { basket } = this.state
    
    // make a copy of current basket
    let updatedBasket = basket.slice(1)

    // set the sku count if greater than 0 else remove the sku
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

    // get the gift summary if basket is not empty else remove the basket
    if (updatedBasket.length) {
      const promoCode = localStorage.getItem("promo_code")
      this.props.setGiftSummary(promoCode, updatedBasket)
    } else {
      localStorage.removeItem("promo_code")
      this.props.updateLocalBasket(updatedBasket)
      localStorage.removeItem("amount")
    }
  }
  
  render() {
    return (
      <div>
        <div className="header">
          <a
            href={"javascript:history.back()"}
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