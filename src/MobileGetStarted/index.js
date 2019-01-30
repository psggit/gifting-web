import React from "react"
import "./mobile-get-started.scss"
import Button from "Components/button"
import Icon from "Components/icon"

export default function MobileGetStarted(props) {
  return (
    <div id="mobile-get-started">
      <div className="container os">
        <div className="paper">
          <div className="paper-content">
            <div className="gift"><Icon name="giftIcon" /></div>
            <p className="os s1">
              Welcome to HipBar Gifting!
            </p>
            <p className="os s4">
              We’ll help you choose the perfect drink to gift for your special someone!
            </p>
            <div style={{ marginTop: "24px" }}>
              <Button
                primary
                icon="rightArrowWhite"
              >
              Get started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}