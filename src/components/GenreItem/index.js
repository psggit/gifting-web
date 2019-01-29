import React from "react"
import "./genre-item.scss"
import "Sass/base.scss"
import Icon from "./../icon"

class GenreItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    this.props.handleClick(parseInt(e.target.id))
  }
  render() {
    return (
      <div
        id={this.props.id}
        onClick={this.handleClick}
        className={`genre--item ${this.props.active === this.props.id ? "active" : ""}`}>
        <span><Icon name="drinkChecked" /></span>
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center"
        }}>
          <Icon name="drink" />
          <p className="os" style={{ color: "#777", fontWeight: "bold" }}>{this.props.name}</p>
        </div>
      </div>
    )
  }
}

export default GenreItem