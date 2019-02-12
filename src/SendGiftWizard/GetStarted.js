import React from "react"
import "./sass/get-started.scss"
import Button from "Components/button"
import Icon from "Components/icon"

export default function GetStarted() {
  return (
    <div id="getstarted">
      <div className="container">
        <div className="paper">
          <div className="paper-content">
            <div className="gift">
              <Icon name="giftIcon" />
            </div>
            <p className="os s1">
              Welcome to HipBar Gifting!
            </p>
            <p className="os s4">
              We’ll help you choose the perfect drink to gift<br /> for your special someone!
            </p>
            <div style={{ marginTop: "40px" }}>
              <a href="/send-gift/select-name">
                <Button
                  primary
                  icon="rightArrowWhite"
                >
                Get started
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>      
  )
}