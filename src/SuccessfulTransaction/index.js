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
      amount_paid: props.res ? props.res.net_amount_debit : "",
      paid_using: props.res ? (props.res.mode === "CC" || res.mode === "DC" ? props.res.cardnum : this.modeMap[props.res.mode]) : "",
      txnid: props.res ? props.res.txnid : "",
      txn_time: props.res ? props.res.addedon : "",
      receiver_name: "",
      receiver_num: "",
      message: ""
    }
  }

  componentDidMount() {
    const basket = JSON.parse(localStorage.getItem("basket"))
    const receiver = JSON.parse(localStorage.getItem("receiver_info"))
    this.setState({ basket, messge: receiver.message, receiver_name: receiver.name, receiver_num: receiver.mobile })
  }

  render() {
    // const { res } = this.props
    const res = {
      net_amount_debit: "",
      mode: "CC",
      txnid: "",
      addedon: "",
      receiver_name: "",
      receiver_num: "",
      message: ""
    }
    //console.log("response", res)
    return (
      <div id="TransactionStatus"> 
        <div className="container">

          <div style={{ textAlign: "center" }}>
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