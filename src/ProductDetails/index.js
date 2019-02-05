import React from "react"
import PropTypes from "prop-types"
import "./sass/product-detail.scss"
import Icon from "Components/icon"
import SkuItem from "./SkuItem"
import Button from "Components/button"

class ProductDetaails extends React.Component {
  
  render() {
    return (
      <div id="product--details">
        <div className="container">
          <div className="paper price">
            
            <div className="header">
              <div>
                <Icon  name="back"/>
                <span style={{ marginLeft: "10px", fontWeight: "600", color: "#777" }} className="os s5">View Products</span>
              </div>

              <div>
                <Icon name="giftBasket" />
                <span className="os s5" style={{ marginLeft: "10px" }}>Gift Basket (0)</span>
              </div>
            </div>

            <div className="sku--container">
              <SkuItem brand={this.props.match.params.brandSlug} />
            </div>
            {/* <div className="skus">
              {
                this.renderSkuItems()
              }
              <div className="hr"></div>
            </div>

            <div className="total--price">
              <p className="os s2">MRP: <span className="os s0">Rs. 5190</span></p>
            </div> */}
          </div>

          <div className="paper about-drink">
            <p className="os">About this drink</p>
            <p className="os s3">
            Johnnie Walker is a brand of Scotch whisky now owned by Diageo that originated in the Scottish town of Kilmarnock, East Ayrshire. The brand was first established by grocer John Walker. It is the most widely distributed brand of blended Scotch whisky in the world, sold in almost every country, with annual sales of the equivalent of over 223.7 million 700 ml bottles in 2016 (156.6 million litres).
            </p>
          </div>

          <div className="paper gs1-code">
            <p className="os">GS1 Code</p>
            <div className="gs1-img">
              <div className="placeholder"></div>
              <img />
            </div>
          </div>

          <div className="paper add-to-basket">
            <Button primary>Add to gift basket</Button>
            {/* <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <Icon name="gift" />
                <p className="os s5">GIFT MORE DRINKS</p>
              </div>
              <Button primary icon="rightArrowWhite">Gift basket</Button>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetaails