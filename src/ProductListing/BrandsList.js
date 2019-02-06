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
              {...this.props}
              activeCity={this.props.match.params.citySlug}
              activeGenre={this.props.match.params.genreSlug}
              id={item.brand_id}
              key={item.brand_id}
              thumbnail={item.low_res_image}
              img={item.url}
              name={item.brand_name}
              shortName={item.brand_short_name}
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