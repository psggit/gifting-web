import React from "react"
import BrandsListItem from "./BrandsListItem"
import "./sass/brand-list.scss"
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
              key={item.brand_id}
              thumbnail={item.low_res_image}
              img={item.url}
              name={item.brand_name}
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