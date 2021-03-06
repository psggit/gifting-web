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
        <p style={{ paddingBottom: "12px", fontWeight: "600" }} className="os s5 b-bottom">Total</p>
        <div className="b-bottom" style={{ padding: "16px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="os s7">Gift Card Subtotal</p>
            <p className="os s7">&#8377; {this.props.subtotal}</p>
          </div>
  
          {
            parseFloat(this.props.discount)
              ?   <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <p className="os s7">Promo Applied</p>
                <p className="os s7">- &#8377; { this.props.discount }</p>
              </div>
              : "" 
          }
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <p className="os s7">To Pay</p>
          <p className="os s7">&#8377; {this.props.total}</p>
        </div>
      </div>
    )
  }
}

export default BasketTotal