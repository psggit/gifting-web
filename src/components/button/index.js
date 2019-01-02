import React from "react"
import "./button.scss"
import Icon from "./../icon"

class Button extends React.Component {
  getClassName() {
    let className = "btn-default"
    if (this.props.primary) {
      className = "btn-primary"
    } else if (this.props.secondary) {
      className = "btn-secondary"
    } else if (this.props.danger) {
      className = "btn-danger"
    }

    if (this.props.size === "small") {
      className += " small"
    }

    return className
  }

  render() {
    return (
      <button
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}
        className={`btn ${this.getClassName()}`}
      >
        { this.props.children }
        {
          this.props.icon &&
          <span style={{ position: "relative", top: "5px", left: "10px" }}><Icon name="rightArrowWhite" /></span>
        }
      </button>
    )
  }
}

export default Button