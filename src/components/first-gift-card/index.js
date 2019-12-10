import React from "react"
import Button from "Components/button"
import "./first-gift-card.scss"
import { PLATFORM } from "Utils/constants"

const handleClick = () => {
  window.dataLayer.push({ "event": "start_gifting", "path_name": location.hostname, "page_title": document.title, "platform": PLATFORM })
  location.href = "/send-gift" 
}

const FirstGiftCard = () => (
  <div className="first-gift-card">
    <h1 className="cm s1">
    Share a drink. Spread the love!
    </h1>

    <p className="os s2">
    Gift drinks to your friends & family<br/>
with HipBar Gift Cards!
    </p>

    <a onClick={handleClick()}>
      <Button primary icon="rightArrowBlack">start gifting!</Button>
    </a>
  </div>
)

export default FirstGiftCard