import React from "react"
import { getBasketTotalPrice } from "./../ProductDetails/SkuItem"

class BasketTotal extends React.Component {
  constructor() {
    super()
    const basket = JSON.parse(localStorage.getItem('basket'))
    this.state = {
      subtotal: null
    }
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.subtotal !== this.props.subtotal) || (prevProps.discount !== this.props.discount)) {
      this.setState({
        subtotal: this.props.subtotal,
        discount: this.props.discount,
        total: this.props.total
      })
    }
  }

  render() {
    return (
      <div>
        <p style={{ paddingBottom: "12px", borderBottom: "1px solid #dfdfdf" }} className="os s5">Total</p>
        <div style={{ padding: "16px 0", borderBottom: "1px solid #dfdfdf" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="os s8">Gift Card Subtotal</p>
            <p className="os s8">Rs. {this.props.subtotal}</p>
          </div>
  
          {
            parseFloat(this.props.discount)
              ?   <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <p className="os s8">Promo Applied</p>
                <p className="os s8">-Rs. { this.props.discount }</p>
              </div>
              : "" 
          }
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <p className="os s8">To Pay</p>
          <p className="os s8">Rs. {this.props.total}</p>
        </div>
      </div>
    )
  }
}

export default BasketTotal