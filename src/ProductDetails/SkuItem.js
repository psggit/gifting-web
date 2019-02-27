import React from "react"
import Button from "Components/button"
import "./sass/sku-item.scss"
import { mountModal } from "Components/modal-box/utils"
import AddedToBasketModal from "./AddedToBasketModal"
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
  return val / 1000 < 1 ? val +" ml" : (val/1000).toFixed(2) +  " Ltr"
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
    const res = basket.findIndex(function(item) {
      return item.sku.sku_id === id
    })
    return res > -1
  }

  setBasketFromApi(basket, promoCode, CB) {
    const products = basket.map(item => {
      return {
        count: item.count,
        product_id: item.sku.sku_pricing_id,
        type: "normal"
      }
    })

    const giftCardSummaryReq = {
      promo_code: promoCode,
      gps: JSON.parse(localStorage.getItem("receiver_info")).gps,
      products
    }

    this.setState({ addingToBasket: true })

    fetchGiftCardSummary(giftCardSummaryReq)
      .then(giftSummary => {
        this.setState({ addingToBasket: false })
        localStorage.setItem("basket", JSON.stringify(basket))
        const updatedBasket = this.getUpdatedBasket(giftSummary.products)
        this.props.setBasketCount(getBasketTotal(basket))
        this.updateLocalBasket(updatedBasket)
        const total = giftSummary.format_balance.slice(1).split(" ").join("")
        localStorage.setItem("amount", total)
        CB()
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
    return products.find((item) => item.sku_id === id)
  }

  getUpdatedBasket(products) {
    const basket = JSON.parse(localStorage.getItem("basket"))
    return basket.map((item) => {
      const product = this.getProductUsingSkuId(item.sku.sku_id, products)
      item.sku.price = product.display_price
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
      if (this.props.isMobile === false) {
        mountModal(AddedToBasketModal({}))
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
  render() {
    return (
      <React.Fragment>
        <div className="sku--item">
          <div className="sku--item__img">
            <div className="img-placeholder"></div>
            <img alt="" ref={(node) => this.img = node} onLoad={this.handleImageLoad} src={this.props.image} />
          </div>
          <div className="sku--item__desc">
            <p className="os s4">{this.props.name}</p>
            
            <div className="volume--price--container-w">
              <div className="volumes">
                {
                  this.renderVolumes()
                }
              </div>
              <div className="volumes--border"></div>

              <div className="sku--item__price">
                <span className="os s6">MRP:</span>
                <span className="os s4">
                  {
                    this.props.volumes.length &&
                    `Rs. ${this.props.volumes[this.state.activeSku].price.slice(1)}`
                  }
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
            <span className="os s6">MRP:</span>
            <span className="os s4">
              {
                this.props.volumes.length &&
                this.props.volumes[this.state.activeSku].price
              }
            </span>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default SkuItem