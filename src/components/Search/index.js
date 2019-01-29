import React from "react"
import PropTypes from "prop-types"
import Icon from "./../icon"
import "./search.scss"

class Search extends React.Component {
  constructor() {
    super()
    this.state = {
      query: "",
      isFocused: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.cancelSearch = this.cancelSearch.bind(this)
  }

  handleChange(e) {
    this.setState({ query: e.target.value })
  }

  cancelSearch() {
    this.setState({ isFocused: false })
    this.props.cancelSearch()
  }

  handleFocus() {
    this.setState({ isFocused: true })
    this.props.onFocus()
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
      <div className={`search--box ${this.state.isFocused ? "focused" : ""}`}>
        <Icon name="search" />
        <input
          onFocus={this.handleFocus}
          placeholder={this.props.placeholder}   
          type="text"
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
        />
        <span onClick={this.cancelSearch} className="cancel--search os">Cancel</span>
      </div>
    )
  }
}

export default Search

Search.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  cancelSearch: PropTypes.func,
  onFocus: PropTypes.func
}