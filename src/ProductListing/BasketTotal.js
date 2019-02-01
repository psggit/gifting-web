import React from "react"
import Button from "Components/button"
import PropTypes from "prop-types"
import "./sass/basket-total.scss"

function BasketTotal({ totalPrice, noOfDrinks }) {
  return (
    <div className="basket--container">
      <div>
        <p className="os s1">{ noOfDrinks } drinks in basket</p>
        <p className="os s1" style={{ fontWeight: "600" }}>Rs { totalPrice }</p>
      </div>
      <div>
        <Button icon="rightArrowWhite" primary>Gift basket</Button>
      </div>
    </div>
  )
}

export default BasketTotal

BasketTotal.propTypes = {
  totalPrice: PropTypes.string,
  noOfDrinks: PropTypes.string
}