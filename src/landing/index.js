import React from "react"
import Button from "Components/button"
import Icon from "Components/icon"
import "./landing.scss"
import GiftCard from "Components/gift-card"

const LandingPage = () => (
  <div id="landing">
    <div className="intro-wrapper">
      <div className="intro-container">
        <div className="col">
          <h2 className="heading-xl">
          Gift drinks to your friends
          with HipBar Gifting!
          </h2>

          <p className="para-l">
          With HipBar Gift Cards, gift drinks to your friends & family this festive season! Redeem drinks at 50+ retailers across Bengaluru!
          </p>

          <div style={{ marginTop: "30px", }}>
            <Button primary icon="rightArrow">Start Gifting</Button>
          </div>
        </div>

        <div className="col">
          <GiftCard />
        </div>
      </div>
    </div>
  </div>
)

export default LandingPage