import React from "react"
import CitySelect from "./CitySelect"
import "./sass/mobile-header.scss"

class MobileHeader extends React.Component {
  render() {
    return (
      <div id="product--listing__header">
        <CitySelect onCityChange={this.onCityChange} />
      </div>
    )
  }
}

export default MobileHeader