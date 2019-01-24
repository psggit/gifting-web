import React from "react"
import PropTypes from "prop-types"
import Icon from "./../icon"
import "./search.scss"

class Search extends React.Component {
  constructor() {
    super()
    this.state = {
      query: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleChange(e) {
    this.setState({ query: e.target.value })
  }

  handleKeyDown(e) {
    const { query } = this.state
    const enterKeyPressed = e.keyCode === 13
    if (enterKeyPressed) {
      this.props.onSearch(query)
    }
  }
  render() {
    return (
      <div className="search--box">
        <Icon name="search" />
        <input
          placeholder={this.props.placeholder}   
          type="text"
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default Search

Search.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string
}