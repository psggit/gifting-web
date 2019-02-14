import React from "react"
import "./form.scss"
import InputMask from "react-input-mask"
import Icon from "Components/icon"
import Button from "Components/button"
import { validateTextField, validateNumberField } from '../utils/validators';

class Form extends React.Component {
  constructor() {
    super()
    this.inputNameMap = {
      receiverName: "Receiver name",
      receiverNumber: "Receiver number"
    }

    this.characterLimit = 250

    this.gift = JSON.parse(localStorage.getItem("gift"))
    
    this.state = {
      senderName: this.gift ? this.gift.senderName : "",
      senderNumber: this.gift? this.gift.senderNumber: "",
      giftMessage: this.gift ? this.gift.giftMessage : "",
      receiverName: this.gift ? this.gift.receiverName : "",
      receiverNumber: this.gift ? this.gift.receiverNumber : "",
      amount: this.gift ? this.gift.amount : "",
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

  handlePhoneChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value})
  }

  handleMessageChange(e) {
    const message = e.target.value
    message.length > this.characterLimit
    ? e.preventDefault()
    : this.setState({
        giftMessage: message,
        count: this.characterLimit - message.length
      })
  }


  proceedToPayment() {
    const { amount, giftMessage, receiverNumber, senderName, receiverName } = this.state

    const receiverNumberErr = validateNumberField(this.inputNameMap['receiverNumber'], receiverNumber)
    this.setState({receiverNumberErr: validateNumberField(this.inputNameMap['receiverNumber'], receiverNumber)})

    const receiverNameErr = validateTextField(this.inputNameMap['receiverName'], receiverName)
    this.setState({receiverNameErr: validateTextField(this.inputNameMap['receiverName'], receiverName)})
    console.log(receiverNumberErr, receiverNameErr)

    if(senderName.length && !receiverNumberErr.status && !receiverNameErr.status) {
      // this.createTransaction(amount, giftMessage, receiverNumber, senderName, receiverName)
      localStorage.setItem("gift", JSON.stringify({
        amount,
        giftMessage,
        receiverName,
        receiverNumber,
        senderName,
        senderNumber: this.state.senderNumber,
      }))
      this.props.history.push("/checkout")
    }
  }

  handleBackClick() {
    location.href = "/basket"
  }

  render() {
    const {receiverNameErr, receiverNumberErr} = this.state;
    return (
      <div id="giftInputForm" className="gift-card-form">
        <div className="layout">
          <div className="container">
            <p 
              style={{ 
                borderBottom: "1px solid #c2c2c2", 
                paddingBottom: "12px", 
                marginBottom: "30px", 
                cursor: 'pointer', 
                color: '#000',
                fontWeight: 'bold'
              }} 
              className="os s8"
            >
              <span 
                style={{
                  marginRight: "8px",
                  verticalAlign: 'middle'
                }}
                onClick={() => this.handleBackClick()}
              >
                <Icon name="rightArrowBlack" />
              </span>
              Gift Basket
            </p>
            <div style={{ marginBottom: '36px' }}>
              <span style={{ marginRight: '6px' }}><Icon name="appUser" /></span>
              <span className="os s7" style={{ fontWeight: '600' }}>Personalise</span>
            </div>
            <div className="form-item">
              <div className="form-group">
                <label className="os">Personal Message (optional)</label>
                <textarea
                  value={this.state.giftMessage}
                  onChange={this.handleMessageChange}
                  name="giftMessage" rows="4" cols="50"
                  placeholder="Enter a personal message for a more personalized experience"
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
              <h1 className="os s5">To</h1>

              <div className="form-group">
                <label className="os">Recipients Name</label>
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
                <label className="os">Recipients Phone Number</label>
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
              <h3 className="os s5">From</h3>

              <div className="form-group">
                <label className="os">Senders Name</label>
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
                <label className="os">Senders Phone Number</label>
                <div style={{display: 'flex'}}>
                  <div className={`country-code`}>
                    +91
                  </div>
                  <input 
                    value={this.state.senderNumber} 
                    disabled={true}
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
    {/* 
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
            </div> */}

            {/* <div className="form-item"> */}
              <div className="form-group">
                {/* <input onChange={(e) => { this.setState({ agreement: e.target.checked})  }} type="checkbox" id="terms" />
                <label htmlFor="terms" className="os s7" >
                  I agree that the recipient is of legal drinking age and I agree to the <a href="/" target="_blank">Terms & Conditions</a>
                </label> */}
                <div className="terms-and-conditions">
                  <span onClick={() => { this.setState({ agreement: !this.state.agreement})}} style={{marginRight: '10px', display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer'}}>
                    {
                      !this.state.agreement
                      ? <Icon name="rectangle" />
                      : <Icon name="filledRectangle" />
                    }
                  </span>
                  <span style={{width: 'calc(100% - 24px)', display: 'inline-block', cursor: 'pointer', userSelect: 'none'}}> I confirm that the recipient is of legal drinking age and I agree to the <a style={{color: "#000"}} href="/gifting-t-c" target="_blank">Terms & Conditions</a></span>
                </div>
              </div>
            {/* </div> */}
            <div style={{ marginTop: "20px" }} className="payment-button">
              <Button
                disabled={!this.state.agreement}
                onClick={this.proceedToPayment}
                primary 
                icon="rightArrowWhite">
                Proceed to pay
              </Button>
            </div>
          </div>
        
        </div>
        <div className="payment-button mobile">
          <Button
            disabled={!this.state.agreement}
            onClick={this.proceedToPayment}
            primary 
            icon="rightArrowWhite">
            Proceed to pay
          </Button>
        </div>
      </div>
    )
  }
}

export default Form