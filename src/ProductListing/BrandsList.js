import React from "react"
import BrandsListItem from "./BrandsListItem"
// import BrandsFilter from "./brands-filter"
import PropTypes from "prop-types"

class BrandsList extends React.Component {
  render() {
    return (
      <div className="brands--list">
        {/* <BrandsFilter /> */}
        {
          this.props.data.map((item) => (
            <BrandsListItem
              key={item.id}
              thumbnail={item.thumbnailUrl}
              img={item.url}
            />
          ))
        }
      </div>
    )
  }
}

export default BrandsList

BrandsList.propTypes = {
  data: PropTypes.array
}