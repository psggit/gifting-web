import React from "react"
import "./genre-item.scss"
import "Sass/base.scss"
import Icon from "./../icon"

class GenreItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(genre) {
    this.props.onChange(genre)
  }
  render() {
    return (
      <div
        id={this.props.id}
        onClick={() => {
          this.handleClick({
            id: this.props.id,
            name: this.props.name,
            shortName: this.props.shortName
          })
        }}
        className={`genre--item ${this.props.active === this.props.id ? "active" : ""}`}>
        <span><Icon name="drinkChecked" /></span>
        <div className="genre--item__content" >
          <Icon name="drink" />
          <p className="os" style={{ color: "#777", fontWeight: "bold" }}>{this.props.name}</p>
        </div>
      </div>
    )
  }
}

export default GenreItem