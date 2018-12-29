import React from 'react'
import './accordian.scss'

class Accordian extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    // if middleware exists then apply
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
              activeAccordian: this.props.activeAccordian
            })
          })
        }
      </div>
    )
  }
}

export default Accordian
