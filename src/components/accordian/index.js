import React from 'react'
import './accordian.scss'
import { parse } from 'path';

class Accordian extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    // if middleware exists then apply
    if(this.props.toggleAccordian) {
      if (parseInt(e.target.id) === this.props.activeAccordian) {
        console.log(parseInt(e.target.id), this.props.activeAccordian)
        this.props.toggleAccordian()
        return
      }
    }
    if (this.props.middleware) {
      if (this.props.middleware(e.target.id)) {
        this.props.setActiveAccordian(parseInt(e.target.id))
      }
    } else {
      this.props.setActiveAccordian(parseInt(e.target.id))
    }
  }
  render() {
    const { children } = this.props
    return (
      <div className="accordian">
        {
          React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              handleClick: this.handleClick,
              toggleAccordian: this.props.toggleAccordian,
              activeAccordian: this.props.activeAccordian
            })
          })
        }
      </div>
    )
  }
}

export default Accordian
