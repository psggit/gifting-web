import React from "react"
import Button from "Components/button"
import "./gift-card-ad.scss"

class GiftCardAd extends React.Component {
  constructor() {
    super()
  }

  handleClick(pageTitle) {
    console.log("hanld clck", pageTitle)
    if(window.gtag) {
      gtag("event", "point_of_clicking_start_gifting", {
        "event_label": JSON.stringify({
          page_title: pageTitle
        })
      })
    }
  }
  
  render() {
    return (
      <div
        className="gift--card-ad"
        style={{
          backgroundColor: "#000",
          padding: "8% 15%",
          textAlign: "center",
          // position: "absolute",
          // top: "50%",
          // transform: "translateY(-50%)"
        }}
      > 
        <p 
          className="ft s2"
          style={{
            textTransform: "uppercase",
            color: "#e97c07",
            letterSpacing: "-0.7px",
            fontWeight: "600",
            marginBottom: "10px"
          }}
        >
          Share a drink. Spread the love.
        </p>
        <p className="ft s3 sub-header" style={{color: "#bcbec0", marginBottom: "56px"}}>
          Gift drinks to your friends &amp; family with HipBar Gift cards!
        </p>
        <a href="/send-gift" onClick={() => this.handleClick(this.props.pageTitle)}><Button primary icon="rightArrowWhite">Start gifting</Button></a>
      </div>
    )
  }
}

export default GiftCardAd