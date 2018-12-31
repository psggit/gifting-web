import React from "react"
import Giftcard from "Components/gift-card"
import Button from "Components/button"
import Header from "Components/header"
import Footer from "Components/footer"
import Icon from "Components/icon"
import "./send-gift.scss"
import { POST } from "Utils/fetch"

class SendGift extends React.Component {
  constructor(props) {
    super(props)
    console.log(localStorage.getItem("sender_mobile"));
    
    this.state = {
      activePrice: "price2",
      amount: "999",
      giftMessage: "Wish you a merry christmas, wish you a merry christmas and a very happy new year! :)",
      receiverName: "Madhur",
      receiverNumber: "8989415866",
      senderName: "",
      senderNumber: localStorage.getItem("sender_mobile"),
      canProceed: false,
      username: props.username ? props.username : "",
      isLoggedIn: props.isLoggedIn ? props.isLoggedIn : false,
      isActive: false
    }
    this.createTransaction = this.createTransaction.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.proceedToPayment = this.proceedToPayment.bind(this)
    this.toggleHowTo = this.toggleHowTo.bind(this)
    this.whatsappText = "Hey checkout hipbar gifting. http://192.168.0.113:8080"
  }

  componentDidMount() {
    localStorage.removeItem("txn")
  }


  toggleHowTo() {
    this.setState({ isActive: !this.state.isActive })
  }

  componentWillReceiveProps(newProps) {
    //console.log("helo", newProps)
    if(this.props.username !== newProps.username || this.props.isLoggedIn !== newProps.isLoggedIn) {
      this.setState({username: newProps.username, isLoggedIn: newProps.isLoggedIn})
    }
  }
  
  proceedToPayment() {
    const { amount, giftMessage, receiverNumber, senderName, receiverName} = this.state
    if (
      amount.length &&
      giftMessage.length &&
      receiverName.length &&
      receiverNumber.length &&
      senderName.length
    ) {
      this.createTransaction(amount, giftMessage, receiverNumber, senderName, receiverName)
    }
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
      .then((json) => {
        this.postBody = {
          amount: json.amount,
          txnid: json.txnid,
          hash: json.hash,
          key: json.key,
          user_cred: json.user_cred,
          email: json.email,
          first_name: json.first_name,
          sender_name: senderName,
          sender_num: localStorage.getItem("sender_mobile"),
          gift_message: giftMessage,
          receiver_name: receiverName,
          receiver_number: receiverNumber
        }

        localStorage.setItem("txn", JSON.stringify(this.postBody))
        this.props.history.push("/checkout", this.postBody)
        // location.href = "/checkout"
        // this.setState({ canProceed: true }, () => {
        //   this.submit.click()
        // })
      })
  }

  // componentDidMount() {
  //   POST({
  //     api: "/consumer/payment/gift/create",
  //     apiBase: "orderman",
  //     data: {}
  //   })
  // }

  render() {
    return (
      <div>
        <Header username={this.state.username} isLoggedIn={this.state.isLoggedIn}/>
        <div id="send-gift">
        <div className="how-to-gift mobile">
              <div onClick={this.toggleHowTo} className="how-to-gift-header">

              </div>
              <div className={`how-to-gift-body ${this.state.isActive ? "active" : ""}`}>
                <h2 className="cm s3">How to use Hipbar Gift Cards?</h2>
                  <Icon name="step1" />
                  <div className="desc">
                    <p className="cm s6">Gift drinks with HipBar Gifting</p>
                    <p className="os s7">
                      Enter the amount to gift, the recipient’s information,<br />
                      pay for the gift card and you’re good to go!
                    </p>
                  </div>

                  <Icon name="step2" />
                  <div className="desc">
                    <p className="cm s6">Recipient gets notified via SMS & Whatsapp!</p>
                    <p className="os s7">
                    With further information on how to use the gift <br /> cards, they have to download the HipBar app to use<br/> their HipBar Gift Card.
                    </p>
                  </div>

                  <Icon name="step3" />
                  <div className="desc">
                    <p className="cm s6">Recipient downloads the HipBar app</p>
                    <p className="os s7">
                    With the HipBar app, they can easily view their Gift<br /> Cards and redeem it at 50+ HipBar powered retail<br /> outlets in Bengaluru.
                    </p>
                  </div>

                  <Icon name="step4" />
                  <div className="desc">
                    <p className="cm s6">
                    Gets drinks with HipBar Gift Card at 
                    Retail Outlets*
                    </p>
                    <p className="os s7">
                    Recipient pays for drinks with their HipBar Gift Card<br /> at select 50+ retail outlets across Bengaluru
                    </p>
                  </div>
                </div>
                </div>
          <div className="container">
          <div className="row">
            <div className="col">
              <div className="gift-card-form">
                <Giftcard amount={this.state.amount} />

                <div className="form-item gift-card-info">
                  <h3 className="os s5">Gift Card Information</h3>
                  <div className="form-group">
                    <label className="os">Amount to gift</label>
                    <div className="amounts">

                      <div className="form-field">
                        <input className={this.state.activePrice === "price1" ? "focused" : undefined} onFocus={(e) => { e.currentTarget.blur()}}  onClick={this.handleAmountChange} name="price1" type="text" defaultValue="499" readOnly />
                      </div>

                      <div className="form-field">
                        <input className={this.state.activePrice === "price2" ? "focused" : undefined} onFocus={(e) => { e.currentTarget.blur()}} onClick={this.handleAmountChange} name="price2" type="text" defaultValue="999" readOnly />
                      </div>

                      <div className="form-field">
                        <input className={this.state.activePrice === "price3" ? "focused": undefined} onFocus={(e) => { e.currentTarget.blur()}} onClick={this.handleAmountChange} name="price3" type="text" defaultValue="1999" readOnly />
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
                    <input value={this.state.senderNumber} onChange={this.handlePhoneChange} name="senderNumber" maxLength="10" type="text" readOnly />
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
                  localStorage.getItem("isLoggedIn") === "true"
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

            <div className="col">
              <div className="how-to-gift" >
              <h2 className="cm s3">How to use Hipbar Gift Cards?</h2>
                <Icon name="step1" />
                <div className="desc">
                  <p className="cm s6">Gift drinks with HipBar Gifting</p>
                  <p className="os s7">
                    Enter the amount to gift, the recipient’s information,<br />
                    pay for the gift card and you’re good to go!
                  </p>
                </div>

                <Icon name="step2" />
                <div className="desc">
                  <p className="cm s6">Recipient gets notified via SMS & Whatsapp!</p>
                  <p className="os s7">
                  With further information on how to use the gift <br /> cards, they have to download the HipBar app to use<br/> their HipBar Gift Card.
                  </p>
                </div>

                <Icon name="step3" />
                <div className="desc">
                  <p className="cm s6">Recipient downloads the HipBar app</p>
                  <p className="os s7">
                  With the HipBar app, they can easily view their Gift<br /> Cards and redeem it at 50+ HipBar powered retail<br /> outlets in Bengaluru.
                  </p>
                </div>

                <Icon name="step4" />
                <div className="desc">
                  <p className="cm s6">
                  Gets drinks with HipBar Gift Card at 
                  Retail Outlets*
                  </p>
                  <p className="os s7">
                  Recipient pays for drinks with their HipBar Gift Card<br /> at select 50+ retail outlets across Bengaluru
                  </p>
                </div>

              </div>
            </div>
          </div>

            {/* {
              this.state.canProceed &&
              <form action="/checkout" method="post">
                <input type="hidden" name="amount" value={this.postBody.amount} />
                <input type="hidden" name="txnid" value={this.postBody.txnid} />
                <input type="hidden" name="hash" value={this.postBody.hash} />
                <input type="hidden" name="key" value={this.postBody.key} />
                <input type="hidden" name="user_cred" value={this.postBody.user_cred} />
                <input type="hidden" name="email" value={this.postBody.email} />
                <input type="hidden" name="first_name" value={this.postBody.first_name} />
                <input style={{ display: "none" }} ref={(node) => { this.submit = node }} type="submit" value="submit" />
              </form>
            } */}

            {/* <a href={`whatsapp://send?text=${this.whatsappText}`} data-action="share/whatsapp/share">Share on whatsapp</a> */}

          </div>
        </div>
        <div style={{ display: "block" }}></div>
        <Footer />
      </div>
    )
  }
}

export default SendGift