import React from "react"
import Icon from "Components/icon"
import Button from "Components/button"
import "./gift-more-drinks.scss"

function getUrl() {
  const u = location.pathname.split("/")
  u.pop()
  return u.join("/")
}

function GiftMoreDrinks() {
  return (
    <div className="gift--more-drinks">
      <a href={getUrl()}>
        <Icon name="giftIcon" />
        <p className="os s5">Gift more drinks</p>
      </a>
      <Button primary icon="rightArrowWhite">Gift basket</Button>
    </div>
  )
}

export default GiftMoreDrinks