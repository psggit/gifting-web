import React from "react"
import "./../sass/form.scss"
import "./payment.scss"
import Header from "Components/header"
import Footer from "Components/footer"
import Collapsible from "Components/collapsible"
import Button from "Components/button"

class Payment extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Header />
        <div id="checkout">
          <div className="container">
            <div className="col">
              <p style={{ borderBottom: "1px solid #c2c2c2", paddingBottom: "20px" }} className="os s5">To Pay: &#8377;499</p>
              <div className="payment-methods-wrapper">
                <p className="os s5">Payment Method</p>
                <p className="os s8">All transactions are secure and encrypted.</p>

                <div className="payment-methods-container">
                  <Collapsible title="Debit / Credit Cards" method="card_pay" >
                    <div className="form-group">
                      <label className="os">Card Number</label>
                      <input type="text" />
                    </div>

                    <div className="form-group" style={{ display: "flex" }}>
                      <div style={{ width: "130px" }}>
                        <label className="os">Expiry Date</label>
                        <input type="text" />
                      </div>

                      <div style={{ width: "130px", marginLeft: "30px" }}>
                        <label className="os">CVV</label>
                        <input type="text" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="os">Name on card</label>
                      <input type="text" />
                    </div>
                    
                  </Collapsible>

                  <Collapsible title="Netbanking" method="net_banking" >

                  </Collapsible>
                </div>
              </div>

              <div style={{ marginTop: "30px" }}>
                <Button primary>Pay now</Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Payment