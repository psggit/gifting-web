import React from "react"
import PropTypes from "prop-types"
import Icon from "Components/icon"
import "./brands-list-item.scss"
import "Sass/base.scss"

class BrandItem extends React.Component {
  handleImageLoad(e) {
    e.target.setAttribute("class", "img-loaded")
  }
  render() {
    return (
      <div className="brand--item animated fadeIn">
        <div style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: "20px"
        }}>
          <Icon name="chevronRight" />
        </div>
        <div className="brand--item__img">
          <div className="img-placeholder"></div>
          <img onLoad={this.handleImageLoad} src={this.props.thumbnail} />
        </div>
        <div className="brand--item__desc">
          <p className="os s6">Johnnie Walker Red Label</p>
        </div>
      </div>
    )
  }
}

export default BrandItem

BrandItem.propTypes = {
  thumbnail: PropTypes.string
}