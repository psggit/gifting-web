import React from 'react'
import Header from "Components/header"
import Footer from "Components/footer"
import './giftCards.scss'
import { getIcon } from 'Utils/icon-utils'
//import googlePlayBtn from 'Images/PlayStore.svg'
//import appStoreBtn from 'Images/app-store.svg'

class GiftCards extends React.Component {
  constructor(props) {
    super(props) 
  }

  render() {
    return(
      <div id="GiftCards">
        <Header />
        <div className="content">
          <h4>How to use HipBar Gift Cards?</h4>
          <div className="step-number">
            1
          </div>
          <div className="step-text">
            <h2>Gift Drinks with HipBar Gifting</h2>
            <span>
              Enter the amount to gift, the recipients
              information, pay for the gift card and
              you are good to go!
            </span>
          </div>

          <div className="step-number">
            2
          </div>
          <div className="step-text">
            <h2>Recipient gets notified via SMS & Whatsapp!</h2>
            <span>
              With further information on how to use the 
              gift cards, they have to download the 
              HipBar app to use their
              HipBar Gift Card.
            </span>
          </div>

          <div className="step-number">
            3
          </div>
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
            <a target="_blank" href="https://itunes.apple.com/in/app/hipbar-delivery/id1179371753?mt=8">{getIcon('app-store')}</a>
            <a target="_blank" href="https://play.google.com/store/apps/details?id=in.hipbar.hipbar_user_app&hl=en_IN">{getIcon('google-store')}</a>
          </div>

          <div className="step-number">
            4
          </div>
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
            <span>{getIcon('white-arrow')}</span>
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
            <p>VIEW RETAIL OUTLETS</p>
            <span>{getIcon('black-arrow')}</span>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default GiftCards