import React from 'react'
import Icon from "Components/icon"
import "Sass/transaction-status.scss"
import Moment from "moment"
import GiftBasketItem from "./../GiftBasket/GiftBasketItem"

class SuccessfulTransaction extends React.Component {
  constructor(props) {
    super(props)
    this.modeMap = {
      "CC": "Credit Card",
      "DC": "Debit Card",
      "NB": "Netbanking"
    }
    this.state = {
      basket: [],
      amount_paid: "",
      paid_using: "",
      txnid: "",
      txn_time: "",
      receiver_name: "",
      receiver_num: "",
      message: ""
    }
  }

  componentDidMount() {
    localStorage.setItem("transaction--completed", true)
    const txn = window.__TXN__ || {}
    delete window.__TXN__
    const basket = JSON.parse(localStorage.getItem("basket")) || []
    const receiver = JSON.parse(localStorage.getItem("receiver_info")) || {}
    this.setState({
      basket,
      message: receiver.message,
      receiver_name: receiver.name,
      receiver_num: `+91 ${receiver.mobile}`,
      amount_paid: parseFloat(txn.net_amount_debit).toFixed(2),
      paid_using: txn.mode === "CC" || txn.mode === "DC" ? txn.cardnum.split("X").join("*") : this.modeMap[txn.mode],
      txnid: txn.txnid,
      txn_time: Moment(txn.addedon).format("DD/MM/YYYY, hh:mm A")
    })

    console.log("basket", basket)
    let cartDetails = basket.map((item) => {
      return ({
        productName: item.brand.brand_name,
        quantity: item.count,
        volume: item.sku.volume,
        promoApplied: this.state.promoCode ? this.state.promoCode : "",
      })
    })
    console.log("cart Details", cartDetails, localStorage.getItem("amount"))
    if (window.gtag) {
      gtag("event", "transaction_success", {
        "event_label": JSON.stringify({
          cartItems: cartDetails,
          totalToPay: parseFloat(txn.net_amount_debit).toFixed(2),
          date: Moment(new Date()).format("DD/MM/YYYY")
        })
      })
    }
  }

  render() {
    return (
      <div id="TransactionStatus">
        <div className="container">

          <div style={{ textAlign: "center", padding: "0 20px" }}>
            <span className="tick"><Icon name="success" /></span>
            <p style={{ fontWeight: "600" }} className="os s1">Transaction Successful!</p>
            <p style={{ marginTop: "10px" }} className="os s4">
              We’ve informed the recipient <br />
              about the gift card via SMS
            </p>
          </div>

          <div style={{ marginTop: "60px" }} className="row">
            <div className="col">
              <div className="paper gift--basket">
                <p style={{ paddingBottom: "12px" }} className="os s5">Drinks Gifted</p>
                {
                  this.state.basket.map(item => {
                    const arr = new Array(item.count).fill(1)
                    return arr.map((x, i) => (
                      <GiftBasketItem
                        readOnly
                        updateBasket={this.updateBasket}
                        key={i}
                        item={item}
                        count={item.count}
                      />
                    ))
                  })
                }
              </div>

              <div className="paper transaction--detail">
                <p style={{ paddingBottom: "12px" }} className="os s5 header">Transaction Details</p>
                <div>
                  <p className="os s7">Amount Paid</p>
                  <p className="os s7">Rs. {this.state.amount_paid}</p>
                </div>

                <div>
                  <p className="os s7">Paid Using</p>
                  <p className="os s7">{this.state.paid_using}</p>
                </div>

                <div>
                  <p className="os s7">Transaction ID</p>
                  <p className="os s7">{this.state.txnid}</p>
                </div>

                <div>
                  <p className="os s7">Transaction Date and Time</p>
                  <p className="os s7">{this.state.txn_time}</p>
                </div>
              </div>

              <div className="paper sent--to">
                <p style={{ paddingBottom: "12px" }} className="os s5 header">Sent To</p>
                <div>
                  <p className="os s7">{this.state.receiver_name}</p>
                  <p className="os s7">{this.state.receiver_num}</p>
                </div>

                {
                  this.state.message &&
                  <div>
                    <p className="os s7">Personal Message</p>
                    <p className="os s7">
                      {this.state.message}
                    </p>
                  </div>
                }
              </div>
            </div>

            <div className="col">
              <div className="what-next">
                <h2 className="os s1">Here's what you can do next</h2>

                <div className="note">
                  <div>
                    <Icon name="stepOne" />
                  </div>
                  <div>
                    <p className="os s3">
                      Inform your friend about the gift card via SMS
                    </p>
                    <p className="os s5">
                      For a more personalized experience, inform your friend about the gift card via personal message.
                    </p>
                  </div>
                </div>

                <div className="note">
                  <div>
                    <Icon name="stepTwo" />
                  </div>
                  <div>
                    <p className="os s3">
                      Download the HipBar app!
                    </p>
                    <p className="os s5">
                      Download the HipBar app to manage your gift cards on the go.
                    </p>
                  </div>
                </div>

                <div className="app-store-btn">
                  <a rel="noopener noreferrer" target="_blank" href="https://itunes.apple.com/in/app/hipbar-pay/id1297218847?mt=8"><Icon name="appStore" /></a>
                  <a rel="noopener noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=in.hipbar.hipbar_pay_app&hl=en"><Icon name="googleStore" /></a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default SuccessfulTransaction