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

class Payment extends React.Component {
  constructor(props) {
    super(props)
    this.txn = JSON.parse(localStorage.getItem("txn"))
    this.paymentMethods = {
      1: "card",
      2: "net_banking"
    }
    this.state = {
      amount: this.txn ? this.txn.amount: "",
      popularBanks: [],
      banks: [],
      savedCards: [],
      activeAccordian: 1,
      isPopularSelected: false,
      noBankSelected: true,
      bankcode: "null",
      selectedPaymentMethod: null
    }
    this.getBanks = this.getBanks.bind(this)
    this.getSavedCards = this.getSavedCards.bind(this)
    this.setActiveAccordian = this.setActiveAccordian.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getNetBankingForm = this.getNetBankingForm.bind(this)
    this.getCardBankingForm = this.getCardBankingForm.bind(this)
  }

  componentWillMount() {
    if (!localStorage.getItem("txn")) {
      console.log("go back")
      this.props.history.goBack()
    }
  }

  componentDidMount() {
    this.getBanks()
  }
  
  getSavedCards() {
    GET({
      api: "/consumer/payment/cards",
      apiBase: "blogicUrl"
    })
      .then(json => {
        this.setState({ savedCards: json.data })
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
    this.setState({ selectedPaymentMethod: this.paymentMethods[this.state.activeAccordian] })
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
    const { ccnum, ccname, ccvv, ccexpyr, ccexpmon } = this.state
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
      ccnum,
      ccname,
      pg: "DC",
      ccvv,
      ccexpmon,
      ccexpyr,
      udf1: "web"
    }

    return Object.entries(postBody).map(([key, value]) => (
      <input type="hidden" name={key} value={value} />
    ))
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
                    <div className="col">
                      <p style={{ borderBottom: "1px solid #c2c2c2", paddingBottom: "20px" }} className="os s5">To Pay: &#8377;{this.state.amount}</p>
                      <div className="payment-methods-wrapper">
                        <p className="os s5">Payment Method</p>
                        <p className="os s8">All transactions are secure and encrypted.</p>

                        <div className="payment-methods-container">
                          <Accordian
                            // middleware={this.checkFormStatus}
                            setActiveAccordian={this.setActiveAccordian}
                            activeAccordian={this.state.activeAccordian}
                          >
                            <AccordianItem title="Debit Card" id={1}>
                              <div className="form-group">
                                <label className="os">Card Number</label>
                                <input onChange={this.handle} type="text" />
                              </div>

                              <div className="form-group" style={{ display: "flex" }}>
                                <div style={{ width: "130px" }}>
                                  <label className="os">Expiry Date</label>
                                  <input type="text" />
                                </div>

                                <div style={{ width: "130px", marginLeft: "30px" }}>
                                  <label className="os">CVV</label>
                                  <input type="text" />
                                </div>
                              </div>

                              <div className="form-group">
                                <label className="os">Name on card</label>
                                <input type="text" />
                              </div>
                            </AccordianItem>

                            <AccordianItem title="Net Banking" id={2}>
                              <div style={{ padding: "0 20px" }}>
                                <p style={{ fontWeight: "600", color: "#000", letterSpacing: "0.5px" }} className="os s8">Popular Banks</p>
                                <div ref={(node) => { this.radios = node}} style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
                                  {
                                    this.state.popularBanks.map((item, i) => (
                                      <div key={i} style={{ marginRight: "40px" }}>
                                        <input onChange={this.handleRadioChange}  value={item.ibibo_code} name="bank_code" id={`bank_${i}`} type="radio" />
                                        <label style={{ color: "#000", letterSpacing: "0.5px", marginLeft: "5px" }} className="os s8" htmlFor={`bank_${i}`}>{item.name}</label>
                                      </div>
                                    ))
                                  }
                                </div>
                                <div>                                  
                                  <div className="form-group">
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
                        <Button onClick={this.handleSubmit} primary>Pay now</Button>
                      </div>
                      {
                        this.state.selectedPaymentMethod === "card" &&
                        <form action='https://test.payu.in/_payment' method='post'>
                          { this.getCardBankingForm() }
                          <input type="submit" value="submit"></input>
                        </form>
                      }

                      {
                        this.state.selectedPaymentMethod === "net_banking" &&
                        <form action='https://test.payu.in/_payment' method='post'>
                          { this.getNetBankingForm() }
                          <input type="submit" value="submit"></input>
                        </form>
                      }
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