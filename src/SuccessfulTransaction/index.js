import React from 'react'
import Icon from "Components/icon"
import "Sass/transaction-status.scss"
import Moment from "moment"

class SuccessfulTransaction extends React.Component {
  constructor(props) {
    super(props)
    this.modeMap = {
      "CC": "Credit Card",
      "DC": "Debit Card",
      "NB": "Netbanking"
    }
  }

  render() {
    const { res } = this.props
    return (
      <div>
        <div id="SuccessfulTransaction" className="transaction-status"> 
          <div className="content">
            <div className="successful">
              <div className="header section">
                <Icon name="success" />
                <h2 className="cm s1 title">Transaction Successful!</h2>
                <p className="info">We've informed the recipient about the gift card via SMS</p>
              </div>
              <div className="body section">
                <p className="subheader">Transaction Details</p>
                <div className="section-content">
                  <span className="os s9">Amount Paid</span>
                  <p className="os s8">Rs. { res.net_amount_debit }</p>
                </div>
                <div className="section-content">
                  <span className="os s9">Paid using</span>
                  <p className="os s8">{ this.modeMap[res.mode] }</p>
                </div>
                <div className="section-content">
                  <span className="os s9">Transaction ID</span>
                  <p className="os s8">{ res.txnid }</p>
                </div>
                <div className="section-content">
                  <span className="os s9">Transaction Date and Time</span>
                  <p className="os s8">{ res.addedon }</p>
                </div>
              </div>
              <div className="footnote section">
                <p className="subheader">Gift Card Details</p>
                <p style={{marginTop: '20px', fontWeight: 'bold'}} className="os s8">To:</p>
                <div className="section-content">
                  <p className="os s8">{ res.firstname + res.lastname } </p>
                  <p className="os s8">{ res.phone }</p>
                </div>
                <div className="section-content">
                  <span className="os s8" style={{fontWeight: 'bold'}}>Personal Message - </span>
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
                    <p className="cm s6">
                      Make it personal!
                    </p>
                    <span className="os s7">
                      Inform your friend about the gift card via Whatsapp
                    </span>
                  </div>
                </div>
                <div className="info">
                  <span className="steps">
                    <Icon name="step2" />
                  </span>
                  <div className="detail">
                    <p className="cm s6">
                      Download the HipBar app!
                    </p>
                    <span className="os s7">
                      Download the HipBar app to manage your gift cards on the go
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
      </div>
    )
  }
}

export default SuccessfulTransaction