import React from "react"
import CitySelect from "./CitySelect"
// import Search from "Components/Search"
import Icon from "Components/icon"
// import GenresList from "./GenreList"
import GenreSlider from "./GenreSlider"
import { getBasketTotal } from "./../ProductDetails/SkuItem"
import NavLink from "Components/NavLink"
import "./sass/web-header.scss"

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
            <CitySelect clearBasket={this.clearBasket} {...this.props} />
          </div>
          {/* <Search placeholder="Search for products" /> */}
        </div>

        <div className="row">
          <p className="os s6">Showing products for:</p>
          <NavLink history={this.props.history} href="/basket" className="os s6">
            <Icon name="giftBasket" />
            <span className="os s6" style={{ marginLeft: "10px" }}>Gift Basket ({this.state.basketTotal})</span>
          </NavLink>
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