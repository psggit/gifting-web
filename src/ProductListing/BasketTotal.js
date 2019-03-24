import React from "react"
import Button from "Components/button"
import PropTypes from "prop-types"
import "./sass/basket-total.scss"
import { getBasketTotal } from "./../ProductDetails/SkuItem"

class BasketTotal extends React.Component {
  constructor() {
    super()
    this.state = {
      basketTotal: null,
      basketTotalPrice: null

    }
  }
  componentDidMount() {
    const basket = JSON.parse(localStorage.getItem("basket"))
    const basketTotal = basket ? getBasketTotal(basket) : 0
    const basketTotalPrice = basket ? localStorage.getItem("amount") : "N/A"
    this.setState({ basketTotal, basketTotalPrice })
  }
  render() {
    const { basketTotal, basketTotalPrice } = this.state
    return (
      <div className="basket--container">
        <div>
          <p className="os s4">{ basketTotal } drink{`${basketTotal > 1 ? "s" : ""}`} in basket</p>
          <p className="os s4" style={{ fontWeight: "600" }}>&#8377; {basketTotalPrice} </p>
        </div>
        <a href="/basket">
          <Button icon="rightArrowWhite" primary>Gift basket</Button>
        </a>
      </div>
    )
  }
}

export default BasketTotal

BasketTotal.propTypes = {
  totalPrice: PropTypes.string,
  noOfDrinks: PropTypes.string
}