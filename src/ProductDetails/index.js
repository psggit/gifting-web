import React from "react"
import "./sass/product-detail.scss"
import Icon from "Components/icon"
import SkuItem from "./SkuItem"
import Button from "Components/button"
import { fetchSKUUsingBrand } from "./../api"
import { capitalize } from "Utils/logic-utils"
import { getBasketTotal } from "./SkuItem"
import GiftMoreDrinks from "./../GiftMoreDrinks"

function getImageUrl(image) {
  return `https://api2.${process.env.BASE_URL}/get?fs_url=${image}`
}

class ProductDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brand: props.brand || null,
      basketCount: 0,
      viewProductsUrl: "",
      isProductAdded: false
    }

    this.setBasketCount = this.setBasketCount.bind(this)
    this.setBrandsUrl = this.setBrandsUrl.bind(this)
    this.toggleProductAdded = this.toggleProductAdded.bind(this)
  }
  componentDidMount() {
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info")) || {}
    const activeCity = window.__active_city__ || this.props.match.params.citySlug
    const activeGenre = window.__active_genre__ || this.props.match.params.genreSlug
    const isMobile = window.__isMobile__ || this.props.context.isMobile
    delete window.__isMobile__

    this.setState({ isMobile })

    receiverInfo.cityName = activeCity
    receiverInfo.genreName = activeGenre

    localStorage.setItem("receiver_info", JSON.stringify(receiverInfo))
    
    const basket = JSON.parse(localStorage.getItem("basket"))
    this.setState({ basketCount: basket ? getBasketTotal(basket) : 0 })
    const { params } = this.props.match  
    if (!this.state.brand){
      fetchSKUUsingBrand({
        cityName: capitalize(params.citySlug),
        genreShortName: params.genreSlug,
        brandShortName: params.brandSlug
      })
        .then(res => {
          this.setState({ brand: res.brand })
        })
    }

    this.setBrandsUrl()
  }

  toggleProductAdded() {
    this.setState({ isProductAdded: true })
  }

  setBrandsUrl() {
    const u = this.props.location.pathname.split("/")
    u.pop()
    this.setState({ viewProductsUrl: u.join("/") })
  }

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
              <a href={this.state.viewProductsUrl}>
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
                toggleProductAdded={this.toggleProductAdded}
                isMobile={this.state.isMobile}
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

          {/* <div className="paper gs1-code">
            <p className="os">GS1 Code</p>
            <div className="gs1-img">
              <div className="placeholder"></div>
              <img src={brand && brand.high_res_image} />
            </div>
          </div> */}

          <div className="paper about-hipbar">
            <p className="os heading">About HipBar</p>
            <div className="about--hipbar__content">
              <div>
                <p className="os s5">HipBar: Your One-Stop Destination for Gifting Drinks in India</p>
              </div>

              <div>
                <p className="os s5"><b>Cheers to a Digital future!</b></p>
                <p className="os s5">
                Founded with a vision to create a safe, transparent and responsible digital ecosystem, HipBar is here to help India drink wiser, one drink at a time.
                </p>
              </div>

              <div>
                <p className="os s5"><b>Gift Your Friends Drinks Online in a flash!</b></p>
                <p className="os s5">
                  <b>100% Cashless:&nbsp;</b>
                No tangible money/wallet needed to explore, buy, and gift drinks. Gift drinks effortlessly in just a few swipes. It's safe & secure!
                </p>
              </div>

              <div>
                <p className="os s5">
                  <b>Gift Drinks Online:&nbsp;</b>
                  For the first time in India, you can gift drinks to friends in just a few clicks!
                </p>
              </div>

              <div>
                <p className="os s5">
                  <b>Responsible:&nbsp;</b>
                  As an RBI-certified wallet, we are 100% compliant and strive to create a safer, more responsible drinking environment across India.
                </p>
              </div>

              <div>
                <p className="os s5">Personalize your gifts. Every celebration & occasion deserves a toast - Gift Drinks Online.</p>
              </div>

              <div>
                <p className="os s5">
                  <b>Our Partners:&nbsp;</b>
                  Beam Suntory
                  Bacardi
                  Carlsberg
                  Bira
                  Brown Forman
                  ABInBev
                  Diageo
                  Paul John

                </p>
              </div>

              <div>
                <p className="os s5">
                  <b>Our Products:&nbsp;</b>
                  Beam Suntory
                  Bacardi
                  Carlsberg
                  Bira
                  Brown Forman
                  ABInBev
                  Diageo
                  Paul John

                </p>
              </div>

            </div>
          </div>

          {/* <div className="paper add-to-basket">
            <Button iconAlignment="left" icon="giftBasket" primary>Add to gift basket</Button>
          </div> */}

          {
            this.state.isMobile && this.state.isProductAdded
              ? <div className="paper gift-more-drinks-paper">
                <GiftMoreDrinks url={this.state.viewProductsUrl} />
              </div>
              : ""
          }
        </div>
      </div>
    )
  }
}

export default ProductDetails