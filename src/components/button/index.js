import React from "react"
import "./button.scss"

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
      </button>
    )
  }
}

export default Button