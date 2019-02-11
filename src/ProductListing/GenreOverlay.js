import React from "react"
import "./sass/genre-overlay.scss"
import  Icon from "Components/icon"
import GenreItem from "Components/GenreItem"
import { listGenres } from  "./../api"

const genres = [
  { name: "Whiskey", id: 1 },
  { name: "Rum", id: 2},
  { name: "Vodka", id: 3},
  { name: "RTD", id: 4},
  { name: "Beer", id: 5},
  { name: "Tequila", id: 6},
  { name: "Gin", id: 7}
]

class GenreOverlay extends React.Component {
  constructor() {
    super()
    this.state = {
      active: 1
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    // listGenres((data, status) => {
    //   this.setState({ genres: data })
    // })
  }
  handleClick(active) {
    this.setState({ active })
  }
  render() {
    return (
      <div className={`overlay animated ${this.props.shouldMountGenres ? "active fadeIn" : "inactive fadeOut"}`}>
        <div className={`genre--container animated ${this.props.shouldMountGenres ? "fadeInUp" : "fadeOutDown"}`}>
          <div className="header">
            <p className="os s2">Select favourite drink</p>
            <span onClick={this.props.closeGenres}>
              <Icon name="crossBlack" />
            </span>
          </div>
  
          <div className="flex-grid">
            {
              this.props.genres.map((item, i) => (
                <div className="col" key={i}>
                  <GenreItem
                    shortName={item.short_name}
                    active={this.state.active}
                    onChange={this.handleClick}
                    id={item.ordinal_position}
                    name={item.display_name}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default GenreOverlay