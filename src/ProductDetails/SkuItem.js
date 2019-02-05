import React from "react"
import "./sass/sku-item.scss"

const volumes = [
  { volume: "1 Ltr"  },
  { volume: "750 ml" },
  { volume: "500 ml" },
  { volume: "350 ml" },
  { volume: "180 ml" },
  { volume: "90 ml" }
]

class SkuItem extends React.Component {
  constructor() {
    super()
  }
  renderVolumes() {
    return volumes.map((item, i) => (
      <input readOnly key={i} value={item.volume} className="os volume--item" />
    ))
  }
  render() {
    return (
      <div className="sku--item">
        <div className="sku--item__img">
          <div className="img-placeholder"></div>
          <img />
        </div>
        <div className="sku--item__desc">
          <p className="os s4">{this.props.brand}</p>
          <div className="volumes">
            {
              this.renderVolumes()
            }
          </div>
          <div className="volumes--border"></div>
        </div>
      </div>
    )
  }
}

export default SkuItem