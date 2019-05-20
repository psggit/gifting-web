import React from "react"
import PropTypes from "prop-types"
import Icon from "Components/icon"
import "./sass/brands-list-item.scss"
import "Sass/base.scss"
// import ChevronRight from "./../../images/chevron-right.svg"

class BrandItem extends React.Component {
  handleImageLoad(e) {
    e.target.setAttribute("class", "img-loaded")
  }

  render() {
    return (
      <a
        href={`/brand/${this.props.activeState}/${this.props.activeGenre}/${this.props.id}`}
        className="brand--item animated fadeIn">
        <div style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: "20px"
        }}>
          <img src={"/images/chevron-right.svg"} />
        </div>
        <div className="brand--item__img">
          <div className="img-placeholder"></div>
          <img onLoad={this.handleImageLoad} alt="" src={this.props.thumbnail} />
        </div>
        <div className="brand--item__desc">
          <p className="os s7">{this.props.name}</p>
        </div>
      </a>
    )
  }
}

export default BrandItem

BrandItem.propTypes = {
  thumbnail: PropTypes.string
}