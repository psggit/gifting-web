import React from "react"
import "preact/debug"
import "./../sass/form.scss"
import "./payment.scss"
import Header from "Components/header"
import Footer from "Components/footer"
import Collapsible from "Components/collapsible"
import Button from "Components/button"
import Accordian from "Components/accordian"
import AccordianItem from "Components/accordian/accordian-item"
import { GET } from "Utils/fetch"
import GiftCard from "Components/gift-card"
import Icon from "Components/icon"
import InputMask from "react-input-mask"

// const cardNumMask = new IMask()

class Payment extends React.Component {
  constructor(props) {
    super(props)
    // console.log(this.props.history.location.state)
    this.txn = this.props.history.location.state || JSON.parse(localStorage.getItem("txn"))
    this.paymentMethods = {
      1: "card",
      2: "net_banking"
    }
    this.state = {
      senderName: this.txn ? this.txn.sender_name : "",
      sender_num: this.txn ? this.txn.sender_num : "",
      gift_message: this.txn ? this.txn.gift_message : "",
      receiver_name: this.txn ? this.txn.receiver_name : "",
      receiver_number: this.txn ? this.txn.receiver_number : "",
      amount: this.txn ? this.txn.amount: "",
      popularBanks: [],
      banks: [],
      savedCards: [],
      activeAccordian: -1,
      isPopularSelected: false,
      noBankSelected: true,
      bankcode: "null",
      ccnum: "",
      ccexp: "",
      ccname: "",
      ccvv: "",
      cctoken: "",
      store_card: false,
      selectedPaymentMethod: null,
      // username: props.username ? props.username : "",
      // isLoggedIn: props.isLoggedIn ? props.isLoggedIn : false
    }
    this.getBanks = this.getBanks.bind(this)
    this.getSavedCards = this.getSavedCards.bind(this)
    this.setActiveAccordian = this.setActiveAccordian.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getNetBankingForm = this.getNetBankingForm.bind(this)
    this.getCardBankingForm = this.getCardBankingForm.bind(this)
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this)
    this.handleCardExpiryChange = this.handleCardExpiryChange.bind(this)
    this.handleCVVChange  =this.handleCVVChange.bind(this)
    this.handleCardnameChange = this.handleCardnameChange.bind(this)
    this.setCardValues = this.setCardValues.bind(this)
    this.toggleHowTo = this.toggleHowTo.bind(this)
    this.handleSaveCard = this.handleSaveCard.bind(this)
    // this.getButtonStatus = this.getButtonStatus.bind(this)
  }

  componentWillMount() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    if (!localStorage.getItem("txn")) {
      console.log("go back")
      this.props.history.goBack()
    }
  }

  componentDidMount() {
    // console.log(this.props);
    
    this.getBanks()
    this.getSavedCards()
  }

  // componentWillReceiveProps(newProps) {
  //   //console.log("helo", newProps)
  //   if(this.props.username !== newProps.username || this.props.isLoggedIn !== newProps.isLoggedIn) {
  //     this.setState({username: newProps.username, isLoggedIn: newProps.isLoggedIn})
  //   }
  // }
  
  getSavedCards() {
    GET({
      api: "/consumer/payment/cards",
      apiBase: "blogicUrl"
    })
      .then(json => {
        this.setState({ savedCards: json.user_cards ? Object.values(json.user_cards) : [] })
      })
  }

  handleSaveCard(e) {
    const {store_card} = this.state;
    this.setState({ store_card: !store_card })
  }

  getBanks() {
    GET({
      api: "/consumer/payment/netbanking",
      apiBase: "blogicUrl"
    })
      .then(json => {
        this.setState({
          popularBanks: json.data.slice(0, 5).map((item) => {
            if (item.name === "AXIS Bank NetBanking") {
              item.name = "AXIS Bank"
            }

            if (item.name === "ICICI Netbanking") {
              item.name = "ICICI Bank"
            }

            if (item.name === "Kotak Mahindra Bank") {
              item.name = "Kotak Bank"
            }

            return item
          }),
          banks: json.data.slice(5)
        })
      })
  }

  setActiveAccordian(activeAccordian) {
    this.setState({ activeAccordian })
  }

  handleSelectChange(e) {
    this.setState({ isPopularSelected: false, noBankSelected: false, bankcode: e.target.value })
    Array.prototype.slice.call(this.radios.children).forEach(item => {
      item.childNodes[0].checked = false
    })
  }

  handleRadioChange(value) {
    this.setState({ isPopularSelected: true, noBankSelected: false, bankcode: value })
  }

  handleSubmit() {
    if (this.state.activeAccordian !== 2) {
      this.setState({ selectedPaymentMethod: "card" }, () => {
        console.log("Processing card payment..")
        if (this.ccnum) {
          if (this.state.ccname.length && this.state.ccnum.length && this.state.ccvv.length && this.state.ccexp.length) {
            this.submit.click()
          }
        } else {
          this.submit.click()
        }
      })
    } else {
      this.setState({ selectedPaymentMethod: "net_banking" }, () => {
        console.log("Processing net banking..")
        // console.log(this.bankcode)
        if (this.state.bankcode !== "null") {
          this.submit.click()
        }
      })
    }
  }

  toggleHowTo() {
    this.setState({ isActive: !this.state.isActive })
  }

  handleCardNumberChange(e) {
    this.setState({ ccnum: e.target.value })
  }

  handleCardExpiryChange(e) {
    this.setState({ ccexp: e.target.value })
  }

  handleCVVChange(e) {
    this.setState({ ccvv: e.target.value })
  }

  handleCardnameChange(e) {
    this.setState({ ccname: e.target.value })
  }

  getNetBankingForm() {
    const { bankcode } = this.state
    const postBody = {
      key: this.txn.key,
      txnid: this.txn.txnid,
      amount: this.txn.amount,
      productinfo: "gift",
      firstname: this.txn.first_name,
      email: this.txn.email,
      phone: this.txn.phone,
      lastname: "",
      surl: `${location.origin}/transaction?status=success`,
      furl: `{location.origin}/transaction?status=failure`,
      curl: `${location.origin}/transaction?status=cancelled`,
      hash: this.txn.hash,
      pg: "NB",
      bankcode, 
      udf1: "web"
    }

    return Object.entries(postBody).map(([key, value]) => (
      <input type="hidden" name={key} value={value} />
    ))
  }

  getCardBankingForm() {
    const postBody = {
      key: this.txn.key,
      txnid: this.txn.txnid,
      amount: this.txn.amount,
      productinfo: "gift",
      firstname: this.txn.first_name,
      email: this.txn.email,
      phone: this.txn.sender_num,
      lastname: "",
      surl: `${location.origin}/transaction-successful`,
      furl: `${location.origin}/transaction-failure`,
      curl: `${location.origin}/transaction-cancelled`,
      hash: this.txn.hash,
      pg: "DC",
      ccname: this.state.ccname,
      ccvv: this.state.ccvv,
      ccexpmon: this.state.ccexp.split("/")[0],
      ccexpyr: this.state.ccexp.split("/")[1],
      user_credentials: this.txn.user_cred,
      udf1: "web"
    }

    if (this.state.ccnum.length) {
      postBody.ccnum = this.state.ccnum.split(" ").join("")
    }

    if (this.state.store_card) {
      postBody.store_card = 1
    }

    if (this.state.cctoken.length) {
      postBody.store_card_token = this.state.cctoken
    }

    return Object.entries(postBody).map(([key, value]) => (
      <input type="hidden" name={key} value={value} />
    ))
  }

  setCardValues(id) {
    console.log(id)
    if (parseInt(id) < 3) {
      return true
    } else {
      const ccnum = this[`cardNum${id}`].name === "saved" ? "" : this[`cardNum${id}`].value
      const ccname = this[`cardName${id}`].value
      const cctoken = this[`cardToken${id}`].name === "saved" ? this[`cardToken${id}`].value : "" 
      const ccexp = this[`cardExp${id}`].value
      this.setState({ ccnum, ccnum, cctoken, ccexp })
      return true
    }
  }

  render() {
    return (
      <div>
        {
          localStorage.getItem("txn")
            ? (
              <div>
                <div id="checkout">
                <div className="how-to-gift mobile">
                  <div onClick={this.toggleHowTo} className="how-to-gift-header">
                    <p style={{ padding: "0 30px", color: "#fff" }} className="os s3">
                      Gift Card Summary
                        <span style={{ marginLeft: "10px" }}>
                        <Icon name="filledDownArrowWhite" />
                      </span>
                    </p>
                  </div>
                  <div className={`how-to-gift-body ${this.state.isActive ? "active" : ""}`}>
                    <div className="gift-card-info">
                        <div>
                          <p className="os s6">To</p>
                          <p className="os s7">{this.state.sender_name}<br /> +91 {this.state.sender_num}</p>
                        </div>

                        <div style={{ marginTop: "20px", borderBottom: "1px solid #dfdfdf", paddingBottom: "20px" }}>
                          <p className="os s7">
                            <span className="os s6">Personal Message -</span>{this.state.gift_message}
                          </p>
                        </div>

                        <div style={{ marginTop: "20px" }} >
                          <p className="os s6">From</p>
                          <p className="os s7">{this.state.receiver_name}<br /> +91 {this.state.receiver_number}</p>
                        </div>
                      </div>
                  </div>
                </div>
                  <div className="container">
                    <div className="row">
                    <div className="col">
                      <p style={{ borderBottom: "1px solid #c2c2c2", paddingBottom: "20px" }} className="os s5">To Pay: &#8377;{this.state.amount}</p>
                      <div className="payment-methods-wrapper">
                        <p className="os s5">Payment Method</p>
                        <p className="os s8">All transactions are secure and encrypted.</p>

                        <div className="payment-methods-container">
                          <Accordian
                            middleware={this.setCardValues}
                            setActiveAccordian={this.setActiveAccordian}
                            activeAccordian={this.state.activeAccordian}
                          >
                            {
                              this.state.savedCards.map((item, i) => (
                                <AccordianItem key={i+3} title={item.card_name} id={i+3} showRadioButton={true}>
                                  <div className="form-group">
                                    <label className="os">Card Number</label>
                                    <input ref={(node) => { this[`cardNum${i+3}`] = node }} name="saved" defaultValue={item.card_no} disabled type="text" />
                                  </div>

                                  <div className="form-group">
                                    <div style={{ width: "130px" }}>
                                      {/* <label className="os">Expiry Date</label> */}
                                      <input ref={(node) => { this[`cardExp${i+3}`] = node }} name="saved" defaultValue={`${item.expiry_month}/${item.expiry_year}`} type="hidden" maxLength={4} />
                                    </div>

                                    <div style={{ width: "130px", position: "relative" }}>
                                      <label className="os">CVV</label>
                                      <input onChange={this.handleCVVChange} ref={(node) => { this[`cardCvv${i+3}`] = node }} name="saved"  type="password" maxLength={4} />
                                      <div style={{ position: "absolute", top: 0, left: 0 }}></div>
                                    </div>
                                  </div>

                                  <div className="form-group">
                                    {/* <label className="os">Name on card</label> */}
                                    <input ref={(node) => { this[`cardToken${i+3}`] = node }} name="saved" defaultValue={item.card_token} type="hidden" />
                                  </div>

                                  <div className="form-group">
                                    {/* <label className="os">Name on card</label> */}
                                    <input ref={(node) => { this[`cardName${i+3}`] = node }} name="saved" defaultValue={item.name_on_card} type="hidden" />
                                  </div>
                                </AccordianItem>
                              ))
                            }

                            <AccordianItem key={1} title="Debit Card / Credit Card" id={1} showRadioButton={true}>
                              <div className="form-group">
                                <label className="os">Card Number</label>
                                <InputMask
                                  mask="9999 9999 9999 9999"
                                  maskChar={null}
                                  onChange={this.handleCardNumberChange}
                                />
                              </div>

                              <div className="form-group" style={{ display: "flex" }}>
                                <div style={{ width: "130px" }}>
                                  <label className="os">Expiry Date</label>
                                  <InputMask
                                  value={this.state.ccexpyr}
                                  mask="99/9999"
                                  maskChar={null}
                                  onChange={this.handleCardExpiryChange}
                                />
                                </div>

                                <div style={{ width: "130px", marginLeft: "30px" }}>
                                  <label className="os">CVV</label>
                                  <input value={this.state.ccvv}  onChange={this.handleCVVChange} type="password" maxLength={4} />
                                </div>
                              </div>

                              <div className="form-group">
                                <label className="os">Name on card</label>
                                <input onChange={this.handleCardnameChange} type="text" />
                              </div>

                              <div style={{  display: "flex", alignItems: "center", flexDirection: "row-reverse", justifyContent: "flex-end" }} className="form-group">
                                {/* <label htmlFor="save-card" style={{ marginLeft: "10px", cursor: "pointer" }} >Save card for faster transactions</label>
                                <input id="save-card" type="checkbox" onChange={this.handleSaveCard} /> */}
                                <div onClick={() => this.handleSaveCard()} style={{marginBottom: '10px'}}>
                                  <span style={{marginRight: '10px', display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer'}}>
                                    {
                                      this.state.store_card
                                      ? <Icon name="rectangle" />
                                      : <Icon name="filledRectangle" />
                                    }
                                  </span>
                                  <span style={{ display: 'inline-block', cursor: 'pointer'}}>Save card for faster transactions</span>
                                </div>
                              </div>
                            </AccordianItem>

                            <AccordianItem key={2} title="Net Banking" id={2} showRadioButton={true}>
                              <div style={{ padding: "0 20px" }}>
                                <p style={{ fontWeight: "bold", color: "#000", letterSpacing: "0.5px" }} className="os s8">Popular Banks</p>
                                <div ref={(node) => { this.radios = node}} style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
                                  {
                                    this.state.popularBanks.slice(0, 3).map((item, i) => (
                                      <div style={{ width: "120px", cursor: "pointer" }} key={i}>
                                        {/* <input onChange={this.handleRadioChange}  value={item.ibibo_code} name="bank_code" id={item.ibibo_code} type="radio" />

                                        <label style={{ color: "#000", letterSpacing: "0.5px", marginLeft: "5px" }} className="os s8" htmlFor={item.ibibo_code}>{item.name}</label> */}
                                        <div onClick={() => this.handleRadioChange(item.ibibo_code)} style={{marginBottom: '10px'}}>
                                          <span style={{marginRight: '10px'}}>
                                            {
                                              this.state.bankcode === item.ibibo_code 
                                              ? <Icon name="filledCircle" />
                                              : <Icon name="circle" />
                                            }
                                          </span>
                                          <span>{item.name}</span>
                                        </div>
                                      </div>
                                    ))
                                  }

                                  {
                                    this.state.popularBanks.slice(3).map((item, i) => (
                                      <div style={{ width: "120px", cursor: "pointer" }} key={i}>
                                        {/* <input onChange={this.handleRadioChange}  value={item.ibibo_code} name="bank_code" id={item.ibibo_code} type="radio" />
                                        <label style={{ color: "#000", letterSpacing: "0.5px", marginLeft: "5px" }} className="os s8" htmlFor={item.ibibo_code}>{item.name}</label> */}
                                        <div onClick={() => this.handleRadioChange(item.ibibo_code)} style={{marginBottom: '10px'}}>
                                          <span style={{marginRight: '10px'}}>
                                            {
                                              this.state.bankcode === item.ibibo_code 
                                              ? <Icon name="filledCircle" />
                                              : <Icon name="circle" />
                                            }
                                          </span>
                                          <span>{item.name}</span>
                                        </div>
                                      </div>
                                    ))
                                  }
                                </div>
                                <div>                                  
                                  <div style={{ marginTop: "20px" }} className="form-group">
                                    <p style={{ fontWeight: "bold", color: "#000", letterSpacing: "0.5px" }} className="os s8">Other Banks</p>
                                    <select value={this.state.bankcode} onChange={this.handleSelectChange} style={{ marginTop: "15px" }}>
                                      {
                                        (this.state.isPopularSelected || this.state.noBankSelected) &&
                                        <option value="null">-- Select a Bank --</option>
                                      }
                                      {
                                        this.state.banks.map((item, i) => (
                                          <option value={item.ibibo_code} key={i}>{item.name}</option>
                                        ))
                                      }
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </AccordianItem>
                          </Accordian>
                        </div>
                      </div>

                      <div style={{ marginTop: "30px" }}>
                        <Button disabled={this.state.activeAccordian === -1} onClick={this.handleSubmit}  icon="rightArrowWhite" primary>Pay now</Button>
                      </div>
                      {
                        this.state.selectedPaymentMethod === "card" &&
                        <form action="https://test.payu.in/_payment" method="post">
                          { this.getCardBankingForm() }
                          <input style={{ display: "none" }} ref={(node) => { this.submit = node }} type="submit" value="submit"></input>
                        </form>
                      }

                      {
                        this.state.selectedPaymentMethod === "net_banking" &&
                        <form action="https://test.payu.in/_payment" method="post">
                          { this.getNetBankingForm() }
                          <input style={{ display: "none" }} ref={(node) => { this.submit = node }} type="submit" value="submit"></input>
                        </form>
                      }
                    </div>

                    <div className="col">
                      <GiftCard amount={this.state.amount} />
                      <div className="gift-card-info">
                        <div>
                          <p className="os s6">To</p>
                          <p className="os s7">{this.state.receiver_name}<br /> +91 - {this.state.receiver_number}</p>
                        </div>
                        {
                          this.state.gift_message.length > 0 && 
                            <div style={{ marginTop: "20px", borderBottom: "1px solid #dfdfdf", paddingBottom: "20px" }}>
                              <p className="os s7">
                                <span className="os s6">Personal Message</span>
                                <p>{this.state.gift_message}</p>
                              </p>
                            </div>
                        }
                  
                        <div style={{ marginTop: "20px" }} >
                          <p className="os s6">From</p>
                          <p className="os s7">{this.state.senderName}<br /> +91 - {this.state.sender_num}</p>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            )
            : ""
        }
      </div>
    )
  }
}

export default Payment