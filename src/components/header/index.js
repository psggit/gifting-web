import React from 'react'
import { getIcon } from 'Utils/icon-utils';
import './navbar.scss'
import Icon from "Components/icon"

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      isMenuOpen: false
    }
    this.navItems = ["Send Gift Cards", "Using Gift Cards", "Retailer Outlets", "Support", "SIGN IN"]
    this.onToggle = this.onToggle.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
  }

  componentDidMount() {
    this.links = document.querySelectorAll('.nav-items a')
  }

  handleMouseOver(e) {
    this.links.forEach(link => {
      link.style.opacity = 0.6
      e.target.style.opacity = 1
    })
  }

  handleMouseOut(e) {
    this.links.forEach(link => {
      link.style.opacity = 1
    })
  }

  onToggle() {
    const {isMenuOpen} = this.state
    this.setState({ isMenuOpen: !isMenuOpen })
  }

  render() {
    return (
      <div className="navbar">
        <div className="logo">
          <a>
            <Icon name="hipbarLogo" />
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
            this.navItems.map((item, index) => {
              return (
                <a className="nav-item" key={index}
                  onMouseOut={this.handleMouseOut}
                  onMouseOver={this.handleMouseOver}
                >
                  {item}
                </a>
              )
            })
          }
        </div>
        <div className="navbar-menu">
          {
            !this.state.isMenuOpen ? 
              <span onClick={() => this.onToggle()}><Icon name="menu" /></span>
              : <span onClick={() => this.onToggle()}><Icon name="cross" /></span>
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
    )
  }
}

export default Header