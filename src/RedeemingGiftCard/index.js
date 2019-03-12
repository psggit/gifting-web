import React from 'react'
import './redeeming-gift-card.scss'
import Icon from "Components/icon"
import Button from "Components/button"
import FirstGiftCard from "Components/first-gift-card"
import Footer from "Components/footer"

class GiftCards extends React.Component {
  constructor(props) {
    super(props) 
    //console.log("props", props, props.data, props.name, props.isLoggedIn)
  }

  render() {
    //console.log("props in card", this.props)
    return(
      <div>
        <div id="GiftCards">
          <div className="content">
            <h2 className="cm s1">Redeeming HipBar Gift Cards</h2>
            <span className="step-number"><Icon name="stepOne" /></span>
            <div className="step-text">
              <h2 className="cm s3">Download the HipBar app</h2>
              <span className="os s4">
                Download the HipBar app & sign up with the phone number in which you got the SMS in.
              </span>
            </div>

            <div className="app-store-btn">
              <a rel="noopener noreferrer" target="_blank" href="https://itunes.apple.com/in/app/hipbar-delivery/id1179371753?mt=8"><Icon name="appStore" /></a>
              <a rel="noopener noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=in.hipbar.hipbar_user_app&hl=en_IN"><Icon name="googleStore" /></a>
            </div>

            <span className="step-number"><Icon name="stepTwo" /></span>
            <div className="step-text">
              <h2 className="cm s3">Check Gift Wallet Balance</h2>
              <span className="os s4">
                Tap the "H" icon (Home screen - bottom right) to view available gift wallet balance (top right)
              </span>
            </div>

            <span className="step-number"><Icon name="stepThree" /></span>
            <div className="step-text">
              <h2 className="cm s3">View Retail Outlets</h2>
              <span className="os s4">
                View the list of HipBar-affiliated retail stores where your gift card can be redeemed
              </span>
            </div>

            <div style={{ marginTop: "30px" }}>
              <a href="/retail-outlet">
                <Button primary icon="rightArrowWhite">View retail outlets</Button>
              </a>
            </div>

            <span className="step-number"><Icon name="stepFour" /></span>
            <div className="step-text">
              <h2 className="cm s3">Redeem with HipBar Gift Card at retail Outlets</h2>
              <span className="os s4">
                Add preferred drinks to cart. Choose to pay with "Gift Wallet"
              </span>
            </div>
          </div>
         
          <FirstGiftCard />
          {/* <Footer /> */}
        </div>
      </div>
    )
  }
}

export default GiftCards