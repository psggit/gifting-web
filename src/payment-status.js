import React from "react"
import Icon from "Components/icon"
import "./payment-status.scss"

class PaymentStatus extends React.Component {
  componentDidMount() {
    const status = location.search.slice(1).split("=")[1]
    setTimeout(() => {
      location.href = status === "success" ? "/transaction-successful" : "/transaction-failure"
    }, 3000)
  }
  render() {
    localStorage.removeItem("txn")
    return (
      <div id="payment-status">
        {
          location.search.slice(1).split("=")[1] === "success" &&
          <div className="payment-status-container">
            <Icon name="success" />
            <p className="cm s4" >Payment recieved successfully!</p>
          </div>
        }
        {
          location.search.slice(1).split("=")[1] === "failure" &&
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