import React from 'react'
import './transaction-history.scss'
import * as Api from './../api'
import {transactiondata} from './mockdata'
import Header from "Components/header"
import Footer from "Components/footer"

class TransactionHistory extends React.Component {
  constructor() {
    super()
    this.state = {
      transactionData: [],
      loading: false
    }
    this.successCallback = this.successCallback.bind(this)
    this.failureCallback = this.failureCallback.bind(this)
  }

  componentDidMount() {
    this.fetchTransactionList()
  }

  fetchTransactionList() {
    const payload = {
      limit: 10,
      offset: 10
    }
    this.setState({loading: true})
    //Api.fetchTransactionList(payload, this.successCallback,  this.failureCallback)
    this.successCallback()
  }

  successCallback() {
    const data = transactiondata.data
    this.setState({transactionData: data, loading: false})
    //console.log("Transaction data", data)
  }

  failureCallback() {
    console.log("failure")
  }

  render() {
    const {transactionData, loading} = this.state
    return(
      <div>
        <Header />
        <div id="TransactionHistory"> 
          <div className="content">
            <h2 className="cm s1">Transaction History</h2>
            <div className="transaction-list">
              <div className="header">
                <h2 className="cm s2">GIFT CARDS SENT</h2>
              </div>
              <div>
                {
                  transactionData.map((item, i) => (
                    <div key={i} className="transaction-item">
                      <div className="item-header os s7">
                        <div className="item-subheader">
                          <p>
                            {item.receiver_name} | 
                          </p>
                          <p>
                            {item.receiver_no}
                          </p>
                        </div>
                        <p>{item.amount}</p>
                      </div>
                      <div className="item-body">
                        <div style={{display: 'flex', flexDirection: 'column', marginTop: '16px'}}>
                          <p className="os s9">
                            Gift Card ID
                          </p>
                          <span className="os s8">{item.order_id}</span>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', marginTop: '16px'}}>
                          <p className="os s9">Transaction Date & Time</p>
                          <span className="os s8">{item.created_at}</span>
                        </div>
                      </div>
                      <div className="item-footer">
                        <p className="os s9">Personal Message</p>
                        <p className="os s8">{item.personal_message}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default TransactionHistory