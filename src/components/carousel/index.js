import React from "react"
import Icon from "Components/icon"
import "./carousel.scss"

class Carousel extends React.Component {
  handlePrev() {

  }

  handleNext() {

  }

  render() {
    return (
      <div className="hb--carousel">
        <div onClick={this.handlePrev} className="hb--carousel__arrow left"><Icon name="chevronRight" /></div>
        <div className="hb--carousel__track">
          {
            this.props.children.map((item, i) => (
              <div className="hb--carousel__item" key={i}>{ item }</div>
            ))
          }
        </div>
        <div onClick={this.handleNext} className="hb--carousel__arrow right"><Icon name="chevronRight" /></div>
      </div>
    )
  }
}

export default Carousel