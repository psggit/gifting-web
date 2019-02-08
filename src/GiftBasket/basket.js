import React from "react"
import Icon from "Components/icon"
import GiftBasketItem from "./GiftBasketItem"

class Basket extends React.Component {
  render() {
    const basket = JSON.parse(localStorage.getItem("basket")) || []
    return (
      <div>
        <div className="header">
          <Icon name="back" />
          <span
            style={{
              marginLeft: "10px",
            }} className="os s5">Back</span>
        </div>

        <div className="basket-body">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Icon name="giftBasket" />
            <span className="os s5" style={{ marginLeft: "10px" }}>Gift Basket</span>
          </div>

          {
            basket.map(item => <GiftBasketItem item={item} />)
          }
        </div>
      </div>
    )
  }
}

export default Basket