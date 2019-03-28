import React from "react"
import "./personalise.scss"
import InputMask from "react-input-mask"
import Icon from "Components/icon"
import Button from "Components/button"
import { validateTextField, validateNumberField } from "../utils/validators"
import { mountModal } from "Components/modal-box/utils"
import SignIn from "./../SignIn"

function trimSpaces(inputVal) {
  if (!inputVal.trim().length) {
    inputVal = inputVal.trim()
  }
  return inputVal
}

class Personalise extends React.Component {
  constructor() {
    super()
    this.inputNameMap = {
      receiverName: "Receiver name",
      receiverNumber: "Receiver number"
    }

    this.characterLimit = 250
    this.receiverInfo = JSON.parse(localStorage.getItem("receiver_info"))
    this.senderName = localStorage.getItem("username") || ""
    this.senderNumber = localStorage.getItem("sender_mobile") || ""
    console.log("name and number", this.receiverInfo, this.senderName, localStorage.getItem("sender_mobile") )
    this.state = {
      senderName: this.senderName,
      senderNumber: this.senderNumber,
      giftMessage: this.receiverInfo ? (this.receiverInfo.message || "") : "",
      receiverName: this.receiverInfo ? (this.receiverInfo.name || "") : "",
      receiverNumber: this.receiverInfo ? (this.receiverInfo.phone || "") : "",
      count: this.gift 
        ? this.gift.giftMessage ?  this.characterLimit - this.gift.giftMessage.length : this.characterLimit
        : this.characterLimit,
  
      receiverNameErr: {
        value: "",
        status: false
      },
      receiverNumberErr: {
        value: "",
        status: false
      },
      agreement: false
    }

    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.proceedToPayment = this.proceedToPayment.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  UNSAFE_componentWillMount() {
    const transactionCompleted = localStorage.getItem("transaction--completed")
    if (transactionCompleted) {
      localStorage.removeItem("basket")
    }

    const shouldMount = !transactionCompleted && localStorage.getItem("basket")
    if (shouldMount === false) {
      location.href = "/send-gift"
    }
  }

  handlePhoneChange(e) {
    if (e.target.name === "receiverNumber") {
      this.receiverInfo.phone = e.target.value
      localStorage.setItem("receiver_info", JSON.stringify(this.receiverInfo))
    } else {
      localStorage.setItem("sender_mobile", e.target.value)
    }
    this.setState({ [e.target.name]: e.target.value })
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: trimSpaces(e.target.value) })
    if(e.target.name === "receiverName") {
      this.receiverInfo["name"] = e.target.value
    } else {
      this.receiverInfo[e.target.name] = e.target.value
    }
    console.log("adad", this.receiverInfo)
    localStorage.setItem("receiver_info", JSON.stringify(this.receiverInfo))
  }

  handleMessageChange(e) {
    const message = trimSpaces(e.target.value)
    message.length > this.characterLimit
      ? e.preventDefault()
      : this.setState({
        giftMessage: message,
        count: this.characterLimit - message.length
      }, () => {
        this.receiverInfo.message = message
        localStorage.setItem("receiver_info", JSON.stringify(this.receiverInfo))
        //localStorage.setItem("giftMessage", message)
      })
  }


  proceedToPayment() {
    const { giftMessage, receiverNumber, senderName, receiverName } = this.state

    const receiverNumberErr = validateNumberField(this.inputNameMap["receiverNumber"], receiverNumber)
    this.setState({receiverNumberErr: validateNumberField(this.inputNameMap["receiverNumber"], receiverNumber)})

    console.log(receiverNumberErr)

    const receiverNameErr = validateTextField(this.inputNameMap["receiverName"], receiverName)
    this.setState({receiverNameErr: validateTextField(this.inputNameMap["receiverName"], receiverName)})

    if(senderName.length && !receiverNumberErr.status && !receiverNameErr.status) {
      // this.createTransaction(amount, giftMessage, receiverNumber, senderName, receiverName)
      const receiverInfo = JSON.parse(localStorage.getItem("receiver_info"))
      receiverInfo.message = giftMessage
      receiverInfo.mobile = receiverNumber
      receiverInfo.name = receiverName
      localStorage.setItem("receiver_info", JSON.stringify(receiverInfo))
      localStorage.setItem("sender_name", senderName)
      this.props.history.push("/checkout")
    }
  }

  render() {
    const {receiverNameErr, receiverNumberErr} = this.state
    return (
      <div id="giftInputForm" className="gift-card-form">
        <div className="container">
          <div className="paper">
            <div className="header">
              <a href={"javascript:history.back()"}>
                <Icon name="back"/>
                <span style={{ marginLeft: "10px", fontWeight: "600" }} className="os s5">Back</span>
              </a>
            </div>
            
            <div className="personalise-icon" style={{ margin: "30px 0" }}>
              <Icon name="appUser" />
              <span style={{ marginLeft: "10px" }} className="os s7">Personalise</span>
            </div>
            <div className="form-item">
              <div className="form-group">
                <label className="os">Personal Message (optional)</label>
                <textarea
                  value={this.state.giftMessage}
                  onChange={this.handleMessageChange}
                  name="giftMessage" rows="4" cols="50"
                  placeholder="Thanks for all the great memories! Here's one on me. Cheers!"
                >
                </textarea>
                <p className="os s9">{this.state.count} characters {this.state.count < 250 ? "remaining" : ""}</p>
                {/* <p>416 characters remaining</p> */}
              </div>
            </div>
            
            <div className="form-item recipient-info">
              <h1 className="os s5">To</h1>

              <div className="form-group">
                <label className="os">Recipient's Name</label>
                <input 
                  value={this.state.receiverName}
                  onChange={this.handleTextChange}
                  onBlur={(e) => { this.setState({ receiverName: this.state.receiverName.trim() })}}
                  name="receiverName" 
                  type="text" 
                  className={`${receiverNameErr.status ? "error" : ""}`}
                  placeholder="Enter the recipients name"
                />
                {
                  receiverNameErr.status &&
                  <p className="error-message os s9">{receiverNameErr.value}</p>
                }
              </div>

              <div className="form-group">
                <label className="os">Recipient's Phone Number</label>
                <div style={{display: "flex"}}>
                  <div className={`country-code ${receiverNumberErr.status ? "error" : ""}`}>
                    <span className="os s7">+91</span>
                  </div>
                  <InputMask
                    onChange={this.handlePhoneChange} 
                    name="receiverNumber" 
                    mask="9999999999"
                    maskChar={null}
                    value={this.state.receiverNumber}
                    className={`mobile ${receiverNumberErr.status ? "error" : ""}`}
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
              <h3 className="os s5">From</h3>

              <div className="form-group">
                <label className="os">Sender's Name</label>
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
                <label className="os">Sender's Phone Number</label>
                <div style={{display: "flex"}}>
                  <div className="country-code">
                    <span className="os s7">+91</span>
                  </div>
                  <input 
                    value={this.state.senderNumber} 
                    onChange={this.handlePhoneChange} 
                    name="senderNumber" 
                    maxLength="10" 
                    className="mobile"
                    placeholder="Enter your phone number"
                    type="text" readOnly={localStorage.getItem("hasura-id") ? true : false} 
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="terms-and-conditions">
                  <span onClick={() => { this.setState({ agreement: !this.state.agreement})}} style={{marginRight: "10px", display: "inline-block", verticalAlign: "middle", cursor: "pointer"}}>
                    {
                      !this.state.agreement
                        ? <Icon name="rectangle" />
                        : <Icon name="filledRectangle" />
                    }
                  </span>
                  <span className="os s7" style={{ display: "inline-block",  userSelect: "none"}}> I confirm that the recipient is of legal drinking age and I agree to the <a style={{ textDecoration : "underline" }} href="/gifting-t-c" target="_blank">Terms & Conditions</a></span>
                </div>
              </div>
            </div>

            {
              localStorage.getItem("hasura-id")
                ? (
                  <React.Fragment>
                    <div style={{ marginTop: "20px", zIndex: "1" }} className="payment-button">
                      <Button
                        disabled={!this.state.agreement}
                        onClick={this.proceedToPayment}
                        primary 
                        icon="rightArrowWhite">
                        Proceed to pay
                      </Button>
                    </div>
                  </React.Fragment>
                )
                : (
                  <React.Fragment>
                    <div style={{ marginTop: "20px", zIndex: "1" }} className="payment-button">
                      <Button
                        disabled={!this.state.agreement}
                        onClick={() => { mountModal(SignIn({ mobile: this.state.senderNumber })) }}
                        primary 
                        icon="rightArrowWhite">
                        Sign in to proceed
                      </Button>
                    </div>
                  </React.Fragment>
                )
            }   

          </div>

        </div>
      </div>
    )
  }
}

export default Personalise