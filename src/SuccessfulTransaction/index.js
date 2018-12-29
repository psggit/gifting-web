import React from 'react'
import Header from "Components/header"
import Footer from "Components/footer"
import Icon from "Components/icon"
import "./successful-transaction.scss"

class SuccessfulTransaction extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Header />
        <div id="SuccessfulTransaction"> 
          <div className="content">
            <div className="successful">
              <div className="header section">
                <Icon name="success" />
                <h2 className="cm s1 title">Transaction Successful!</h2>
                <p className="info">We've informed the recipient about the gift card via SMS and WhatsApp</p>
              </div>
              <div className="body section">
                <p className="subheader">Transaction Details</p>
                <div className="section-content">
                  <span className="os s9">Amount Paid</span>
                  <p className="os s8">Rs. 499</p>
                </div>
                <div className="section-content">
                  <span className="os s9">Paid using</span>
                  <p className="os s8">3929****5993</p>
                </div>
                <div className="section-content">
                  <span className="os s9">Transaction ID</span>
                  <p className="os s8">#483293949304</p>
                </div>
                <div className="section-content">
                  <span className="os s9">Transaction Date and Time</span>
                  <p className="os s8">18/12/2018, 5.50 PM</p>
                </div>
              </div>
              <div className="footnote section">
                <p className="subheader">Gift Card Details</p>
                <p style={{marginTop: '20px', fontWeight: '600'}} className="os s8">To:</p>
                <div className="section-content">
                  <p className="os s8">Name</p>
                  <p className="os s8">Phone number</p>
                </div>
                <div className="section-content">
                  <span className="os s8" style={{fontWeight: '600'}}>Personal Message - </span>
                  <span className="os s8">message</span>
                </div>
              </div>
            </div>
            <div className="note">
              <div>
                <h2>Here's what you can do next</h2>
                <div className="info">
                  <span className="steps">
                    <Icon name="step1" />
                  </span>
                  <div className="detail">
                    <p className="os s8">
                      Inform your friend about the Gift Card
                    </p>
                    <span className="os s9">
                      For a more personalized experience, inform your friend about the gift card via Whatsapp
                    </span>
                  </div>
                </div>
                <div className="info">
                  <span className="steps">
                    <Icon name="step2" />
                  </span>
                  <div className="detail">
                    <p className="os s8">
                      Download the HipBar app!
                    </p>
                    <span className="os s9">
                      Download the HipBar app to manage your gift cards if necessary
                    </span>
                  </div>
                </div>
                <div className="info icon">
                  <a rel="noopener noreferrer" target="_blank" href="https://itunes.apple.com/in/app/hipbar-delivery/id1179371753?mt=8">
                    <Icon name="appStore" />
                  </a>
                  <a rel="noopener noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=in.hipbar.hipbar_user_app&hl=en_IN">
                    <Icon name="googleStore" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default SuccessfulTransaction