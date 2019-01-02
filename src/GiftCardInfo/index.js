import React from 'react'
import './gift-card-info.scss'
import Icon from "Components/icon"
import Button from "Components/button"
import FirstGiftCard from "Components/first-gift-card"
import Header from "Components/header"
import Footer from "Components/footer"

class GiftCards extends React.Component {
  constructor(props) {
    super(props) 
    //console.log("props", props, props.data, props.name, props.isLoggedIn)
  }

  // componentWillReceiveProps(newProps) {
  //   //console.log("helo", newProps)
  //   if(this.props.username !== newProps.username || this.props.isLoggedIn !== newProps.isLoggedIn) {
  //     this.setState({username: newProps.username, isLoggedIn: newProps.isLoggedIn})
  //   }
  // }

  render() {
    //console.log("props in card", this.props)
    return(
      <div>
        <Header/>
        <div id="GiftCards">
          <div className="content">
            <h2 className="cm s1">How to use HipBar Gift Cards?</h2>
            <span className="step-number"><Icon name="stepOne" /></span>
            <div className="step-text">
              <h2 className="cm s2">Gift Drinks with HipBar Gifting</h2>
              <span className="os s2">
                Enter the amount to gift, the recipients
                information, pay for the gift card and
                you are good to go!
              </span>
            </div>
            <span className="step-number"><Icon name="stepTwo" /></span>
            <div className="step-text">
              <h2 className="cm s2">Recipient gets notified via SMS & Whatsapp!</h2>
              <span className="os s2">
                With further information on how to use the 
                gift cards, they have to download the 
                HipBar app to use their
                HipBar Gift Card.
              </span>
            </div>

            <span className="step-number"><Icon name="stepThree" /></span>
            <div className="step-text">
              <h2 className="cm s2">Recipient downloads the HipBar app</h2>
              <span className="os s2">
                With the HipBar app, they can easily
                view their Gift Cards and redeem them it at 
                50+ HipBar powered retail outlets in
                Bengaluru
              </span>
            </div>

            <div className="app-store-btn">
              <a rel="noopener noreferrer" target="_blank" href="https://itunes.apple.com/in/app/hipbar-delivery/id1179371753?mt=8"><Icon name="appStore" /></a>
              <a rel="noopener noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=in.hipbar.hipbar_user_app&hl=en_IN"><Icon name="googleStore" /></a>
            </div>

            <span className="step-number"><Icon name="stepFour" /></span>
            <div className="step-text">
              <h2 className="cm s2">Get drinks with HipBar Gift Card at Retail Outlets*</h2>
              <span className="os s2">
                Recipient pays for drinks with their HipBar
                Gift Card at select 50+ retail outlets across
                Bengaluru
              </span>
            </div>

            <div style={{ marginTop: "30px" }}>
              <a href="/retail-outlet">
                <Button primary>View retail outlets</Button>
              </a>
            </div>
          </div>
         
          <FirstGiftCard />
          <Footer />
        </div>
      </div>
    )
  }
}

export default GiftCards