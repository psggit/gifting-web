import React from 'react'
import Header from 'Components/header'
import Footer from "Components/footer"
import './retailOutlet.scss'
import FirstGiftCard from "Components/first-gift-card"

class RetailOutlet extends React.Component {
  constructor() {
    super()

    this.findRetailer = this.findRetailer.bind(this)
  }

  findRetailer() {
    console.log("find retailer")
  }

  render() {
    return (
      <div>
        <Header />
        <div id="retailOutlet">
          <div className="content">
            <h2 className="cm s1">Find a HipBar powered retailer near you</h2>
            <div style={{display: 'flex'}}>
              <select>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Mahe">Mahe</option>
              </select>
              <button className="btn btn-primary" onClick={() => this.findRetailer()}>FIND</button>
            </div>
            <div>

            </div>
          </div>
          <FirstGiftCard />
        </div>
        <Footer />
      </div>
    )
  }
}

export default RetailOutlet