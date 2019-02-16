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
      basket: []
    }
  }

  componentDidMount() {
    const basket = JSON.parse(localStorage.getItem("basket"))
    const receiver = JSON.parse(localStorage.getItem("receiver_info"))
    this.setState({ basket, receiver })
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
                  <p className="os s7">Rs. 5150</p>
                </div>

                <div>
                  <p className="os s7">Paid Using</p>
                  <p className="os s7">Rs. 5150</p>
                </div>

                <div>
                  <p className="os s7">Transaction ID</p>
                  <p className="os s7">Rs. 5150</p>
                </div>

                <div>
                  <p className="os s7">Transaction Date and Time</p>
                  <p className="os s7">Rs. 5150</p>
                </div>
              </div>
              
              <div className="paper sent--to">
                <p style={{ borderBottom: "1px solid #dfdfdf", paddingBottom: "12px" }} className="os s5">Sent To</p>
                <div>
                  <p className="os s7">gautham bobby</p>
                  <p className="os s7">+91 8989415866</p>
                </div>

                <div>
                  <p className="os s7">Personal Message</p>
                  <p className="os s7">
                  Wish you Happy Valentine’s Day and Wish you Happy Valentine’s Day :)
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