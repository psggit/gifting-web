import React from "react"
import Button from "Components/button"
import PropTypes from "prop-types"
import "./sass/basket-total.scss"
import { getBasketTotal, getBasketTotalPrice } from "./../ProductDetails/SkuItem"

const basket = JSON.parse(localStorage.getItem("basket"))
const basketTotal = basket ? getBasketTotal(basket) : 0
const basketTotalPrice = basket ? getBasketTotalPrice(basket) : "N/A"

function BasketTotal() {
  return (
    <div className="basket--container">
      <div>
        <p className="os s4">{ basketTotal } drink{`${basketTotal > 1 ? "s" : ""}`} in basket</p>
        <p className="os s4" style={{ fontWeight: "600" }}>Rs {basketTotalPrice} </p>
      </div>
      <a href="/basket">
        <Button icon="rightArrowWhite" primary>Gift basket</Button>
      </a>
    </div>
  )
}

export default BasketTotal

BasketTotal.propTypes = {
  totalPrice: PropTypes.string,
  noOfDrinks: PropTypes.string
}