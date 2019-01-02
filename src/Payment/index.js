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
import MaskedInput from "react-text-mask"
import GiftCard from "Components/gift-card"

class Payment extends React.Component {
  constructor(props) {
    super(props)
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
        this.setState({ savedCards: Object.values(json.user_cards) })
      })
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

  handleRadioChange(e) {
    this.setState({ isPopularSelected: true, noBankSelected: false, bankcode: e.target.value })
  }

  handleSubmit() {
    if (this.state.activeAccordian !== 2) {
      this.setState({ selectedPaymentMethod: "card" }, () => {
        console.log("Processing card payment..")
        if (this.ccnum) {
          if (this.ccname.length && this.ccnum.length && this.ccvv.length && this.ccexp.length) {
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
        if (this.state.bankcode) {
          this.submit.click()
        }
      })
    }
  }

  handleCardNumberChange(e) {
    this.ccnum = e.target.value
  }

  handleCardExpiryChange(e) {
    this.ccexp = e.target.value
  }

  handleCVVChange(e) {
    this.ccvv = e.target.value
  }

  handleCardnameChange(e) {
    this.ccname = e.target.value
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
      surl: "http://localhost:8080/transaction?status=success",
      furl: "http://localhost:8080/transaction?status=failure",
      curl: "http://localhost:8080/transaction?status=cancelled",
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
      surl: "http://localhost:8080/transaction?status=success",
      furl: "http://localhost:8080/transaction?status=failure",
      curl: "http://localhost:8080/transaction?status=cancelled",
      hash: this.txn.hash,
      pg: "DC",
      ccname: this.ccname,
      ccvv: this.ccvv,
      ccexpmon: this.ccexp.split("/")[0],
      ccexpyr: this.ccexp.split("/")[1],
      udf1: "web"
    }

    if (this.ccnum) {
      postBody.ccnum = this.ccnum
    }

    if (this.cctoken) {
      postBody.cardtoken = this.cctoken
      postBody.cardbin = this.ccbin
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
      this.ccbin = this[`cardBin${id}`].name === "saved" ?  this[`cardBin${id}`].value : null
      this.ccnum = this[`cardNum${id}`].name === "saved" ? null : this[`cardNum${id}`].value
      this.ccname = this[`cardName${id}`].value
      this.cctoken = this[`cardToken${id}`].name === "saved" ? this[`cardToken${id}`].value : null
      this.ccvv = this[`cardCvv${id}`].value
      this.ccexp = this[`cardExp${id}`].value
      console.log(this)
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
                <Header />
                <div id="checkout">
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
                                <AccordianItem key={i+3} title={item.card_name} id={i+3}>
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
                                    <input ref={(node) => { this[`cardBin${i+3}`] = node }} name="saved" defaultValue={item.card_bin} type="hidden" />
                                  </div>

                                  <div className="form-group">
                                    {/* <label className="os">Name on card</label> */}
                                    <input ref={(node) => { this[`cardName${i+3}`] = node }} name="saved" defaultValue={item.name_on_card} type="hidden" />
                                  </div>
                                </AccordianItem>
                              ))
                            }

                            <AccordianItem key={1} title="Debit Card / Credit Card" id={1}>
                              <div className="form-group">
                                <label className="os">Card Number</label>
                                <MaskedInput
                                  guide={false}
                                  onChange={this.handleCardNumberChange}
                                  mask={[/\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/]}
                                />
                                {/* <input value={this.state.ccnum}  onChange={this.handleCardNumberChange} type="text" /> */}
                              </div>

                              <div className="form-group" style={{ display: "flex" }}>
                                <div style={{ width: "130px" }}>
                                  <label className="os">Expiry Date</label>
                                  <MaskedInput
                                    guide={false}
                                    onChange={this.handleCardExpiryChange}
                                    mask={[ /[0-1]/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                                  />
                                </div>

                                <div style={{ width: "130px", marginLeft: "30px" }}>
                                  <label className="os">CVV</label>
                                  <input onChange={this.handleCVVChange} type="password" maxLength={4} />
                                </div>
                              </div>

                              <div className="form-group">
                                <label className="os">Name on card</label>
                                <input onChange={this.handleCardnameChange} type="text" />
                              </div>
                            </AccordianItem>

                            <AccordianItem key={2} title="Net Banking" id={2}>
                              <div style={{ padding: "0 20px" }}>
                                <p style={{ fontWeight: "600", color: "#000", letterSpacing: "0.5px" }} className="os s8">Popular Banks</p>
                                <div ref={(node) => { this.radios = node}} style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
                                  {
                                    this.state.popularBanks.slice(0, 3).map((item, i) => (
                                      <div style={{ width: "120px", cursor: "pointer" }} key={i}>
                                        <input onChange={this.handleRadioChange}  value={item.ibibo_code} name="bank_code" id={item.ibibo_code} type="radio" />
                                        <label style={{ color: "#000", letterSpacing: "0.5px", marginLeft: "5px" }} className="os s8" htmlFor={item.ibibo_code}>{item.name}</label>
                                      </div>
                                    ))
                                  }

                                  {
                                    this.state.popularBanks.slice(3).map((item, i) => (
                                      <div style={{ width: "120px", cursor: "pointer" }} key={i}>
                                        <input onChange={this.handleRadioChange}  value={item.ibibo_code} name="bank_code" id={item.ibibo_code} type="radio" />
                                        <label style={{ color: "#000", letterSpacing: "0.5px", marginLeft: "5px" }} className="os s8" htmlFor={item.ibibo_code}>{item.name}</label>
                                      </div>
                                    ))
                                  }
                                </div>
                                <div>                                  
                                  <div style={{ marginTop: "20px" }} className="form-group">
                                    <p style={{ fontWeight: "600", color: "#000", letterSpacing: "0.5px" }} className="os s8">Other Banks</p>
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
                        <Button icon="fefe" onClick={this.handleSubmit} primary>Pay now</Button>
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
                  </div>
                </div>
                <Footer />
              </div>
            )
            : ""
        }
      </div>
    )
  }
}

export default Payment