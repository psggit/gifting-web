import React from "react"
import "./sass/product-detail.scss"
import Icon from "Components/icon"
import SkuItem from "./SkuItem"
import Button from "Components/button"
import { fetchSKUUsingBrand } from "./../api"
import { capitalize } from "Utils/logic-utils"
import { getBasketTotal } from "./SkuItem"

class ProductDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brand: props.brand,
      basketCount: 0
    }
    // this.getBrandsUrl = this.getBrandsUrl.bind(this)
    this.setBasketCount = this.setBasketCount.bind(this)
  }
  componentDidMount() {
    const basket = JSON.parse(localStorage.getItem("basket"))
    this.setState({ basketCount: basket ? getBasketTotal(basket) : 0 })
    const { params } = this.props.match  
    // fetchSKUUsingBrand({
    //   cityName: capitalize(params.citySlug),
    //   genreShortName: params.genreSlug,
    //   brandShortName: params.brandSlug
    // })
    //   .then(res => {
    //     this.setState({ brand: res.brand })
    //   })
  }

  // getBrandsUrl() {
  //   const u = this.props.location.pathname.split("/")
  //   u.pop()
  //   return u.join("/")
  // }

  setBasketCount(basketCount) {
    console.log(basketCount)
    this.setState({ basketCount })
  }

  render() {
    const { brand } = this.state
    return (
      <div id="product--details">
        <div className="container">
          <div className="paper price">
            
            <div className="header">
              <a href="/">
                <Icon name="back"/>
                <span style={{ marginLeft: "10px", fontWeight: "600" }} className="os s5">View Products</span>
              </a>

              <a href="/basket">
                <Icon name="giftBasket" />
                <span className="os s5" style={{ marginLeft: "10px" }}>Gift Basket ({this.state.basketCount})</span>
              </a>
            </div>

            <div className="sku--container">
              <SkuItem
                setBasketCount={this.setBasketCount}
                brand={brand}
                volumes={brand ? brand.skus : []}
                name={brand ? brand.brand_name : ""}
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