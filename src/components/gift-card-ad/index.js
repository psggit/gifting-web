import React from "react"
import Button from "Components/button"
import CustomButton from "./../custom-button"

class GiftCardAd extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "#1c1c1c",
          padding: "8% 15%",
          textAlign: "center",
          // position: "absolute",
          // top: "50%",
          // transform: "translateY(-50%)"
        }}
      > 
        <p 
          className="ft s1"
          style={{
            textTransform: "uppercase",
            color: "#ff9300",
            letterSpacing: "-0.7px",
            fontWeight: "600",
            marginBottom: "10px"
          }}
        >
          Share a drink. Spread the love.
        </p>
        <p className="ft s3 sub-header" style={{color: "#bcbec0", marginBottom: "56px"}}>
          Gift drinks to your friends &amp; family with hipbar gift cards!
        </p>
        <a href="/send-gift"><Button primary icon="rightArrowWhite">Start gifting</Button></a>
      </div>
    )
  }
}

export default GiftCardAd