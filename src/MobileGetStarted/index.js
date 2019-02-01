import React from "react"
import "./mobile-get-started.scss"
import Button from "Components/button"
import Icon from "Components/icon"

export default function MobileGetStarted(props) {
  return (
    <div id = "getstarted" className="paper">
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
            onClick={(e) => props.handleNavigatePageClick(e, 1)}
          >
          Get started
          </Button>
        </div>
      </div>
    </div>      
  )
}