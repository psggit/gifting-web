import React from 'react'
import './giftCards.scss'
import Icon from "Components/icon"
//import { getIcon } from 'Utils/icon-utils'
//import googlePlayBtn from 'Images/PlayStore.svg'
//import appStoreBtn from 'Images/app-store.svg'

class GiftCards extends React.Component {
  constructor(props) {
    super(props) 
  }

  render() {
    return(
      <div id="GiftCards">
        <div className="content">
          <h4>How to use HipBar Gift Cards?</h4>
         <span className="step-number"><Icon name="stepOne" /></span>
          <div className="step-text">
            <h2>Gift Drinks with HipBar Gifting</h2>
            <span>
              Enter the amount to gift, the recipients
              information, pay for the gift card and
              you are good to go!
            </span>
          </div>
          <span className="step-number"><Icon name="stepTwo" /></span>
          <div className="step-text">
            <h2>Recipient gets notified via SMS & Whatsapp!</h2>
            <span>
              With further information on how to use the 
              gift cards, they have to download the 
              HipBar app to use their
              HipBar Gift Card.
            </span>
          </div>

          <span className="step-number"><Icon name="stepThree" /></span>
          <div className="step-text">
            <h2>Recipient downloads the HipBar app</h2>
            <span>
              With the HipBar app, they can easily
              view their Gift Cards and redeem them it at 
              50+ HipBar powered retail outlets in
              Bengaluru
            </span>
          </div>

          <div className="app-btns">
            <a target="_blank" href="https://itunes.apple.com/in/app/hipbar-delivery/id1179371753?mt=8">
              <Icon name="appStore" />
            </a>
            <a target="_blank" href="https://play.google.com/store/apps/details?id=in.hipbar.hipbar_user_app&hl=en_IN">
              <Icon name="googleStore" />
            </a>
          </div>

          <span className="step-number"><Icon name="stepFour" /></span>
          <div className="step-text">
            <h2>Get drinks with HipBar Gift Card at Retail Outlets*</h2>
            <span>
              Recipient pays for drinks with their HipBar
              Gift Card at select 50+ retail outlets across
              Bengaluru
            </span>
          </div>

          <div className="button">
            <p>VIEW RETAIL OUTLETS</p>
            <span><Icon name="rightArrowWhite" /></span>
          </div>
        </div>
        <div className="start-gifting">
          <h4>
            Get 50%* off on your first HipBar Gift Card!
          </h4>
          <div className="note">
            Gift drinks to your friends & family this festive season with HipBar Gift Cards!
          </div>
          <div className="button">
            <p>START GIFTING</p>
            <span><Icon name="rightArrowBlack" /></span>
          </div>
        </div>
      </div>
    )
  }
}

export default GiftCards