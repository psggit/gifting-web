import React from "react"
import Icon from "Components/icon"
import "./sass/promo-code-item.scss"

function PromoCodeItem(props) {
  return (
    <div className="promo--code__item">
      <div className="row">
        <div>
          <p className="os s6">{props.promo.value}</p>
          <p className="os s8">{ props.promo.expiresIn }</p>
        </div>
        <div>
          <p onClick={() => { props.onApply(props.promo.value) }} style={{ cursor: "pointer" }} className="os s8">APPLY</p>
        </div>
      </div>

      <div className="row">
        <p className="os s7">
          {props.promo.attributes.shortDescription}
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