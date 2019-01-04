import React from "react"
import Icon from "Components/icon"
import "./payment-status.scss"

class PaymentStatus extends React.Component {
  render() {
    return (
      <div id="payment-status">
        {
          this.props.status === "success" &&
          <div className="payment-status-container">
            <Icon name="success" />
            <p className="cm s4" >Payment recieved successfully!</p>
          </div>
        }
        {
          this.props.status === "failure" &&
          <div className="payment-status-container">
            <Icon name="failure" />
            <p className="cm s4" >Payment has failed!</p>
            <p className="os s7">
            If the money has been debited, it’ll be credited to
        the respective mode of payments 
        within 5 - 7 working days.
            </p>
          </div>
        }
      </div>
    )
  }
}

export default PaymentStatus