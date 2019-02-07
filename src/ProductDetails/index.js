import React from "react"
import "./sass/product-detail.scss"
import Icon from "Components/icon"
import SkuItem from "./SkuItem"
import Button from "Components/button"
import GiftMoreDrinks from "Components/GiftMoreDrinks"
import PromoCodes from "./../PromoCodes"
import { fetchSKUUsingBrand } from "./../api"

class ProductDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      brand: null
    }
  }
  componentDidMount() {
    const { params } = this.props.match
    fetchSKUUsingBrand({
      cityName: params.citySlug,
      genreShortName: params.genreSlug,
      brandShortName: params.brandSlug
    })
      .then(res => {
        this.setState({ brand: res.brand })
      })
  }
  render() {
    const { brand } = this.state
    return (
      <div id="product--details">
        <div className="container">
          <div className="paper price">
            
            <div className="header">
              <div>
                <Icon  name="back"/>
                <span style={{ marginLeft: "10px", fontWeight: "600" }} className="os s5">View Products</span>
              </div>

              <div>
                <Icon name="giftBasket" />
                <span className="os s5" style={{ marginLeft: "10px" }}>Gift Basket (0)</span>
              </div>
            </div>

            <div className="sku--container">
              <SkuItem
                volumes={brand ? brand.skus : []}
                brand={brand ? brand.brand_name : ""}
                image={brand ? brand.high_res_image : ""}
              />
            </div>
          </div>

          <div className="paper about-drink">
            <p className="os">About this drink</p>
            <p className="os s5">
              { brand && brand.description }
            </p>
          </div>

          <div className="paper gs1-code">
            <p className="os">GS1 Code</p>
            <div className="gs1-img">
              <div className="placeholder"></div>
              <img src={brand && brand.high_res_image} />
            </div>
          </div>

          <div className="paper add-to-basket">
            <Button iconAlignment="left" icon="giftBasket" primary>Add to gift basket</Button>
          </div>

          <div className="paper gift-more-drinks-paper">
            {/* <GiftMoreDrinks /> */}
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetails