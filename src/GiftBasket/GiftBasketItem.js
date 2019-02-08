import React from "react"
import Icon from "Components/icon"
import "./gift-basket-item.scss"

class GiftBasketItem extends React.Component {
  handleImageLoad(e) {
    e.target.setAttribute("class", "img-loaded")
  }
  render() {
    const { brand, sku } = this.props.item
    return (
      <div className="gift--basket__item">
        <div className="gift--basket__item-img">
          <div className="img-placeholder"></div>
          <img onLoad={this.handleImageLoad} src={brand.high_res_image} />
        </div>

        <div className="gift--basket__item-desc">
          <p className="os s6">{brand.brand_name}</p>
          <div className="row price--quantity">

            <div className="col">
              <span style={{ paddingRight: "10px", borderRight: "1px solid #777" }} className="os s6">&#8377; {sku.price}</span>
              <span style={{ paddingLeft: "10px" }} className="os s6">{sku.volume}</span>
            </div>

            <div className="col">
              <div className="quantity">
                <span onClick={this.handleRemove} className="os s6">
                  <Icon name="basketMinus" />
                </span>
                <span className="os s8">1</span>
                <span onClick={this.handleAdd} className="os s6">
                  <Icon name="basketPlus" />
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default GiftBasketItem