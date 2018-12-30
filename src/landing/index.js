import React from "react"
import Button from "Components/button"
import Icon from "Components/icon"
import "./landing.scss"
import GiftCard from "Components/gift-card"
import FirstGiftCard from "Components/first-gift-card"
import { mountModal } from 'Components/modal-box/utils'
import AgeGate from './../AgeGate'
import Header from "Components/header"
import Footer from "Components/footer"

class LandingPage extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      isLoggedIn: false
    }
  }
  
  componentDidMount() {
    if(!localStorage.getItem('isLoadingFirstTime')) {
      mountModal(AgeGate({}))
    }
  }

  componentWillReceiveProps(newProps) {
    console.log("new props", newProps)
    //if(this.props.username !== newProps.username && this.props.isLoggedIn !== newProps.isLoggedIn) {
      this.setState({username: newProps.username, isLoggedIn: newProps.isLoggedIn})
    //}
  }

  render() {
    return (
      <div>
        <Header username={this.props.username} isLoggedIn={this.props.isLoggedIn}/>
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
                  <Button primary icon="rightArrowWhite">Start Gifting!</Button>
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
              <div style={{ marginTop: "20px" }}>
                <Icon name="downArrow" />
              </div>
            </h2>
          </div>

          <div className="brands">
            <h1 className="brands-heading os s1">
              Brands that we’ve partnered with
            </h1>
            <div className="brands-list">
              <img src="https://hipbar.com/a21696ca22b7c04fb7591c52c5089f4f.png" />
              <img src="https://hipbar.com/a0ee9f2c10e0e287bc9c05d64cffa171.png" />
              <img src="https://hipbar.com/d38974e5f50a5ae0f40ba9e323f03b63.png" />
              <img src="https://hipbar.com/9e9ee179bf9d959bef56c681e6670b9b.png" />
            </div>

            <h1 className="brands-heading os s1">
            and 50+ more!
            </h1>
          </div>

          <div className="what-is-hipbar">
            <div>
              <h1 className="cm s1">What is HipBar?</h1>
              <p className="os s2">
              HipBar is a RBI-authorized mobile wallet and India's first digital currency exclusively meant for transacting adult beverages.
              </p>
            </div>

            <div style={{ marginTop: "100px" }}>
              <h1 className="cm s1">What are HipBar Gift Cards?</h1>
              <p className="os s2">
              With HipBar Gift Cards, gift drinks to your friends & family this festive season! Redeem drinks at 50+ retailers across Bengaluru!
              </p>
            </div>
          </div>

          <div className="our-presence">
            <h1 className="brands-heading os s1">
            Our presense across India
            </h1>
            <div className="presence-counts">
              <div className="presence-item">
                <h1 className="os s0">10+</h1>
                <h1 className="brands-heading os s1">Cities across India</h1>
              </div>

              <div className="presence-item">
                <h1 className="os s0">100+</h1>
                <h1 className="brands-heading os s1">Retail outlets</h1>
              </div>

              <div className="presence-item">
                <h1 className="os s0">60+</h1>
                <h1 className="brands-heading os s1">Brands</h1>
              </div>
            </div>
          </div>

          <div className="how-to-use">
            <h1 className="cm s1">How to use HipBar Gift Cards?</h1>
            <div className="item">
              <Icon name="stepOne" />
              <h2 className="cm s2">Gift drinks with HipBar Gifting</h2>
              <p className="os s3">
              Enter the amount to gift, the recipient’s<br/>
              information, pay for the gift card and <br/>
              you’re good to go!
              </p>
            </div>


            <div className="item">
              <Icon name="stepTwo" />
              <h2 className="cm s2">Recipient gets notified via SMS & Whatsapp!</h2>
              <p className="os s3">
              With further information on how to use the<br/> gift cards, they have to download the<br/> HipBar app to use their<br/>
          HipBar Gift Card.
              </p>
            </div>

            <div className="item">
              <Icon name="stepThree" />
              <h2 className="cm s2">Recipient downloads the HipBar app</h2>
              <p className="os s3">
              With the HipBar app, they can easily<br/> view their Gift Cards and redeem it at<br/>
          50+ HipBar powered retail outlets in<br/> Bengaluru
              </p>

              <div className="app-store-btn">
                <a rel="noopener noreferrer" target="_blank" href="https://itunes.apple.com/in/app/hipbar-delivery/id1179371753?mt=8"><Icon name="appStore" /></a>
                <a rel="noopener noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=in.hipbar.hipbar_user_app&hl=en_IN"><Icon name="googleStore" /></a>
              </div>
            </div>

            <div className="item">
              <Icon name="stepFour" />
              <h2 className="cm s2">Gets drinks with HipBar Gift Card at Retail Outlets*</h2>
              <p className="os s3">
              Recipient pays for drinks with their HipBar<br/> Gift Card at select 50+ retail outlets across<br/>
          Bengaluru
              </p>
            </div>

            <div style={{ marginTop: "30px" }}>
              <Button primary>View Retail Outlets</Button>
            </div>
          </div>

          <FirstGiftCard />
        </div>
        <Footer />
      </div>
    )
  }
}

export default LandingPage