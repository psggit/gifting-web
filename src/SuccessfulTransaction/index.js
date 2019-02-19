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

  componentWillUnmount() {
    localStorage.removeItem("basket")
    localStorage.removeItem("receiver_info")
    localStorage.removeItem("amount")
  }

  componentDidMount() {
    const txn = window.__TXN__
    delete window.__TXN__
    document.getElementById("ssr__script").innerHTML = ""
    const basket = JSON.parse(localStorage.getItem("basket"))
    const receiver = JSON.parse(localStorage.getItem("receiver_info"))
    this.setState({
      basket,
      message: receiver.message,
      receiver_name: receiver.name,
      receiver_num: `+91 ${receiver.mobile}`,
      amount_paid: parseFloat(txn.net_amount_debit).toFixed(),
      paid_using: txn.mode === "CC" || txn.mode === "DC" ? txn.cardnum : this.modeMap[txn.mode],
      txnid: txn.txnid,
      txn_time: Moment(txn.addedon).format("DD/MM/YYYY, hh:mm A")
    })
  }

  render() {
    return (
      <div id="TransactionStatus"> 
        <div className="container">

          <div style={{ textAlign: "center", padding: "0 20px" }}>
            <Icon name="success" />
            <p className="os s1">Transaction Successful!</p>
            <p style={{ marginTop: "10px" }} className="os s4">
              We’ve informed the recipient <br />
              about the gift card via SMS
            </p>
          </div>

          <div style={{ marginTop: "40px" }} className="row">
            <div className="col">
              <div className="paper gift--basket">
                <p style={{ borderBottom: "1px solid #dfdfdf", paddingBottom: "12px" }} className="os s5">Drinks Gifted</p>
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
            </div>

            <div className="col">
              <div className="paper transaction--detail">
                <p style={{ borderBottom: "1px solid #dfdfdf", paddingBottom: "12px" }} className="os s5">Transaction Details</p>
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
                <p style={{ borderBottom: "1px solid #dfdfdf", paddingBottom: "12px" }} className="os s5">Sent To</p>
                <div>
                  <p className="os s7">{this.state.receiver_name}</p>
                  <p className="os s7">{this.state.receiver_num}</p>
                </div>

                <div>
                  <p className="os s7">Personal Message</p>
                  <p className="os s7">
                    {this.state.message}
                  </p>
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