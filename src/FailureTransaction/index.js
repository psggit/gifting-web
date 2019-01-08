import React from 'react'
import Icon from "Components/icon"
import 'Sass/transaction-status.scss'

class FailureTransaction extends React.Component {
  constructor(props) {
    super(props)
    this.modeMap = {
      "CC": "Credit Card",
      "DC": "Debit Card",
      "NB": "Netbanking"
    }
    // this.state = {
    //   username: props.username ? props.username : "",
    //   isLoggedIn: props.isLoggedIn ? props.isLoggedIn : false
    // }
  }

  // componentWillReceiveProps(newProps) {
  //   //console.log("helo", newProps)
  //   if(this.props.username !== newProps.username || this.props.isLoggedIn !== newProps.isLoggedIn) {
  //     this.setState({username: newProps.username, isLoggedIn: newProps.isLoggedIn})
  //   }
  // }

  render() {
    const { res } = this.props
    return (
      <div>
        <div id="FailureTransaction" className="transaction-status fail"> 
          <div className="content">
            <div className="successful">
              <div className="header section">
                <Icon name="failure" />
                <h2 className="cm s1 title">Transaction Failed!</h2>
                <p className="info">Don't worry! Money has been debited, it will be credited to your mode of payment in 5 - 7 working days</p>
              </div>
              <div className="body section">
                <p className="subheader">Transaction Details</p>
                <div className="section-content">
                  <span className="os s9">Amount Paid</span>
                  <p className="os s8">Rs. {res.net_amount_debit}</p>
                </div>
                <div className="section-content">
                  <span className="os s9">Paid using</span>
                  <p className="os s8">{ res.mode === "CC" || res.mode === "DC" ? res.cardnum : this.modeMap[res.mode] }</p>
                </div>
                <div className="section-content">
                  <span className="os s9">Transaction ID</span>
                  <p className="os s8">#{ res.txnid } </p>
                </div>
                <div className="section-content">
                  <span className="os s9">Transaction Date and Time</span>
                  <p className="os s8">{ res.addedon }</p>
                </div>
              </div>
              <div className="footnote section">
                <p className="os s8">Please get in touch with out customer support team through chat for further support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FailureTransaction