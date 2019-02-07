import React from "react"
import Button from "Components/button"
import "./sass/sku-item.scss"
import { mountModal } from "Components/modal-box/utils"
import AddedToBasketModal from "./AddedToBasketModal"

// const volumes = [
//   { volume: "1 Ltr"  },
//   { volume: "750 ml" },
//   { volume: "500 ml" },
//   { volume: "350 ml" },
//   { volume: "180 ml" },
//   { volume: "90 ml" }
// ]

function getUnit(val) {
  return val / 1000 < 1 ? val +" ml" : val/1000 +  " Ltr"
}

class SkuItem extends React.Component {
  constructor() {
    super()
    this.state = {
      activeSku: 0
    }
    this.handleVolumeChange = this.handleVolumeChange.bind(this)
  }
  addToBasket() {
    // const { selectedVolume } = this.state
    // call add to basket api
    mountModal(AddedToBasketModal({}))
  }
  handleImageLoad(e) {
    e.target.setAttribute("class", "img-loaded")
  }
  handleVolumeChange(e) {
    this.setState({ activeSku: e.target.id })
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
  render() {
    return (
      <React.Fragment>
        <div className="sku--item">
          <div className="sku--item__img">
            <div className="img-placeholder"></div>
            <img onLoad={this.handleImageLoad} src={this.props.image} />
          </div>
          <div className="sku--item__desc">
            <p className="os s4">{this.props.brand}</p>
            
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
                    this.props.volumes[this.state.activeSku].price
                  }
                </span>
              </div>
            </div>

            <div className="add-to-basket">
              <Button
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
            <span className="os s4">Rs. 5,190</span>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default SkuItem