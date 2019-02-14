import React from "react"

class Input extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    let val = e.target.value
    if (!val.trim().length) {
      val = val.trim()
    }
    this.props.onChange(val)
  }
  render() {
    return (
      <input
        onChange={this.handleChange}
        value={this.props.value}
        placeholder={this.props.placeholder}
      />
    )
  }
}

export default Input