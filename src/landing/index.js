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
          <h2 className="cm s1">
          Gift drinks to your friends
          with HipBar Gifting!
          </h2>

          <p className="os s2">
          With HipBar Gift Cards, gift drinks to your friends & family this festive season! Redeem drinks at 50+ retailers across Bengaluru!
          </p>

          <div style={{ marginTop: "30px", }}>
            <Button primary icon="rightArrow">Start Gifting!</Button>
          </div>
          <p className="os s7">
            Currently in Bengaluru <br />
            Coming soon to 10+ cities accros India!
          </p>

        </div>

        <div className="col">
          <GiftCard />
        </div>
      </div>
      <h2 className="cm s2">
        Get 50%* off on your first HipBar Gift Card!
      </h2>

    </div>
  </div>
)

export default LandingPage