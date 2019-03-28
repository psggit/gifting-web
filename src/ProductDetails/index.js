import React from "react"
import "./sass/product-detail.scss"
import Icon from "Components/icon"
import SkuItem from "./SkuItem"
import Button from "Components/button"
import { fetchSKUUsingBrand } from "./../api"
import { capitalize } from "Utils/logic-utils"
import { getBasketTotal } from "./SkuItem"
import GiftMoreDrinks from "./../GiftMoreDrinks"
import Moment from "moment"

function getImageUrl(image) {
  return `https://api2.${process.env.BASE_URL}/get?fs_url=${image}`
}

class ProductDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brand: null,
      basketCount: 0,
      viewProductsUrl: "",
      isProductAdded: false
    }

    this.setBasketCount = this.setBasketCount.bind(this)
    this.setBrandsUrl = this.setBrandsUrl.bind(this)
    this.toggleProductAdded = this.toggleProductAdded.bind(this)
  }
  componentDidMount() {
    console.log("product", params)
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info")) || {}
    const brand = window.BRAND_STATE || null
    const activeCity = window.__active_city__ || this.props.match.params.citySlug
    const activeGenre = window.__active_genre__ || this.props.match.params.genreSlug
    const isMobile = window.__isMobile__ || this.props.context.isMobile
    delete window.__isMobile__
    delete window.BRAND_STATE

    this.setState({ isMobile, brand })

    receiverInfo.cityName = activeCity
    receiverInfo.genreName = activeGenre

    localStorage.setItem("receiver_info", JSON.stringify(receiverInfo))
    
    const basket = JSON.parse(localStorage.getItem("basket"))
    this.setState({ basketCount: basket ? getBasketTotal(basket) : 0 })
    const { params } = this.props.match  
    if (!brand){
      fetchSKUUsingBrand({
        cityName: capitalize(params.citySlug),
        genreShortName: params.genreSlug,
        brandShortName: params.brandSlug
      })
        .then(res => {
          this.setState({ brand: res.brand })
        })
    }
    const gaObject = {
      brand: params.brandSlug,
      genre: params.genreSlug,
      city: params.citySlug,
      date: Moment(new Date()).format("DD/MM/YYYY")
    }
    if(window.gtag) {
      gtag("event", "view_product", {
        "event_label": JSON.stringify(gaObject),
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
    console.log(basketCount, this.state.brand)
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
                <span style={{ marginLeft: "10px" }} className="os s5">View Drink(s)</span>
              </a>

              <a href="/basket">
                <Icon name="giftBasket" />
                <span className="os s5" style={{ marginLeft: "10px" }}>Gift Basket ({this.state.basketCount})</span>
              </a>
            </div>

            <div className="sku--container">
              <SkuItem
                viewProductsUrl={this.state.viewProductsUrl}
                toggleProductAdded={this.toggleProductAdded}
                isMobile={this.state.isMobile}
                setBasketCount={this.setBasketCount}
                brand={brand}
                volumes={brand ? brand.skus : []}
                name={brand ? brand.brand_name : ""}
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
                  You don't need to carry your wallet anymore. Gift a drink in just a few clicks with the built-in RBI authorised digital wallet. It's safe and secure!
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
                <p className="os s5">
                Gifting never goes out of fashion. Make every moment memorable with HipBar Gifting. Gift a drink now!
                </p>
              </div>


              <div>
                <p className="os s5">
                  <b>Our Partners:&nbsp;</b>
                  Beam Suntory,
                  Bacardi,
                  Carlsberg,
                  Bira,
                  Brown Forman,
                  ABInBev,
                  Diageo,
                  Paul John

                </p>
              </div>

              <div>
                <p className="os s5"><b>Available products</b></p>
                <p className="os s5">
                  <b>Beer:&nbsp;</b>
                  Budweiser,
                  Leffe (Pint),
                  Stella Artois (Pint),
                  Hoegaarden (Pint),
                  Corona Extra (Pint),
                  Budweiser (Can),
                  Bira 91 White (Can),
                  Bira 91 Blonde (Can),
                  Bira 91 White,
                  Bira 91 Blonde,
                  Budweiser Magnum
                </p>
              </div>

              <div>
                <p className="os s5">
                  <b>Domestic Whiskey:&nbsp;</b>
                  VAT 69,
                  Black & White,
                  Black Dog Triple Gold Reserve,
                  Signature Rare Aged,
                  Antiquity Blue,
                  Royal Challenge,
                  Signature Premier,
                  Black Dog Black Reserve,
                  McDowell’s No.1 Reserve Whisky,
                  Black & White 12,
                  McDowell’s No.1 Luxury Premium Whisky,
                  TI Mansion House Premium Whisky
                </p>
              </div>

              <div>
                <p className="os s5">
                  <b>Imported Whiskey:&nbsp;</b>
                  Johnnie Walker Red Label,
                  Johnnie Walker Black Label,
                  Johnnie Walker Double Black,
                  J&B Rare,
                  Johnnie Walker Platinum Label 18 Year Old,
                  Johnnie Walker Gold Label Reserve,
                  Johnnie Walker Green Label
                </p>
              </div>

              <div>
                <p className="os s5">
                  <b>Single Malt Whiskey:&nbsp;</b>
                  Talisker 10 Year Old,
                  The Singleton of Glen Ord 12 Year Old,
                  Paul John Brilliance,
                  Paul John Edited,
                  Paul John Bold,
                  Glenkinchie Single Malt Whisky 12 Year Old
                </p>
              </div>

              <div>
                <p className="os s5">
                  <b>Rum:&nbsp;</b>
                  Captain Morgan The Original Rum
                </p>
              </div>

              <div>
                <p className="os s5">
                  <b>Domestic Wine:&nbsp;</b>
                  Big Banyan Cabernet Sauvignon,
                  Big Banyan Shiraz,
                  Big Banyan Chenin Blanc,
                  Big Banyan Sauvignon Blanc,
                  Big Banyan Rosa Rossa,
                  Big Banyan Merlot,
                  Big Banyan Chardonnay,
                  Ampersand White Wine,
                  Ampersand Red Wine,
                  Big Banyan Limited Shiraz,
                  Big Banyan Bellissima
                </p>
              </div>

              <div>
                <p className="os s5">
                  <b>Vodka:&nbsp;</b>
                  Smirnoff Red,
                  Ciroc,
                  Ketel One,
                  Resolute Pink Vodka,
                  Resolute Black Vodka,
                  Smirnoff Green Apple,
                  Smirnoff Orange,
                  Smirnoff Espresso,
                  Smirnoff Vanilla
                </p>
              </div>

              <div>
                <p className="os s5">
                  <b>Gin:&nbsp;</b>
                  Tanqueray,
                  Greater Than,
                  Gordon’s London Dry Gin
                </p>
              </div>

              <div>
                <p className="os s5">
                  <b>Brandy:&nbsp;</b>
                  TI Mansion House French Brandy,
                  Courrier Napoleon Finest French Brandy Green,
                  TI Mansion House Silk Premium Brandy,
                  TI Courrier Napoleon Finest Pure Grape French Brandy
                </p>
              </div>

              <div>
                <p className="os s5">
                  <b>Tequila:&nbsp;</b>
                  Hoist Gold Tequila,
                  Hoist Silver Tequila,
                  DesmondJi 100% Agave,
                  DesmondJi 51% Agave,
                  DesmondJi Blue Margarita
                </p>
              </div>

              <div>
                <p className="os s5">
                  <b>Liqueur:&nbsp;</b>
                  Baileys The Original Irish Cream,
                  DesmondJi Orange Liqueur
                </p>
              </div>

            </div>
          </div>

          {/* <div className="paper add-to-basket">
            <Button iconAlignment="left" icon="giftBasket" primary>Add to gift basket</Button>
          </div> */}

          {
            this.state.isMobile && this.state.isProductAdded
              ? <div className="gift-more-drinks-paper">
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