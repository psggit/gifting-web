import React from "react"
import CitySelect from "./CitySelect"
import Search from "Components/Search"
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
      </div>
    )
  }
}

export default MobileHeader