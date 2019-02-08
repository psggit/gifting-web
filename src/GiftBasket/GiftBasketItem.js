import React from "react"
import Icon from "Components/icon"
import "./gift-basket-item.scss"

class GiftBasketItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.state = {
      count: props.item.count,
      brand: props.item.brand,
      sku: props.item.sku
    }
  }
  handleAdd(id) {
    let { count } = this.state
    count += 1
    this.props.updateBasket(id, count)
    this.setState({ count })
  }

  handleRemove(id) {
    let { count } = this.state
    count -= 1
    this.props.updateBasket(id, count)
    this.setState({ count })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item.count !== this.props.item.count) {
      this.setState({ count: this.props.item.count })
    }
  }
  
  handleImageLoad(e) {
    e.target.setAttribute("class", "img-loaded")
  }
  render() {
    const { brand, sku, count } = this.state
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
              <span style={{ paddingRight: "10px", borderRight: "1px solid #777" }} className="os s6">{sku.price}</span>
              <span style={{ paddingLeft: "10px" }} className="os s6">{sku.volume}</span>
            </div>

            <div className="col">
              <div className="quantity">
                <span onClick={() => { this.handleRemove(sku.sku_id) }} className="os s6">
                  <Icon name="basketMinus" />
                </span>
                <span className="os s8">{count}</span>
                <span onClick={() => { this.handleAdd(sku.sku_id) }} className="os s6">
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