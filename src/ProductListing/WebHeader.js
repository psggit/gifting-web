import React from "react"
import CitySelect from "./CitySelect"
import Search from "Components/Search"
import Icon from "Components/icon"
import "./sass/web-header.scss"

class MobileHeader extends React.Component {
  render() {
    return (
      <div className="product--listing__w-header">
        <div className="row">
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="os s6">Showing products in:</p>
            <CitySelect onCityChange={this.onCityChange} />
          </div>
          <Search placeholder="Search for products" />
        </div>

        <div className="row">
          <p className="os s6">Showing products for:</p>
          <p className="os s6">
            <Icon name="giftBasket" />
            <span style={{ marginLeft: "10px" }}>Gift Basket(3)</span>
          </p>
        </div>
      </div>
    )
  }
}

export default MobileHeader