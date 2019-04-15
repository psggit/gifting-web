import React from "react"
import CitySelect from "./CitySelect"
import Search from "Components/Search"
import Icon from "Components/icon"
import GenresList from "./GenreList"
import GenreSlider from "./GenreSlider"
import { getBasketTotal } from "./../ProductDetails/SkuItem"
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
    this.clearBasket = this.clearBasket.bind(this)
    this.state = {
      active: -1,
      cityId: -1,
      basketTotal: null
    }
  }

  clearBasket() {
    localStorage.removeItem("basket")
    this.setState({ basket: [], basketTotal: 0 })
  }

  componentDidMount() {
    const basket = JSON.parse(localStorage.getItem("basket"))
    this.setState({ basketTotal: basket ? getBasketTotal(basket) : 0 })
  }

  render() {
    return (
      <div id="product--listing__w-header">
        <div className="row">
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="os s6">Showing products in:</p>
            <CitySelect clearBasket={this.clearBasket} {...this.props} activeState={this.props.activeState} />
          </div>
          {/* <Search placeholder="Search for products" /> */}
        </div>

        <div className="row">
          <p className="os s6">Showing products for:</p>
          <a href="/basket" className="os s6">
            <Icon name="giftBasket" />
            <span className="os s6" style={{ marginLeft: "10px" }}>Gift Basket ({this.state.basketTotal})</span>
          </a>
        </div>

        <div className="row">
          {
            this.props.genres.length > 0 &&
            <GenreSlider {...this.props} active={this.props.activeGenre} genres={this.props.genres} />
          }
          {/* <GenresList {...this.props} active={this.props.activeGenre} genres={this.props.genres} /> */}
        </div>
      </div>
    )
  }
}

export default WebHeader