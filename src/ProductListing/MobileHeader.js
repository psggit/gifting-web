import React from "react"
import CitySelect from "./CitySelect"
import Search from "Components/Search"
import Icon from "Components/icon"
import "./sass/mobile-header.scss"

class MobileHeader extends React.Component {
  constructor() {
    super()
  }
  handleFocus() {

  }
  handleSearch() {

  }
  cancelSearch() {

  }
  render() {
    return (
      <div id="product--listing__m-header">
        <div className="row">
          {/* <Search
            onFocus={this.handleFocus}
            placeholder="Search for products"
            onSearch={this.handleSearch}
            cancelSearch={this.cancelSearch}
          /> */}
          <CitySelect {...this.props} activeCity={this.props.match.params.citySlug} />
        </div>

        <div className="row">
          <span className="os s4">Showing drinks for:</span>
          <span
            className="os s4"
            onClick={this.props.openGenres}
            style={{
              textDecoration: "underline",
              fontWeight: "600",
              display: "inline",
              padding: "16px 10px"
            }}>
            <Icon name="drink" />
            {this.props.match.params.genreSlug}
            <Icon name="caret" />
          </span>   
        </div>
      </div>
    )
  }
}

export default MobileHeader