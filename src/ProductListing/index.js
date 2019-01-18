import React from "react"
import "./listing.scss"
import Icon from "Components/icon"

class ProductListing extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="ProductListing">
        <div className="content">
          <div className="header">
            <div>
              <p className="os s8">Showing products in:</p>
              <select>
                <option>Bangalore</option>
                <option>Chennai</option>
                <option>Japan</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="Search for products" />
              <span><Icon name="plus" /></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductListing