import React from 'react'
import { getIcon } from 'Utils/icon-utils';
import './navbar.scss'

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      isMenuOpen: false
    }
    this.navItems = ["Send Gift Cards", "Using Gift Cards", "Retailer Outlets", "Support"]
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle() {
    const {isMenuOpen} = this.state
    this.setState({ isMenuOpen: !isMenuOpen })
  }

  render() {
    return (
      <React.Fragment>
        <div className="navbar">
          <div className="logo">
            <a>
              <span>{getIcon('logo')}</span>
            </a>
          </div>

          <div className="title">
            <p style={{ marginBottom: '6px' }}>
                Hipbar
            </p>
            <p>
                Gifting
            </p>
          </div>  
          <div className="nav-items">
            {
              this.navItems.map((item) => {
                return (
                  <a className="nav-item">
                    {item}
                  </a>
                )
              })
            }
          </div>
          <div className="navbar-menu">
            {
              !this.state.isMenuOpen ? 
                <span onClick={() => this.onToggle()}>{getIcon('logo')}</span>
                : <span onClick={() => this.onToggle()}>{getIcon('logo')}</span>
            }
          </div>
          <div className={`navbar-mobile ${this.state.isMenuOpen ? 'show' : 'hide'}`}>
            <ul>
              {
                this.navItems.map((item, index) => {
                  return (
                    <li key={index}>
                      <a>
                        {item}
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Header