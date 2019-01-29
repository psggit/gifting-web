import React from "react"
import PropTypes from "prop-types"
import "./product-detail.scss"
import Icon from "Components/icon"
import BrandItem from "./../ProductListing/BrandsListItem"

const skus = [
  { volume: "1 Ltr"  },
  { volume: "750 ml" },
  { volume: "500 ml" },
  { volume: "350 ml" },
  { volume: "180 ml" },
  { volume: "90 ml" }
]

class ProductDetaails extends React.Component {
  renderSkuItems() {
    return skus.map((item, i) => (
      <input readOnly key={i} value={item.volume} className="os s3 sku--item" />
    ))
  }
  render() {
    return (
      <div id="product--details">
        <div className="container">
          <div className="paper">
            
            <div className="header">
              <Icon  name="back"/>
              <span style={{ marginLeft: "10px", fontWeight: "600", color: "#777" }} className="os s3">View Products</span>
            </div>

            <BrandItem  />
            <div className="skus">
              {
                this.renderSkuItems()
              }
              <div className="hr"></div>
            </div>

            <div className="total--price">
              <p className="os s2">MRP: <span className="os s0">Rs. 5190</span></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetaails