import React from "react"
import Button from "Components/button"
import "./first-gift-card.scss"

const FirstGiftCard = () => (
  <div className="first-gift-card">
    <h1 className="cm s1">
    Share a drink. Spread the love!
    </h1>

    <p className="os s2">
    Gift drinks to your friends & family<br/>
with HipBar Gift Cards!
    </p>

    <a href="/send-gift">
      <Button primary icon="rightArrowBlack">start gifting!</Button>
    </a>
  </div>
)

export default FirstGiftCard