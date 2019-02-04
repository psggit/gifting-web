import React from "react"
import PropTypes from "prop-types"
import Icon from "Components/icon"
import "./sass/search-result.scss"

function SearchResults({ data }) {
  return (
    <div className="search--results animated fadeInUp">
      {
        !data.length &&
        <div style={{ textAlign: "center", position: "relative", top: "60px" }}>
          <Icon name="drink" />
          <p className="os s2">
            Search for products to gift to <br /> your loved one
          </p>
        </div>
      }
      {
        data.length
          ? data.map((item, i) => (
            <div className="search--result_item" key={i}>
              { item }
            </div>
          ))
          : ""
      }
    </div>
  )
}

export default SearchResults

SearchResults.propTypes = {
  data: PropTypes.array
}