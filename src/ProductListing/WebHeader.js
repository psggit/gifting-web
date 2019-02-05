import React from "react"
import CitySelect from "./CitySelect"
import Search from "Components/Search"
import Icon from "Components/icon"
import GenreList from "./GenreList"
import "./sass/web-header.scss"

const genres = [
  { display_name: "Domestic Whiskey", ordinal_position: 1 },
  { display_name: "Rum", ordinal_position: 2},
  { display_name: "Vodka", ordinal_position: 3},
  { display_name: "RTD", ordinal_position: 4},
  { display_name: "Beer", ordinal_position: 5},
  { display_name: "Tequila", ordinal_position: 6},
  { display_name: "Gin", ordinal_position: 7}
]

class WebHeader extends React.Component {
  constructor() {
    super()
    this.state = {
      active: -1,
      cityId: -1
    }
  }

  render() {
    return (
      <div id="product--listing__w-header">
        <div className="row">
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="os s6">Showing products in:</p>
            <CitySelect {...this.props} activeCity={this.props.match.params.citySlug} />
          </div>
          <Search placeholder="Search for products" />
        </div>

        <div className="row">
          <p className="os s6">Showing products for:</p>
          <p className="os s6">
            <Icon name="giftBasket" />
            <span style={{ marginLeft: "10px" }}>Gift Basket (0)</span>
          </p>
        </div>

        <div className="row">
          <GenreList {...this.props} active={this.props.match.params.genreSlug} genres={this.props.genres} />
        </div>
      </div>
    )
  }
}

export default WebHeader