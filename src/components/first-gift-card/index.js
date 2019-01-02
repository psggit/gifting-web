import React from "react"
import Button from "Components/button"
import "./first-gift-card.scss"

const FirstGiftCard = () => (
  <div className="first-gift-card">
    <h1 className="cm s1">
    Get 50%* off on your first HipBar Gift Card!
    </h1>

    <p className="os s2">
    Gift drinks to your friends & family this festive season<br/>
with HipBar Gift Cards!
    </p>

    <a href="/send-gift">
      <Button secondary  icon="rightArrowBlack">start gifting!</Button>
    </a>
  </div>
)

export default FirstGiftCard