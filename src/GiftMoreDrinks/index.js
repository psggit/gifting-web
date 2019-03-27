import React from "react"
import Icon from "Components/icon"
import Button from "Components/button"
import "./gift-more-drinks.scss"

function GiftMoreDrinks({ url }) {
  return (
    <div className="gift--more-drinks">
      <a href={url}>
        <Icon name="giftIcon" />
        <p className="os s7">Gift more drink(s)</p>
      </a>
      <a href="/basket">
        <Button primary icon="rightArrowWhite">Gift basket</Button>
      </a>
    </div>
  )
}

export default GiftMoreDrinks