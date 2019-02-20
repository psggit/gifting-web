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
import { GET, POST } from "Utils/fetch"
import GiftCard from "Components/gift-card"
import Icon from "Components/icon"
import InputMask from "react-input-mask"
import Moment from "moment"

// const cardNumMask = new IMask()

class Payment extends React.Component {
  constructor(props) {
    super(props)
    // console.log(this.props.history.location.state)
    this.receiverInfo = JSON.parse(localStorage.getItem("receiver_info"))
    // localStorage.removeItem("gift")
    // this.txn = JSON.parse(localStorage.getItem("txn"))
    this.paymentMethods = {
      1: "card",
      2: "net_banking"
    }
    this.state = {
      isSubmitting: false,
      senderName: localStorage.getItem("sender_name"),
      sender_num: "",
      gift_message: this.receiverInfo ? this.receiverInfo.message : "",
      receiver_name: this.receiverInfo ? this.receiverInfo.name : "",
      receiver_number: this.receiverInfo ? this.receiverInfo.phone : "",
      amount: localStorage.getItem("amount") ? localStorage.getItem("amount") : "",
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
      savedccvv: "",
      cctoken: "",
      store_card: false,
      selectedPaymentMethod: null,
      ccexpErr: {
        status: false,
        value: ""
      },
      ccNameErr: {
        status: false,
        value: ""
      },
      ccNumErr: {
        status: false,
        value: ""
      },
      ccvvErr: {
        status: false,
        value: ""
      },
      savedccvvErr: {
        status: false,
        value: ""
      }
      // username: props.username ? props.username : "",
      // isLoggedIn: props.isLoggedIn ? props.isLoggedIn : false
    }
    this.hasTransactionCreated = false
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
    this.handleCVVChange = this.handleCVVChange.bind(this)
    this.handleCardnameChange = this.handleCardnameChange.bind(this)
    this.setCardValues = this.setCardValues.bind(this)
    this.toggleHowTo = this.toggleHowTo.bind(this)
    this.handleSaveCard = this.handleSaveCard.bind(this)
    this.isNormalCardDetailsValid = this.isNormalCardDetailsValid.bind(this)
    this.createTransaction = this.createTransaction.bind(this)
    // this.getButtonStatus = this.getButtonStatus.bind(this)
  }

  componentWillMount() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    if (!localStorage.getItem("receiver_info")) {
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
    const { store_card } = this.state;
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

  isNormalCardDetailsValid() {
    const ccexp = this.state.ccexp.split(" ").join("")

    console.log(ccexp)

    const ccexpErr = {
      status: false,
      value: ""
    }
    const re = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/

    if (!re.test(ccexp)) {
      ccexpErr.status = true
      ccexpErr.value = "Invalid expiry date"
      this.setState({ ccexpErr })
    }

    const ccNameErr = {
      status: false,
      value: ""
    }
    //console.log(this.state.ccname.length, this.state.ccnum.length,this.state.ccvv.length)
    if (this.state.ccname.length === 0) {
      ccNameErr.status = true,
        ccNameErr.value = "Card name is required"
      this.setState({ ccNameErr })
    }

    const ccNumErr = {
      status: false,
      value: ""
    }

    if (this.state.ccnum.length === 0) {
      ccNumErr.status = true,
        ccNumErr.value = "Card number is required"
      this.setState({ ccNumErr })
    }

    const ccvvErr = {
      status: false,
      value: ""
    }

    if (this.state.ccvv.length < 3) {
      ccvvErr.status = true,
        ccvvErr.value = "cvv is required"
      this.setState({ ccvvErr })
    }
    //console.log(!ccNameErr.status && !ccNumErr.status && !ccvvErr.status && !ccexpErr.status)
    if (!ccNameErr.status && !ccNumErr.status && !ccvvErr.status && !ccexpErr.status) {
      return true
    }
    return false
  }

  isSavedCardDetailsValid() {

    const savedccvvErr = {
      status: false,
      value: ""
    }

    if (this.state.savedccvv.length < 3) {
      savedccvvErr.status = true,
        savedccvvErr.value = "cvv is required"
      this.setState({ savedccvvErr })
    }
    //console.log(!ccNameErr.status && !ccNumErr.status && !ccvvErr.status && !ccexpErr.status)
    if (!savedccvvErr.status) {
      return true
    }
    return false
  }

  handleSubmit() {
    const { amount, gift_message, receiver_number, senderName, receiver_name } = this.state
    if (this.state.activeAccordian === 1) {
        if (this.isNormalCardDetailsValid()) {
          console.log("Processing normal card payment..")
          this.createTransaction(amount, gift_message, receiver_number, senderName, receiver_name, () => {
            this.setState({ selectedPaymentMethod: "card" }, () => {
              this.submit.click()
            })
          })
        }
    } else if (this.state.activeAccordian === 2) {
      if (this.state.bankcode !== "null") {
        console.log("Processing net banking..")
        this.createTransaction(amount, gift_message, receiver_number, senderName, receiver_name, () => {
          this.setState({ selectedPaymentMethod: "net_banking" }, () => {
            this.submit.click()
          })
        })
      }
    } else {
      if (this.isSavedCardDetailsValid()) {
        console.log("Processing saved card payment..")
        this.createTransaction(amount, gift_message, receiver_number, senderName, receiver_name, () => {
          this.setState({ selectedPaymentMethod: "card" }, () => {
            // this.submit.click()
          })
        })
      }
    }
  }

  toggleHowTo() {
    this.setState({ isActive: !this.state.isActive })
  }

  handleCardNumberChange(e) {
    //this.setState({ ccnum: e.target.value })
    this.setState({
      ccnum: e.target.value,
      ccNumErr: {
        status: false,
        value: ""
      }
    })
  }

  handleCardExpiryChange(e) {
    this.setState({
      ccexp: e.target.value,
      ccexpErr: {
        status: false,
        value: ""
      }
    })
  }

  handleCVVChange(e) {
    if (e.target.name === "saved") {
      //this.setState({ savedccvv: e.target.value })
      this.setState({
        savedccvv: e.target.value,
        savedccvvErr: {
          status: false,
          value: ""
        }
      })
    } else {
      this.setState({
        ccvv: e.target.value,
        ccvvErr: {
          status: false,
          value: ""
        }
      })
    }
  }

  handleCardnameChange(e) {
    //this.setState({ ccname: e.target.value })
    this.setState({
      ccname: e.target.value,
      ccNameErr: {
        status: false,
        value: ""
      }
    })
  }

  createTransaction(amount, giftMessage, receiverNumber, senderName, receiverName, CB) {
    this.setState({ isSubmitting: true })
    const basket = JSON.parse(localStorage.getItem("basket"))
    const products = basket.map(item => {
      return {
        count: item.count,
        product_id: item.sku.sku_pricing_id,
        type: "normal"
      }
    })
    POST({
      api: "/consumer/payment/gift/create",
      apiBase: "orderman",
      data: {
        amount: parseFloat(amount),
        mode: "gift",
        promo_code: localStorage.getItem("promo_code"),
        gift_message: giftMessage,
        receiver_number: receiverNumber,
        sender_name: senderName,
        device: "web",
        receiver_name: receiverName,
        products
      },
      handleError: true
    })
      .then((json) => {
        this.txn = {
          amount: json.amount,
          txnid: json.txnid,
          hash: json.hash,
          key: json.key,
          user_cred: json.user_cred,
          email: json.email,
          first_name: json.first_name,
          // sender_name: senderName,
          // sender_num: this.state.senderNumber,
          // gift_message: giftMessage,
          // receiver_name: receiverName,
          // receiver_num: receiverNumber
        }
        CB()

        
        // localStorage.setItem("txn", JSON.stringify(this.postBody))
        // this.props.history.push("/checkout", this.postBody)
        // location.href = "/checkout"
        // this.setState({ canProceed: true }, () => {
        //   this.submit.click()
        // })
      })
      .catch((err) => {
        this.setState({ isSubmitting: false })
      })
  }

  getNetBankingForm() {  
    // if (this.state.hasTransactionCreated) {
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
        surl: `${location.origin}/transaction-successful`,
        furl: `${location.origin}/transaction-failure`,
        curl: `${location.origin}/transaction-cancelled`,
        hash: this.txn.hash,
        pg: "NB",
        bankcode,
        udf1: "web"
      }

      return Object.entries(postBody).map(([key, value]) => (
        <input type="hidden" name={key} value={value} />
      ))
    // }
    // sender_num: this.state.senderNumber,
    // gift_message: giftMessage,
    // receiver_name: receiverName,
    // receiver_number: receiverNumber
  }

  getCardBankingForm() {
    // if (this.state.hasTransactionCreated) {
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
        // ccvv: this.state.ccvv,
        ccexpmon: this.state.ccexp.split("/")[0],
        ccexpyr: this.state.ccexp.split("/")[1],
        user_credentials: this.txn.user_cred,
        udf1: "web"
      }
  
      if (this.state.ccnum.length) {
        postBody.ccnum = this.state.ccnum.split(" ").join("")
        postBody.ccvv = this.state.ccvv
      }
  
      if (this.state.store_card) {
        postBody.store_card = 1
      }
  
      if (this.state.cctoken.length) {
        postBody.ccvv = this.state.savedccvv
        postBody.store_card_token = this.state.cctoken
      }
  
      return Object.entries(postBody).map(([key, value]) => (
        <input type="hidden" name={key} value={value} />
      ))
    // }
  }

  setCardValues(id) {
    if (parseInt(id) < 3) {
      this.setState({ cctoken: "" })
      return true
    } else {
      // console.log(this[`cardToken${id}`].name)
      const ccnum = this[`cardNum${id}`].name === "saved" ? "" : this[`cardNum${id}`].value
      const ccname = this[`cardName${id}`].value
      const cctoken = this[`cardToken${id}`].name === "saved" ? this[`cardToken${id}`].value : ""
      const ccexp = this[`cardExp${id}`].value
      this.setState({ ccnum, ccname, cctoken, ccexp })
      return true
    }
  }

  handleBackClick() {
    location.href="/personalise"
  }

  render() {
    return (
      <div>
        {
          localStorage.getItem("receiver_info")
            ? (
              <div id="checkout">
                <div className="container">
                  <div className="paper">
                    <div className="row">
                    <div
                    style={{
                      borderBottom: "1px solid #dfdfdf",
                      paddingBottom: "12px"
                    }}
                  >
                    <a href="/personalise">
                      <Icon name="back"/>
                      <span style={{ marginLeft: "10px", fontWeight: "600" }} className="os s5">Peronsalise</span>
                    </a>
                  </div>

                    <p style={{ marginTop: "20px", borderBottom: "1px solid #c2c2c2", paddingBottom: "20px" }} className="os s5">To Pay: &#8377;{localStorage.getItem("amount")}</p>
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
                              <AccordianItem key={i + 3} title={item.card_name} id={i + 3} showRadioButton={true}>
                                <div className="form-group">
                                  <label className="os">Card Number</label>
                                  <input ref={(node) => { this[`cardNum${i + 3}`] = node }} name="saved" defaultValue={item.card_no} disabled type="text" />
                                </div>

                                <div className="form-group">
                                  <div style={{ width: "130px" }}>
                                    {/* <label className="os">Expiry Date</label> */}
                                    <input ref={(node) => { this[`cardExp${i + 3}`] = node }} name="saved" defaultValue={`${item.expiry_month}/${item.expiry_year}`} type="hidden" maxLength={4} />
                                  </div>

                                  <div style={{ width: "130px", position: "relative" }}>
                                    <label className="os">CVV</label>
                                    <input onChange={this.handleCVVChange} ref={(node) => { this[`cardCvv${i + 3}`] = node }} name="saved" type="password" maxLength={4} />
                                    <div style={{ position: "absolute", top: 0, left: 0 }}></div>
                                  </div>
                                  {
                                    this.state.savedccvvErr.status &&
                                    <p className="error-message os s9">{this.state.savedccvvErr.value}</p>
                                  }
                                </div>

                                <div className="form-group">
                                  {/* <label className="os">Name on card</label> */}
                                  <input ref={(node) => { this[`cardToken${i + 3}`] = node }} name="saved" defaultValue={item.card_token} type="hidden" />
                                </div>

                                <div className="form-group">
                                  {/* <label className="os">Name on card</label> */}
                                  <input ref={(node) => { this[`cardName${i + 3}`] = node }} name="saved" defaultValue={item.name_on_card} type="hidden" />
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
                              {
                                this.state.ccNumErr.status &&
                                <p className="error-message os s9">{this.state.ccNumErr.value}</p>
                              }
                            </div>

                            <div className="form-group" style={{ display: "flex" }}>
                              <div style={{ width: "130px" }}>
                                <label className="os">Expiry Date</label>
                                <InputMask
                                  value={this.state.ccexpyr}
                                  mask="99 / 9999"
                                  maskChar={null}
                                  onChange={this.handleCardExpiryChange}
                                />
                                {
                                  this.state.ccexpErr.status &&
                                  <p className="error-message os s9">{this.state.ccexpErr.value}</p>
                                }
                              </div>

                              <div style={{ width: "130px", marginLeft: "30px" }}>
                                <label className="os">CVV</label>
                                <InputMask mask="9999" maskChar={null} className="cvv--input" value={this.state.ccvv} onChange={this.handleCVVChange} type="password" />
                                {
                                  this.state.ccvvErr.status &&
                                  <p className="error-message os s9">{this.state.ccvvErr.value}</p>
                                }
                              </div>
                            </div>

                            <div className="form-group">
                              <label className="os">Name on card</label>
                              <input value={this.state.ccname} onBlur={(e) => { this.setState({ ccname: this.state.ccname.trim() }) }} onChange={this.handleCardnameChange} type="text" />
                              {
                                this.state.ccNameErr.status &&
                                <p className="error-message os s9">{this.state.ccNameErr.value}</p>
                              }
                            </div>
                          </AccordianItem>

                          <AccordianItem key={2} title="Net Banking" id={2} showRadioButton={true}>
                            <div style={{ padding: "0 20px" }}>
                              <p style={{ fontWeight: "bold", color: "#000", letterSpacing: "0.5px" }} className="os s8">Popular Banks</p>
                              <div ref={(node) => { this.radios = node }} style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
                                {
                                  this.state.popularBanks.slice(0, 3).map((item, i) => (
                                    <div style={{ width: "120px", cursor: "pointer" }} key={i}>
                                      {/* <input onChange={this.handleRadioChange}  value={item.ibibo_code} name="bank_code" id={item.ibibo_code} type="radio" />

                                    <label style={{ color: "#000", letterSpacing: "0.5px", marginLeft: "5px" }} className="os s8" htmlFor={item.ibibo_code}>{item.name}</label> */}
                                      <div onClick={() => this.handleRadioChange(item.ibibo_code)} style={{ marginBottom: '10px' }}>
                                        <span style={{ marginRight: '10px', verticalAlign: "middle" }}>
                                          {
                                            this.state.bankcode === item.ibibo_code
                                              ? <Icon name="filledCircle" />
                                              : <Icon name="circle" />
                                          }
                                        </span>
                                        <span style={{ color: "#000", letterSpacing: "0.5px", marginLeft: "5px", verticalAlign: "middle" }} className="os s8">{item.name}</span>
                                      </div>
                                    </div>
                                  ))
                                }

                                {
                                  this.state.popularBanks.slice(3).map((item, i) => (
                                    <div style={{ width: "120px", cursor: "pointer" }} key={i}>
                                      {/* <input onChange={this.handleRadioChange}  value={item.ibibo_code} name="bank_code" id={item.ibibo_code} type="radio" />
                                    <label style={{ color: "#000", letterSpacing: "0.5px", marginLeft: "5px" }} className="os s8" htmlFor={item.ibibo_code}>{item.name}</label> */}
                                      <div onClick={() => this.handleRadioChange(item.ibibo_code)} style={{ marginBottom: '10px' }}>
                                        <span style={{ marginRight: '10px', verticalAlign: "middle" }}>
                                          {
                                            this.state.bankcode === item.ibibo_code
                                              ? <Icon name="filledCircle" />
                                              : <Icon name="circle" />
                                          }
                                        </span>
                                        <span style={{ color: "#000", letterSpacing: "0.5px", marginLeft: "5px", verticalAlign: "middle" }} className="os s8">{item.name}</span>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                              <div>
                                <div style={{ marginTop: "20px" }} className="form-group">
                                  <p style={{ fontWeight: "bold", color: "#000", letterSpacing: "0.5px" }} className="os s8">Other Banks</p>
                                  <select value={this.state.bankcode} onChange={this.handleSelectChange} style={{ marginTop: "15px", width: "100%" }}>
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

                    <div style={{ marginTop: "30px" }} className="final-payment-button">
                      <Button style={{textTransform: 'none'}} disabled={this.state.activeAccordian === -1 || this.state.isSubmitting} onClick={this.handleSubmit} icon="rightArrowWhite" primary>PAY Rs. {this.state.amount}</Button>
                    </div>
                    {
                        this.state.selectedPaymentMethod === "card" &&
                      <form action={`https://${process.env.PAYU_BASE}.payu.in/_payment`} method="post">
                        {this.getCardBankingForm()}
                        <input style={{ display: "none" }} ref={(node) => { this.submit = node }} type="submit" value="submit"></input>
                      </form>
                    }

                    {
                      this.state.selectedPaymentMethod === "net_banking" &&
                      <form action={`https://${process.env.PAYU_BASE}.payu.in/_payment`} method="post">
                        {this.getNetBankingForm()}
                        <input style={{ display: "none" }} ref={(node) => { this.submit = node }} type="submit" value="submit"></input>
                      </form>
                    }
                    </div>
                  </div>
                </div>
                {/* <div className="final-payment-button mobile">
                  <Button style={{textTransform: 'none'}} disabled={this.state.activeAccordian === -1 || this.state.isSubmitting} onClick={this.handleSubmit} icon="rightArrowWhite" primary>PAY Rs. {this.state.amount}</Button>
                </div> */}
              </div>
            )
            : ""
        }
        <Footer />
      </div>
    )
  }
}

export default Payment