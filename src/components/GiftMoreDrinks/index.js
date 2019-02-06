import React from "react"
import Icon from "Components/icon"
import Button from "Components/button"
import "./gift-more-drinks.scss"

function GiftMoreDrinks() {
  return (
    <div className="gift--more-drinks">
      <div>
        <Icon name="giftIcon" />
        <p className="os s5">Gift more drinks</p>
      </div>
      <Button primary icon="rightArrowWhite">Gift basket</Button>
    </div>
  )
}

export default GiftMoreDrinks