import React from "react"
import Icon from "Components/icon"
import "./gift-basket-item.scss"

class GiftBasketItem extends React.Component {
  render() {
    return (
      <div className="gift--basket__item">
        <div className="gift--basket__item-img">
          <div className="img-placeholder"></div>
          <img />
        </div>

        <div className="gift--basket__item-desc">
          <p className="os s6">Johinnie Walker Black Label</p>
          <div className="row price--quantity">

            <div className="col">
              <span style={{ paddingRight: "10px", borderRight: "1px solid #777" }} className="os s6">&#8377; 3,250</span>
              <span style={{ paddingLeft: "10px" }} className="os s6">750 ml</span>
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