import React from 'react'
import Header from "Components/header"
import Footer from "Components/footer"
import Icon from "Components/icon"
import 'Sass/transaction-status.scss'

class FailureTransaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: props.username ? props.username : "",
      isLoggedIn: props.isLoggedIn ? props.isLoggedIn : false
    }
  }

  componentWillReceiveProps(newProps) {
    //console.log("helo", newProps)
    if(this.props.username !== newProps.username || this.props.isLoggedIn !== newProps.isLoggedIn) {
      this.setState({username: newProps.username, isLoggedIn: newProps.isLoggedIn})
    }
  }

  render() {
    return (
      <div>
        <Header username={this.state.username} isLoggedIn={this.state.isLoggedIn}/>
        <div id="FailureTransaction" className="transaction-status fail"> 
          <div className="content">
            <div className="successful">
              <div className="header section">
                <Icon name="success" />
                <h2 className="cm s1 title">Transaction Failed!</h2>
                <p className="info">Don't worry! Money will be credited to your mode of payment in 5 - 7 working days</p>
              </div>
              <div className="body section">
                <p className="subheader">Transaction Details</p>
                <div className="section-content">
                  <span className="os s9">Amount Paid</span>
                  <p className="os s8">Rs. 499</p>
                </div>
                <div className="section-content">
                  <span className="os s9">Paid using</span>
                  <p className="os s8">3929****5993</p>
                </div>
                <div className="section-content">
                  <span className="os s9">Transaction ID</span>
                  <p className="os s8">#483293949304</p>
                </div>
                <div className="section-content">
                  <span className="os s9">Transaction Date and Time</span>
                  <p className="os s8">18/12/2018, 5.50 PM</p>
                </div>
              </div>
              <div className="footnote section">
                <p className="os s8">Please get in touch with out customer support team through chat for further support</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default FailureTransaction