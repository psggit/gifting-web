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
  getGenreNameByShortName(name) {
    console.log(name)
    return this.props.genres.find(item => item.short_name === name).display_name
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
          <CitySelect clearBasket={this.clearBasket} {...this.props} activeCity={this.props.activeCity} />
        </div>

        <div className="row">
          <span className="os s6">Showing drinks for:</span>
          <span
            className="os s6"
            onClick={this.props.openGenres}
            style={{
              fontWeight: "600",
              display: "inline",
              padding: "16px 0px 16px 5px"
            }}>
            <Icon name="drink" />
            <span className="os s6" style={{ margin: "0 10px 0 0" }}>
              {
                this.props.genres.length
                  ? this.getGenreNameByShortName(this.props.activeGenre)
                  : ""
              }
            </span>
            <Icon name="caret" />
          </span>   
        </div>
      </div>
    )
  }
}

export default MobileHeader