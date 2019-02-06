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

    if (this.props.iconAlignment === "left") {
      className += " icon-left"
    }

    return className
  }

  render() {
    const style = this.props.icon
      ? {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }
      : undefined 
    return (
      <button
        disabled={this.props.disabled}
        style={style}
        onClick={this.props.onClick}
        className={`btn ${this.getClassName()}`}
      >
        { this.props.children }
        {
          this.props.icon &&
          <Icon name={this.props.icon} />
        }
      </button>
    )
  }
}

export default Button