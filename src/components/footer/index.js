import React from 'react'
import './footer.scss'
import Icon from "Components/icon"

class footer extends React.Component {
  constructor(props) {
    super(props)
    this.items = ["Send Gift Cards", "Using Gift Cards", "Retailer Outlets", "Support"]
  }

  render() {
    return(
      <div className="footer">
        <span className="logo">
          <Icon name="hipbarLogo" />
        </span>
        <div className="title">HipBar</div>
        <span className="copyright-text">Copyright 2018 | All Right Reserved.</span>
        <div className="footer-items">
          {
            this.items.map((item, index) => {
              return <a key={index}>
                { item }
              </a>
            })
          }
        </div>
      </div>
    )
  }
}

export default footer