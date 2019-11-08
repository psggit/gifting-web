import React from "react"
import Button from "Components/button"
import "./sass/sku-item.scss"
import { mountModal } from "Components/modal-box/utils"
import AddedToBasketModal from "./AddedToBasketModal"
import NotificationModal from "./../NotifyError"
import { fetchGiftCardSummary } from "./../api"

// const volumes = [
//   { volume: "1 Ltr"  },
//   { volume: "750 ml" },
//   { volume: "500 ml" },
//   { volume: "350 ml" },
//   { volume: "180 ml" },
//   { volume: "90 ml" }
// ]

function getUnit(val) {
  return val / 1000 < 1 ? val + " ml" : (val / 1000).toFixed(2) + " Ltr"
}

export function getBasketTotal(basket) {
  return basket.reduce((a, b) => {
    return a + b.count
  }, 0)
}

export function getBasketTotalPrice(basket) {
  const total = basket.reduce((a, b) => {
    return a + b.count * parseFloat(b.sku.price.toFixed(2))
  }, 0)
  localStorage.setItem("amount", total)
}

class SkuItem extends React.Component {
  constructor() {
    super()
    this.state = {
      activeSku: 0,
      addingToBasket: false
    }
    this.handleVolumeChange = this.handleVolumeChange.bind(this)
    this.addToBasket = this.addToBasket.bind(this)
    this.handleImageLoad = this.handleImageLoad.bind(this)
  }

  itemAlreadyExist(basket, id) {
    const res = basket.findIndex(function (item) {
      return item.sku.sku_id === id
    })
    return res > -1
  }

  setBasketFromApi(basket, promoCode, CB) {
    const products = basket.map(item => {
      return {
        count: item.count,
        sku_id: item.sku.sku_id
      }
    })

    const giftCardSummaryReq = {
      promo_code: promoCode,
      state_id: JSON.parse(localStorage.getItem("receiver_info")).state_id,
      city_id: JSON.parse(localStorage.getItem("receiver_info")).city_id,
      products
    }

    this.setState({ addingToBasket: true })

    fetchGiftCardSummary(giftCardSummaryReq)
      .then(giftSummary => {
        this.setState({ addingToBasket: false })
        localStorage.setItem("basket", JSON.stringify(basket))
        console.log("resp products", giftSummary.products)
        const updatedBasket = this.getUpdatedBasket(giftSummary.products)
        this.props.setBasketCount(getBasketTotal(basket))
        this.updateLocalBasket(updatedBasket)
        const total = giftSummary.format_balance.slice(1).split(" ").join("")
        localStorage.setItem("amount", total)
        //mountModal(NotificationModal())
        CB()
      })
      .catch((err) => {
        this.setState({ addingToBasket: false })
        mountModal(NotificationModal())
      })
  }

  updateLocalBasket(basket) {
    if (!basket.length) {
      localStorage.removeItem("basket")
    } else {
      localStorage.setItem("basket", JSON.stringify(basket))
    }
  }

  getProductUsingSkuId(id, products) {
    console.log("products", products)
    return products.find((item) => item.sku_id === id)
  }

  getUpdatedBasket(products) {
    const basket = JSON.parse(localStorage.getItem("basket"))
    return basket.map((item) => {
      console.log("price", item)
      const product = this.getProductUsingSkuId(item.sku.sku_id, products)
      console.log("product", product)
      item.sku.price = product.price
      item.count = product.count
      return item
    })
  }

  addToBasket() {
    const { activeSku } = this.state
    const currentBasket = localStorage.getItem("basket")
    let basket = currentBasket ? JSON.parse(currentBasket) : []
    const basketItem = {
      brand: this.props.brand,
      sku: this.props.volumes[activeSku],
      count: 1
    }
    // console.log("basket", basketItem)
    // let productDetails = ({
    //   productName: basketItem.brand.brand_name,
    //   quantity: basketItem.count,
    //   volume: basketItem.sku.volume,
    //   city: localStorage.getItem("receiver_info") ?  JSON.parse(localStorage.getItem("receiver_info")).cityName : ""
    // })
    // console.log("product Details", productDetails)
    // if(window.gtag) {
    //   gtag("event", "add_product_to_cart", {
    //     "event_label": JSON.stringify({
    //       productDetails,
    //     })
    //   })
    // }

    console.log("basket", basketItem)
    let productDetails = ({
      sku_id: basketItem.sku.sku_id,
    })
    console.log("product Details", productDetails)
    if (window.gtag) {
      gtag("event", "add_product_to_cart", {
        "event_label": JSON.stringify({
          productDetails,
        })
      })
    }

    const activeSkuId = this.props.volumes[activeSku].sku_id

    if (this.itemAlreadyExist(basket, activeSkuId)) {
      basket = basket.map(item => {
        if (item.sku.sku_id === activeSkuId) {
          item.count += 1
        }
        return item
      })
    } else {
      basket.push(basketItem)
    }

    this.setBasketFromApi(basket, localStorage.getItem("promo_code"), () => {
      this.props.toggleProductAdded()
      if (this.props.isMobile === false) {
        mountModal(AddedToBasketModal({
          viewProductsUrl: this.props.viewProductsUrl,
          history: this.props.history
        }))
      }
    })
  }
  handleImageLoad() {
    this.img.className = "img-loaded"
  }

  handleVolumeChange(e) {
    this.setState({ activeSku: parseInt(e.target.id) })
  }

  renderVolumes() {
    return this.props.volumes.map((item, i) => (
      <input
        id={i}
        onFocus={this.handleVolumeChange}
        readOnly
        key={i}
        value={`${getUnit(item.volume)}`}
        className={`os volume--item ${this.state.activeSku === i ? "focused" : ""}`}
      />
    ))
  }
  componentDidMount() {
    if (this.img && this.img.complete) {
      this.handleImageLoad()
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.image !== prevProps.image) {
  //     console.log(this.props.image)
  //     this.setState({
  //       image: this.props.image
  //     })
  //   }
  // }

  render() {
    return (
      <React.Fragment>
        <div className="sku--item">
          <div className="sku--item__img">
            <div className="img-placeholder"></div>
            <img
              alt=""
              ref={(node) => this.img = node}
              onLoad={this.handleImageLoad}
              src={this.props.image}
            />
          </div>
          <div className="sku--item__desc">
            <p className="os s2">{this.props.name}</p>

            <div className="volume--price--container-w">
              <div className="volumes">
                {
                  this.renderVolumes()
                }
              </div>
              <div className="volumes--border"></div>

              <div className="sku--item__price">
                <span className="os s6">Price:</span>
                <span className="os s2">
                  <span style={{ marginRight: "5px" }}>&#8377;</span>
                  {
                    this.props.volumes.length
                      ? `${this.props.volumes[this.state.activeSku].price}`
                      : ""
                  }
                  <br />
                  <span className="os s9 cashback--title">
                    {
                      this.props.volumes.length && this.props.volumes[this.state.activeSku].offer
                        ? this.props.volumes[this.state.activeSku].offer.description
                        : ""
                    }
                  </span>
                </span>
              </div>
            </div>

            <div className="add-to-basket">
              <Button
                disabled={this.state.addingToBasket}
                onClick={this.addToBasket}
                iconAlignment="left"
                primary
                icon="giftBasket"
              >
                Add to gift basket
              </Button>
            </div>
          </div>
        </div>
        <div className="volume--price--container-m">
          <div className="volumes">
            {
              this.renderVolumes()
            }
          </div>
          <div className="volumes--border"></div>

          <div className="sku--item__price">
            <span className="os s6">Price:</span>
            <span className="os s4">
              &#8377;&nbsp;
              {
                this.props.volumes.length &&
                `${this.props.volumes[this.state.activeSku].price}`
              }
              <br />
              <span className="os s9 cashback--title">
                {
                  this.props.volumes.length && this.props.volumes[this.state.activeSku].offer
                    ? this.props.volumes[this.state.activeSku].offer.description
                    : ""
                }
              </span>
            </span>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default SkuItem