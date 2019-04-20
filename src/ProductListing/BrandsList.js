import React from "react"
import BrandsListItem from "./BrandsListItem"
import "./sass/brand-list.scss"
// import BrandsFilter from "./brands-filter"
import PropTypes from "prop-types"

function getImageUrl(image) {
  return `https://api2.${process.env.BASE_URL}/get?fs_url=${image}`
}

class BrandsList extends React.Component {
  constructor() {
    super()
    this.handleBrandClick = this.handleBrandClick.bind(this)
  }
  handleBrandClick(e) {
    e.preventDefault()
    const path = "/" + e.target.href.split("/").slice(3).join("/")
    this.props.history.push(path)
  }

  render() {
    return (
      <div onClick={this.handleBrandClick} className="brands--list">
        {/* <BrandsFilter /> */}
        {
          this.props.data.map((item) => (
            <BrandsListItem
              {...this.props}
              activeCity={this.props.activeCity}
              activeGenre={this.props.activeGenre}
              id={item.brand_id}
              key={item.brand_id}
              thumbnail={item.logo_low_res_image || item.logo_high_res_image || ""}
              // thumbnail={item.text_high_res_image || item.text_low_res_image}
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