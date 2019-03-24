import React from "react"
import PropTypes from "prop-types"

function trimSpaces(inputVal) {
  if (!inputVal.trim().length) {
    inputVal = inputVal.trim()
  }
  return inputVal
}

class Input extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const target = e.target
    const val = trimSpaces(target.value)
    if (this.props.pattern) {
      if (target.validity.valid) {
        this.props.onChange(val)
      }
    } else {
      this.props.onChange(val)
    }
  }
  render() {
    return (
      <input
        name={this.props.name}
        type={this.props.type}
        pattern={this.props.pattern}
        onChange={this.handleChange}
        onKeyDown={this.props.onKeyDown}
        value={this.props.value}
        placeholder={this.props.placeholder}
        maxLength={this.props.maxLength}
      />
    )
  }
}

Input.defaultProps = {
  name: undefined,
  type: "text",
  pattern: undefined,
  onChange: undefined,
  value: undefined,
  placeholder: undefined,
  maxLength: undefined
}

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  pattern: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  maxLength: PropTypes.string
}

export default Input