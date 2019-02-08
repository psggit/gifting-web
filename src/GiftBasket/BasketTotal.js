import React from "react"
import { getBasketTotalPrice } from "./../ProductDetails/SkuItem"

class BasketTotal extends React.Component {
  constructor() {
    super()
    const basket = JSON.parse(localStorage.getItem('basket'))
    this.state = {
      subtotal: basket ? getBasketTotalPrice(basket) : 0
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.subtotal !== this.props.subtotal) {
      this.setState({ subtotal: this.props.subtotal })
    }
  }

  render() {
    return (
      <div>
        <p style={{ paddingBottom: "12px", borderBottom: "1px solid #dfdfdf" }} className="os s5">Total</p>
        <div style={{ padding: "16px 0", borderBottom: "1px solid #dfdfdf" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="os s8">Gift Card Subtotal</p>
            <p className="os s8">Rs. {this.state.subtotal}</p>
          </div>
  
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <p className="os s8">Promo Applied</p>
            <p className="os s8">-Rs. 350</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <p className="os s8">To Pay</p>
          <p className="os s8">Rs. {this.state.subtotal - 350}</p>
        </div>
      </div>
    )
  }
}

export default BasketTotal