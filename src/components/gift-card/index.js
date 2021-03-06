import React from "react"
import "./gift-card.scss"
import Icon from "Components/icon"

const GiftCard = ({ amount }) => (
  <div className="gift-card">
    <div className="logo-wrapper">
      <Icon name="hipbarLogoWhite" />
      <div>
        <p>HipBar</p>
        <p>GIFT CARD</p>
      </div>
    </div>
    <p className="price">
      <span>&#8377;</span>
      <span>{amount}</span>
    </p>

    <div className="gift-logo">
      <Icon name="gift" />
    </div>
  </div>
)

export default GiftCard