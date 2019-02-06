import React from "react"
import Icon from "Components/icon"
import "./sass/promo-code-item.scss"

function PromoCodeItem(promo) {
  return (
    <div className="promo--code__item">
      <div className="row">
        <div>
          <p className="os s6">FLAT350OFF</p>
          <p className="os s8">Expires in 2 days</p>
        </div>
        <div>
          <p className="os s8">APPLY</p>
        </div>
      </div>

      <div className="row">
        <p className="os s7">
          Flat Rs. 350 off on a select few Johnnie Walker drinks
        </p>
      </div>

      <div className="row">
        <p className="os s8">LEARN MORE</p>
        <Icon name="rightArrowBlack" />
      </div>
    </div>
  )
}

export default PromoCodeItem