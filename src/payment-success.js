import React from "react"
import Icon from "Components/icon"
import "./payment-status.scss"

const PaymentSuccess = () => (
  <div id="payment-status">
    <div className="payment-status-container">
      <Icon name="success" />
      <p className="cm s4" >Payment recieved successfully!</p>
    </div>
  </div>
)

export default PaymentSuccess