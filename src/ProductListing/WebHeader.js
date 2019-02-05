import React from "react"
import CitySelect from "./CitySelect"
import Search from "Components/Search"
import Icon from "Components/icon"
import GenreItem from "Components/GenreItem"
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
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.state = {
      active: -1,
      cityId: -1
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.genres.length !== prevProps.genres.length) {
      const activeGenre = this.getGenreIndexByName(this.props.match.params.genreSlug)
      this.setState({ active: activeGenre })
    }
  }
  handleGenreChange(genre) {
    this.setState({ active: genre.id })
    this.props.history.push(`/brands/${this.props.match.params.citySlug}/${genre.shortName}`)
    this.props.handleGenreChange(genre)
  }
  getGenreIndexByName(name) {
    return this.props.genres.findIndex(genre => genre.short_name === name)
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
          {
            this.props.genres.map((item, i) => (
              <GenreItem
                active={this.state.active}
                onChange={this.handleGenreChange}
                key={i}
                id={i}
                name={item.display_name}
                shortName={item.short_name}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

export default WebHeader