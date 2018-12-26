import React from "react"
import Giftcard from "Components/gift-card"
import Button from "Components/button"
import Header from "Components/header"
import Footer from "Components/footer"
import "./send-gift.scss"

class SendGift extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Header />
        <div id="send-gift">
          <div className="container">
            <div className="gift-card-form">
              <Giftcard />

              <div className="form-item gift-card-info">
                <h3 className="os s3">Gift Card Information</h3>
                <div className="form-group">
                  <label className="os">Amount to gift</label>
                  <div className="amounts">

                    <div className="form-field">
                      <input type="text" defaultValue="499" readOnly />
                    </div>

                    <div className="form-field">
                      <input type="text" defaultValue="999" readOnly />
                    </div>

                    <div className="form-field">
                      <input type="text" defaultValue="1,999" readOnly />
                    </div>

                    <div className="form-field">
                      <input maxLength="5" type="text" placeholder="Other" />
                      <span>&#8377;</span>
                    </div>

                  </div>
                </div>

                <div className="form-group">
                  <label className="os">Personal Message (optional)</label>
                  <textarea rows="4" cols="50"></textarea>
                  <p>416 characters remaining</p>
                </div>
              </div>
              
              <div className="form-item recipient-info">
                <h3 className="os s3">Recipient Information</h3>

                <div className="form-group">
                  <label className="os">Name</label>
                  <input type="text" />
                </div>

                <div className="form-group">
                  <label className="os">Phone Number</label>
                  <input type="text" />
                </div>
              </div>

              <div className="form-item senders-info">
                <h3 className="os s3">Senders Information</h3>

                <div className="form-group">
                  <label className="os">Name</label>
                  <input type="text" />
                </div>

                <div className="form-group">
                  <label className="os">Phone Number</label>
                  <input type="text" />
                </div>
              </div>

              <div className="form-item">
                <div className="form-group">
                  {/* <input type="checkbox" id="terms" />
                  <label htmlFor="terms">
                  I agree that the recipient is of legal drinking<br/> age at his state of residence and I agree to the<br/> terms and condition
                  </label> */}
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <Button primary>Sign in to proceed</Button>
              </div>

            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default SendGift