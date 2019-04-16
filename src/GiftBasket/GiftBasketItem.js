import React from "react"
import Icon from "Components/icon"
import "./gift-basket-item.scss"

function getImageUrl(image) {
  return `https://api2.${process.env.BASE_URL}/get?fs_url=${image}`
}

function getUnit(val) {
  return val / 1000 < 1 ? val +" ml" : (val/1000).toFixed(2) +  " Ltr"
}

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

  componentDidMount() {
    console.log("props", this.props)
  }

  handleAdd(id) {
    let { count } = this.state
    count += 1
    this.props.updateBasket(id, count)
    // this.setState({ count })
  }

  handleRemove(id) {
    let { count } = this.state
    count -= 1
    this.props.updateBasket(id, count)
    // this.setState({ count })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.props.item.count) {
      this.setState({ count: this.props.item.count })
    }
  }
  
  handleImageLoad(e) {
    e.target.setAttribute("class", "img-loaded")
  }
  render() {
    const { brand, sku, count } = this.state
    console.log(sku)
    return (
      <div className="gift--basket__item">
        <div className="gift--basket__item-img">
          <div className="img-placeholder"></div>
          <img onLoad={this.handleImageLoad} src={sku.logo_low_res_image || sku.logo_high_res_image || ""} />
        </div>

        <div className="gift--basket__item-desc">
          <p style={{ fontWeight: "600" }} className="os s6">{brand.brand_name}</p>
          <div className="row price--quantity">

            <div className="col">
              <span style={{ paddingRight: "10px", borderRight: "1px solid #777" }} className="os s6">{getUnit(sku.volume)}</span>
              <span style={{ paddingLeft: "10px" }} className="os s6">&#8377; {sku.price}</span>
            </div>

            {
              !this.props.readOnly &&
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
            }

          </div>
        </div>
      </div>
    )
  }
}

export default GiftBasketItem