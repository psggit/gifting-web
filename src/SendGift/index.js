import React from "react"
import Giftcard from "Components/gift-card"
import Button from "Components/button"
import Header from "Components/header"
import Footer from "Components/footer"
import "./send-gift.scss"
import { POST } from "Utils/fetch"

class SendGift extends React.Component {
  constructor() {
    super()
    this.state = {
      activePrice: "price2",
      amount: "999",
      giftMessage: "Wish you a merry christmas, wish you a merry christmas and a very happy new year! :)",
      receiverName: "Madhur",
      receiverNumber: "8989415866",
      senderName: "Arun",
      senderNumber: "9789702255"
    }
    this.createTransaction = this.createTransaction.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.proceedToPayment = this.proceedToPayment.bind(this)
  }

  proceedToPayment() {
    const { amount, giftMessage, receiverNumber, senderName, receiverName} = this.state
    this.createTransaction(amount, giftMessage, receiverNumber, senderName, receiverName)
  }

  handleAmountChange(e) {
    this.setState({ amount: e.target.value, activePrice: e.target.name })
  }

  handleMessageChange(e) {
    this.setState({ personalMessage: e.target.value })
  }

  handlePhoneChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  createTransaction(amount, giftMessage, receiverNumber, senderName, receiverName) {
    POST({
      api: "/consumer/payment/gift/create",
      apiBase: "orderman",
      data: {
        amount: parseFloat(amount),
        mode: "gift",
        gift_message: giftMessage,
        receiver_number: receiverNumber,
        sender_name: senderName,
        device: "web",
        receiver_name: receiverName
      }
    })
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
                <h3 className="os s5">Gift Card Information</h3>
                <div className="form-group">
                  <label className="os">Amount to gift</label>
                  <div className="amounts">

                    <div className="form-field">
                      <input className={this.state.activePrice === "price1" && "focused"}  onClick={this.handleAmountChange} name="price1" type="text" defaultValue="499" readOnly />
                    </div>

                    <div className="form-field">
                      <input className={this.state.activePrice === "price2" && "focused"} onClick={this.handleAmountChange} name="price2" type="text" defaultValue="999" readOnly />
                    </div>

                    <div className="form-field">
                      <input className={this.state.activePrice === "price3" && "focused"} onClick={this.handleAmountChange} name="price3" type="text" defaultValue="1999" readOnly />
                    </div>

                    <div className="form-field">
                      <input onChange={this.handleAmountChange} name="price1" maxLength="5" type="text" placeholder="Other" />
                      <span>&#8377;</span>
                    </div>

                  </div>
                </div>

                <div className="form-group">
                  <label className="os">Personal Message (optional)</label>
                  <textarea onChange={this.handleMessageChange} name="giftMessage" rows="4" cols="50"></textarea>
                  {/* <p>416 characters remaining</p> */}
                </div>
              </div>
              
              <div className="form-item recipient-info">
                <h3 className="os s5">Recipient Information</h3>

                <div className="form-group">
                  <label className="os">Name</label>
                  <input onChange={this.handleTextChange} name="receiverName" type="text" />
                </div>

                <div className="form-group">
                  <label className="os">Phone Number</label>
                  <input onChange={this.handlePhoneChange} name="receiverNumber" maxLength="10" type="text" />
                </div>
              </div>

              <div className="form-item senders-info">
                <h3 className="os s5">Senders Information</h3>

                <div className="form-group">
                  <label className="os">Name</label>
                  <input onChange={this.handleTextChange} name="senderName" type="text" />
                </div>

                <div className="form-group">
                  <label className="os">Phone Number</label>
                  <input onChange={this.handlePhoneChange} name="senderNumber" maxLength="10" type="text" />
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

              {
                localStorage.getItem("isLoggedIn")
                  ? (
                    <div style={{ marginTop: "20px" }}>
                      <Button onClick={this.proceedToPayment} primary>Proceed to payment</Button>
                    </div>
                  )
                  : (
                    <div style={{ marginTop: "20px" }}>
                      <Button primary>Sign in to proceed</Button>
                    </div>
                  )
              }

            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default SendGift