import React from 'react'
import Icon from "Components/icon"
import "Sass/transaction-status.scss"
import Moment from "moment"

class FailureTransaction extends React.Component {
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
    localStorage.setItem("transaction--completed",true )
    const txn = window.__TXN__ || {}
    delete window.__TXN__
    const basket = JSON.parse(localStorage.getItem("basket")) || []
    const receiver = JSON.parse(localStorage.getItem("receiver_info")) || {}
    this.setState({
      basket,
      message: receiver.message,
      receiver_name: receiver.name,
      receiver_num: `+91 ${receiver.mobile}`,
      amount_paid: parseFloat(txn.amount).toFixed(2),
      paid_using: txn.mode === "CC" || txn.mode === "DC" ? (txn.cardnum ? txn.cardnum.split("X").join("*") : this.modeMap[txn.mode]) : this.modeMap[txn.mode],
      txnid: txn.txnid,
      txn_time: Moment(txn.addedon).format("DD/MM/YYYY, hh:mm A")
    })
  }

  render() {
    return (
      <div id="TransactionStatus"> 
        <div className="container">

          <div style={{ textAlign: "center", padding: "0 20px" }}>
            <span className="tick">
              <Icon name="failure" />
            </span>
            <p style={{ fontWeight: "600" }} className="os s1">Transaction Failed!</p>
            <p style={{ marginTop: "10px" }} className="os s4">
            Don't worry! If incorrectly debited, money will be <br /> refunded via your mode of payment within 5-7 working days
            </p>
          </div>

          <div className="paper transaction--detail-fail">
            <p style={{ paddingBottom: "12px" }} className="os s5 header">Transaction Details</p>
            <div>
              <p className="os s7">Amount Paid</p>
              <p className="os s7">&#8377; {this.state.amount_paid}</p>
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
          <p style={{ textAlign: "center", padding: "0 20px" }} className="os s4">
          Please get in touch with our customer support team<br />
through chat for further support
          </p>
        </div>
      </div>
    )
  }
}

export default FailureTransaction