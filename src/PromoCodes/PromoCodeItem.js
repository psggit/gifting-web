import React from "react"
import Icon from "Components/icon"
import "./sass/promo-code-item.scss"

class PromoCodeItem extends React.Component {
  constructor() {
    super()
    this.state = {
      error: null
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(promoCode) {
    this.props.onApply(promoCode, (err) => {
      err.response.json().then(json => {
        this.setState({ error: json.message })
      })
    })
  }
  render() {
    return (
      <div className="promo--code__item">
        <div className="row">
          <div>
            <p className="os s6">{this.props.promo.value}</p>
            <p className="os s8">{this.props.promo.expiresIn }</p>
          </div>
          <div>
            <p onClick={() => { this.handleClick(this.props.promo.value) }} style={{ cursor: "pointer" }} className="os s8 apply-btn">APPLY</p>
          </div>
        </div>
  
        <div className="row">
          <p className="os s7">
            {this.props.promo.attributes.description}
          </p>
        </div>
  
        {/* <div className="row">
          <p className="os s8">LEARN MORE</p>
          <Icon name="rightArrowBlack" />
        </div> */}

        <div className="row">
          <p style={{ color: "#ff3b34" }} className="os s8">{this.state.error}</p>
        </div>
      </div>
    )
  }
}

export default PromoCodeItem