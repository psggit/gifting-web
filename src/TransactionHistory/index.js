import React from 'react'
import './transaction-history.scss'
import * as Api from './../api'
//import {transactiondata} from './mockdata'
import Header from "Components/header"
import Footer from "Components/footer"

class TransactionHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transactionData: [],
      loading: false,
      // username: props.username ? props.username : "",
      isLoggedIn: this.props.paramObj ? this.props.paramObj.isLoggedIn : ""
    }
    this.successCallback = this.successCallback.bind(this)
    this.failureCallback = this.failureCallback.bind(this)
    this.renderTransation =  this.renderTransation.bind(this)
    this.showTransactions = this.showTransactions.bind(this)
  }

  componentDidMount() {
    if(this.props.paramObj && this.props.paramObj.isLoggedIn) {
      this.showTransactions()
    }
  }

  showTransactions() {
    if(!this.props.paramObj.isLoggedIn) {
      this.props.history.goBack()
    } else {
      this.fetchTransactionList()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.paramObj.isLoggedIn !== this.props.paramObj.isLoggedIn ) {
      this.showTransactions()
      this.setState({isLoggedIn: this.props.paramObj.isLoggedIn})
    }
  }

  fetchTransactionList() {
    const payload = {
      limit: 1000,
      offset: 0
    }
    this.setState({loading: true})
    Api.fetchTransactionList(payload, this.successCallback,  this.failureCallback)
    //this.successCallback()
  }

  successCallback(transactiondata) {
    //const data = []
    const data = transactiondata.order_detail
    this.setState({transactionData: data, loading: false})
    //console.log("Transaction data", data)
  }

  failureCallback() {
    //console.log("failure")
    this.setState({transactionData: [], loading: false})
  }

  renderTransation() {
    const {transactionData} = this.state;
    return transactionData.map((item, i) => (
      <div key={i} className="transaction-item">
        <div className="item-header os s7">
          <div className="item-subheader">
            <p>{item.receiver_name} | </p>
            <p>
              {item.receiver_mobile}
            </p>
          </div>
          <p>{item.gift_card_amount}</p>
        </div>
        <div className="item-body">
          <div style={{display: 'flex', flexDirection: 'column', marginTop: '16px', marginRight: '16px'}}>
            <p className="os s9">
              Gift Card ID
            </p>
            <span className="os s8">{item.gift_card_number}</span>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', marginTop: '16px', marginRight: '16px'}}>
            <p className="os s9">Transaction Date & Time</p>
            <span className="os s8">{item.gifted_on}</span>
          </div>
        </div>
        <div className="item-footer">
          <p className="os s9">Personal Message</p>
          <p className="os s8">{item.personal_message}</p>
        </div>
      </div>
    ))
  }

  render() {
    const {transactionData, loading, isLoggedIn} = this.state
    //console.log("username", this.state.username, "logged in", this.state.isLoggedIn)
    return(
      <div>
        <Header />
        <div id="TransactionHistory"> 
          <div className="content">
            <h2 className="cm s1">Transaction History</h2>
            {
              !loading && transactionData.length === 0 && isLoggedIn &&
              <p className="note os s8">No transactions found</p>
            }
            {
              loading &&
              <p className="note os s8">Loading...</p>
            }
            {
              !loading && transactionData.length > 0 && 
                <div className="transaction-list">
                  <div>
                    <div className="header">
                      <h2 className="os s2">GIFT CARDS SENT</h2>
                    </div>
                    {
                      this.renderTransation()
                    }
                  </div>
                </div>
            }
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default TransactionHistory