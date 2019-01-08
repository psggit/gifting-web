import React from "react"
import Giftcard from "Components/gift-card"
import Button from "Components/button"
import Header from "Components/header"
import Footer from "Components/footer"
import Icon from "Components/icon"
import SignIn from "./../SignIn"
import { mountModal } from "Components/modal-box/utils"
import "./send-gift.scss"
import { POST } from "Utils/fetch"
import AgeGate from './../AgeGate'
import InputMask from "react-input-mask"
import {readCookie} from "Utils/session-utils"
import { validateTextField, validateNumberField } from '../utils/validators';
import { parse } from "path";

class SendGift extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.name);
    this.count = 0;

    this.inputNameMap = {
      receiverName: "Receiver name",
      receiverNumber: "Receiver number"
    }
    this.characterLimit = 250
    this.storedState = JSON.parse(localStorage.getItem("send__gift__state"))
    this.defaultState = {
      activePrice: "price1",
      amount: "499",
      giftMessage: "",
      receiverName: "",
      receiverNumber: "",
      senderName: props.paramObj.username,
      senderNumber: props.paramObj.mobile,
      canProceed: false,
      count: 250,
      agreedTermsAndConditions: false,
      // username: props.username ? props.username : "",
      isLoggedIn: localStorage.getItem("hasura-id") ? true : false,
      isActive: false,
      receiverNameErr: {
        value: "",
        status: false
      },
      receiverNumberErr: {
        value: "",
        status: false
      },
      amountErr: {
        value: "",
        status: false
      },
      agreement: false
    }

    this.state = this.storedState ? Object.assign({}, this.storedState) : Object.assign({}, this.defaultState)
    localStorage.removeItem("send__gift__state")

    this.createTransaction = this.createTransaction.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.proceedToPayment = this.proceedToPayment.bind(this)
    this.toggleHowTo = this.toggleHowTo.bind(this)
    this.whatsappText = "Hey checkout hipbar gifting. http://192.168.0.113:8080"
    this.getOtherAmountClassName = this.getOtherAmountClassName.bind(this)
  }

  componentDidMount() {
    console.log("send gift mounting....")
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    localStorage.removeItem("txn")
    //localStorage.setItem("showAgeGate", false)
    if(!readCookie("isAgeGateAgreed")) {
      mountModal(AgeGate({}))
    }
  }

  componentDidUpdate(prevProps) {
    //console.log("componrnt fif update")
    //console.log("send gift", prevProps, this.props, prevProps.name, this.props.name)
    if (prevProps.paramObj.username !== this.props.paramObj.username || prevProps.paramObj.mobile !== this.props.paramObj.mobile || prevProps.paramObj.isLoggedIn !== this.props.paramObj.isLoggedIn ) {
      this.setState({ senderName: this.props.paramObj.username, senderNumber: this.props.paramObj.mobile, isLoggedIn: this.props.paramObj.isLoggedIn})
    }
  }

  toggleHowTo() {
    this.setState({ isActive: !this.state.isActive })
  }


  proceedToPayment() {
    const { amount, giftMessage, receiverNumber, senderName, receiverName } = this.state

    const receiverNumberErr = validateNumberField(this.inputNameMap['receiverNumber'], receiverNumber)
    this.setState({receiverNumberErr: validateNumberField(this.inputNameMap['receiverNumber'], receiverNumber)})

    const receiverNameErr = validateTextField(this.inputNameMap['receiverName'], receiverName)
    this.setState({receiverNameErr: validateTextField(this.inputNameMap['receiverName'], receiverName)})
    console.log(receiverNumberErr, receiverNameErr)
    // if (
    //   amount.length &&
    //   //giftMessage.length &&
    //   receiverName.length &&
    //   receiverNumber.length === 10 && ["1", "2", "3", "4", "5"].indexOf(receiverNumber[0]) === -1 &&
    //   senderName.length
    // ) 

    let amountErr = {
      status: false,
      value: ""
    }
    // let receiverNumberErr
    if (!amount.length) {
       amountErr = {
        status: true,
        value: "Amount is required"
      }
      this.setState({ amountErr })
    }

    console.log(amountErr, receiverNumberErr)
    
    if(senderName.length && !amountErr.status && !receiverNumberErr.status && !receiverNameErr.status) {
      this.createTransaction(amount, giftMessage, receiverNumber, senderName, receiverName)
    }
  }

  handleAmountChange(e) {
    this.setState({ amountErr: {status: false, value: ''}})
    if (e.target.name !== "price4") {
      this.setState({ amount: e.target.value, activePrice: e.target.name, otherValue: ""})
    } else {
      console.log(parseInt(e.target.value))
      if (parseInt(e.target.value) === 0) {
        //console.log("if1")
        e.preventDefault()
        //console.log("45")
        return;
      } 
      if (parseInt(e.target.value) < 100) {
        //console.log("if2")
        this.setState({ amountErr: {status: true, value: 'Minimum gift card value should be ₹100'}, otherValue: e.target.value})
        //e.preventDefault()
        return
      }
      if (parseInt(e.target.value) > 10000) {
       // console.log("if3")
        //this.setState({amountErr: {status: false, value: ''} })
        return;
      }
      //console.log("35")
      this.setState({ amount: e.target.value, activePrice: e.target.name, otherValue: e.target.value})
    }
  }

  handleMessageChange(e) {
    const message = e.target.value
    message.length > this.characterLimit
    ? e.preventDefault()
    : this.setState({
        giftMessage: message,
        count: this.characterLimit - message.length
      })
    // if(this.state.count > 0) {
    //   this.setState({count: max -  e.target.value.length, giftMessage: e.target.value })
    // } else if(e.target.value.length < max && this.state.count <= e.target.value.length) {
    //   this.setState({count: max - e.target.value.length})
    // } else {
    //   return
    // }
  }

  handlePhoneChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value})
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
      },
      handleError: true
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
          sender_num: this.state.senderNumber,
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

  handleCheckbox(e) {
    console.log("e", e.target.checked)
    this.setState({agreedTermsAndConditions: true})
  }

  getOtherAmountClassName() {
    let classname;
    if(this.state.activePrice === "price4") {
      classname += "focused"
    } 
    if(this.state.amountErr.status) {
      classname += "mobile error"
    }
    //classname = undefined;
    return classname;
  }
  // componentDidMount() {
  //   POST({
  //     api: "/consumer/payment/gift/create",
  //     apiBase: "orderman",
  //     data: {}
  //   })
  // }
 
  render() {
    console.log("state in send gift", this.state)
    //console.log("sender nae", this.state.senderName)
    const {receiverNameErr, receiverNumberErr, isActive} = this.state;
    return (
      <div>
        <div id="send-gift">
          <div className="how-to-gift mobile">
            <div onClick={this.toggleHowTo} className="how-to-gift-header">
              <p style={{ padding: "0 0 0 30px", color: "#fff" }} className="os s3">
                Using HipBar Gift Cards
              </p>
              <span className={`icon ${isActive ? 'show' : 'hide'}`}>
                <Icon name="filledDownArrowWhite" />
              </span>
            </div>
            <div className={`how-to-gift-body ${this.state.isActive ? "active" : ""}`}>
              <h2 className="cm s3">How to use HipBar Gift Cards?</h2>
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
                  With further information on how to use the gift <br /> cards, they have to download the HipBar app to use<br /> their HipBar Gift Card.
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
                          <input 
                            className={this.state.activePrice === "price1" ? "focused" : undefined}
                            onFocus={(e) => { e.currentTarget.blur() }}
                            onClick={this.handleAmountChange}
                            name="price1"
                            type="text"
                            defaultValue="499"
                            readOnly 
                          />
                        </div>

                        <div className="form-field">
                          <input
                            className={this.state.activePrice === "price2" ? "focused" : undefined}
                            onFocus={(e) => { e.currentTarget.blur() }}
                            onClick={this.handleAmountChange}
                            name="price2"
                            type="text"
                            defaultValue="999"
                            readOnly 
                          />
                        </div>

                        <div className="form-field">
                          <input 
                            className={this.state.activePrice === "price3" ? "focused" : undefined}
                            onFocus={(e) => { e.currentTarget.blur() }}
                            onClick={this.handleAmountChange}
                            name="price3"
                            type="text"
                            defaultValue="1999"
                            readOnly
                          />
                        </div>

                        <div className="form-field">
                          <InputMask 
                            mask="99999"
                            maskChar={null}
                            className={this.getOtherAmountClassName()}
                            onFocus={(e) => {
                              this.setState({ activePrice: "price4", amount: "" }) 
                            }}
                            value={this.state.otherValue}
                            onChange={this.handleAmountChange}
                            name="price4"
                            type="text"
                            placeholder="Other"
                          />
                          <span>&#8377;</span>
                        </div>

                      </div>
                      {
                        this.state.amountErr.status &&
                        <p className="error-message os s9">{this.state.amountErr.value}</p>
                      }
                    </div>

                    <div className="form-group">
                      <label className="os">Personal Message (optional)</label>
                      <textarea
                        value={this.state.giftMessage}
                        onChange={this.handleMessageChange}
                        name="giftMessage" rows="4" cols="50"
                        // onFocus={() => {this.countChars('char_count',10)}}
                        // onKeyDown={() => {this.countChars('char_count',10)}}
                        // onKeyUp={() => {this.countChars('char_count',10)}}
                      >
                      </textarea>
                      <p className="os s9"><span id="char_count">{this.state.count}</span> characters {this.state.count < 250 ? 'remaining' : ''}</p>
                      {/* <p>416 characters remaining</p> */}
                    </div>
                  </div>

                  <div className="form-item recipient-info">
                    <h3 className="os s5">Recipient Information</h3>

                    <div className="form-group">
                      <label className="os">Name</label>
                      <input 
                        value={this.state.receiverName}
                        onChange={this.handleTextChange}
                        onBlur={(e) => { this.setState({ receiverName: this.state.receiverName.trim() })}}
                        name="receiverName" 
                        type="text" 
                        className={`${receiverNameErr.status ? 'error' : ''}`}
                        placeholder="Enter the recipients name"
                      />
                      {
                        receiverNameErr.status &&
                        <p className="error-message os s9">{receiverNameErr.value}</p>
                      }
                    </div>

                    <div className="form-group">
                      <label className="os">Phone Number</label>
                      <div style={{display: 'flex'}}>
                        <div className={`country-code ${receiverNumberErr.status ? 'error' : ''}`}>
                          +91
                        </div>
                        <InputMask
                          onChange={this.handlePhoneChange} 
                          name="receiverNumber" 
                          mask="9999999999"
                          maskChar={null}
                          value={this.state.receiverNumber}
                          className={`mobile ${receiverNumberErr.status ? 'error' : ''}`}
                          type="text"
                          placeholder="Enter the recipients phone number"
                        />
                      </div>
                      {
                        receiverNumberErr.status &&
                        <p className="error-message os s9">{receiverNumberErr.value}</p>
                      }
                    </div>
                  </div>

                  <div className="form-item senders-info">
                    <h3 className="os s5">Sender's Information</h3>

                    <div className="form-group">
                      <label className="os">Name</label>
                      <input 
                        onChange={this.handleTextChange} 
                        value={this.state.senderName}  
                        name="senderName" 
                        type="text" 
                        placeholder="Enter your name"
                        readOnly={this.state.isLoggedIn}
                      />
                    </div>

                    <div className="form-group">
                      <label className="os">Phone Number</label>
                      <div style={{display: 'flex'}}>
                        <div className={`country-code`}>
                          +91
                        </div>
                        <input 
                          value={this.state.senderNumber} 
                          onChange={this.handlePhoneChange} 
                          name="senderNumber" 
                          maxLength="10" 
                          className={`mobile`}
                          placeholder="Enter your phone number"
                          type="text" readOnly={this.state.isLoggedIn} 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-item">
                    <div className="form-group">
                      {/* <input onChange={(e) => { this.setState({ agreement: e.target.checked})  }} type="checkbox" id="terms" />
                      <label htmlFor="terms" className="os s7" >
                        I agree that the recipient is of legal drinking age and I agree to the <a href="/" target="_blank">Terms & Conditions</a>
                      </label> */}
                      <div style={{display: 'flex'}}>
                        <span onClick={() => { this.setState({ agreement: !this.state.agreement})}} style={{marginRight: '10px', display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer'}}>
                          {
                            !this.state.agreement
                            ? <Icon name="rectangle" />
                            : <Icon name="filledRectangle" />
                          }
                        </span>
                        <span style={{width: 'calc(100% - 24px)', display: 'inline-block', cursor: 'pointer'}}> I confirm that the recipient is of legal drinking age and I agree to the <a style={{color: "#000"}} href="/gifting-t-c" target="_blank">Terms & Conditions</a></span>
                      </div>
                    </div>
                  </div>
                  {/* <div style={{marginBottom: '24px'}}>
                    <input type="checkbox" id="c1" name="cb" onChange={(e) => this.handleCheckbox(e)}/>
                    <label className="os s10" for="c1">I agree that the recipient is of legal drinking age and I agree to the <a href="https://www.google.com" target="_blank">Terms & Conditions</a></label>
                  </div> */}
                  {
                    localStorage.getItem("hasura-id")
                      ? (
                        <div style={{ marginTop: "20px" }}>
                          <Button
                            disabled={!this.state.agreement}
                            onClick={this.proceedToPayment}
                            primary 
                            icon="rightArrowWhite">
                            Proceed to payment
                          </Button>
                        </div>
                      )
                      : (
                        <div style={{ marginTop: "20px" }}>
                          <Button
                            disabled={!this.state.agreement}
                            onClick={() => {
                              localStorage.setItem("send__gift__state", JSON.stringify(this.state))
                              mountModal(SignIn({ mobile: this.state.senderNumber }))
                            }}
                            primary
                            icon="rightArrowWhite">
                            Sign in to proceed
                          </Button>
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
                    <p className="cm s6">Recipient gets notified via SMS</p>
                    <p className="os s7">
                      With further information on how to use the gift <br /> cards, they have to download the HipBar app to use<br /> their HipBar Gift Card.
                  </p>
                  </div>

                  <Icon name="step3" />
                  <div className="desc">
                    <p className="cm s6">Recipient downloads the HipBar app</p>
                    <p className="os s7">
                      With the HipBar app, they can easily view their Gift<br /> Cards and redeem it at 60+ HipBar powered retail<br /> outlets in Bengaluru and Goa.
                  </p>
                  </div>

                  <Icon name="step4" />
                  <div className="desc">
                    <p className="cm s6">
                      Redeem with HipBar Gift Card at Retail Outlets
                    </p>
                    <p className="os s7">
                      Recipient pays for drinks with their HipBar Gift Card<br /> at select 60+ retail outlets across Bengaluru and Goa
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
      </div>
    )
  }
}

export default SendGift