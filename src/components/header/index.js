import React from "react"
//import { getIcon } from "Utils/icon-utils";
import "./navbar.scss"
import Icon from "Components/icon"
import Button from "Components/button"
import SignIn from "./../../SignIn"
import SignUp from "./../../SignUp"
import { mountModal } from 'Components/modal-box/utils'
import {Api} from 'Utils/config'
import {createSession, clearSession, getUsername} from 'Utils/session-utils'
import NotifyError from './../../NotifyError';

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false,
      errorInSignIn: false,
      showDropdown: false
    }
    this.navItems = [
      {
        label: "Send Gift Cards",
        value: "send-gift"
      },
      {
        label: "Using Gift Cards",
        value: "using-gift-card"
      },
      {
        label: "Retailer Outlets",
        value: "retailer-outlets"
      },
      {
        label: "Support",
        value: "support"
      }
    ]
    this.onToggle = this.onToggle.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.reloadHeader = this.reloadHeader.bind(this)
  }

  componentDidMount() {
    this.links = document.querySelectorAll(".nav-items a")
    if(localStorage.getItem('isLoggedIn') === "false" || localStorage.getItem('isLoggedIn') === "undefined") {
      this.setState({isLoggedIn: false })
    } else if(localStorage.getItem('isLoggedIn') === "true") {
      this.setState({isLoggedIn: true })
    }
  }

  reloadHeader() {
    if(localStorage.getItem('isLoggedIn') === "true") {
      this.setState({isLoggedIn: true})
    } else if(localStorage.getItem('isLoggedIn') === "false") {
      this.setState({isLoggedIn: false})
    }
  }

  handleSignOut() {
    const fetchOptions = {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //credentials: 'include',
      mode: 'cors',
    }

    fetch(`${Api.blogicUrl}/consumer/auth/user/logout`, fetchOptions)
      .then((response) => {
        this.setState({isLoggedIn: false})
        location.href = "/"
        //setTimeout(() => {
        clearSession()
        //}, 1000)
      })
      .catch((err) => {
        //console.log("Error in logout", err)
        mountModal(NotifyError({}))
      })
  }
  
  handleClick() {
    mountModal(SignIn({
      reload: this.reloadHeader
    }))
  }

  handleMouseOver(e) {
    this.links.forEach(link => {
      link.style.opacity = 0.6
      e.target.style.opacity = 1
    })
  }

  handleMouseOut() {
    this.links.forEach(link => {
      link.style.opacity = 1
    })
  }

  openDropdown() {
    const {showDropdown} = this.state
    this.setState({showDropdown: !showDropdown})
  }

  onToggle() {
    const {isMenuOpen} = this.state
    this.setState({ isMenuOpen: !isMenuOpen })
  }

  render() {
    const {isLoggedIn, showDropdown} = this.state
    return (
      <div className="navbar">
        <div className="logo">
          <a>
            <Icon name="hipbarLogo" />
          </a>
        </div>

        <div className="title">
          <p style={{ marginBottom: "6px" }}>
              Hipbar
          </p>
          <p>
              Gifting
          </p>
        </div>  
        <div className="nav-items">
          {
            this.navItems.map((item, index) => (
              <a
                href={`/${item.value}`}
                className="nav-item" key={index}
                onMouseOut={this.handleMouseOut}
                onMouseOver={this.handleMouseOver}
              >
                {item.label}
              </a>
            ))
          }
          {
            !isLoggedIn && 
            <Button onClick={() => this.handleClick()} primary size="small">SIGN IN</Button>
          }
          {
            isLoggedIn && 
            // <Button onClick={() => this.handleSignOut()} primary size="small">SIGN OUT</Button>
            <div className="logout">
              <Icon name="appUser" style={{marginRight: '10px'}}/>
              <div className="os s2"  style={{marginRight: '8px'}} >{localStorage.getItem("username")}</div>
              <span onClick={() => this.openDropdown()}>
                <Icon name="downArrow" />
              </span>

              <div className={`dropdown-menu ${showDropdown ? 'show' : 'hide'}`} >
                <div onClick={() => this.handleSignOut()} className="menu-item"> Sign Out</div>
              </div>
            </div>
          }
          {/* {
            showDropdown &&
            <div className="dropdown-menu">
              <div className="menu-item"> Sign Out</div>
            </div>
          } */}
        </div>
        <div className="navbar-menu">
          {
            !this.state.isMenuOpen ? 
              <span onClick={() => this.onToggle()}><Icon name="menu" /></span>
              : <span onClick={() => this.onToggle()}><Icon name="cross" /></span>
          }
        </div>
        <div className={`navbar-mobile ${this.state.isMenuOpen ? "show" : "hide"}`}>
          <ul>
            {
              this.navItems.map((item, index) => (
                <li key={index}>
                  <a href={`/${item.value}`} className="os s2">
                    {item.label}
                  </a>
                </li>
              ))
            }
            <li>
              {
                isLoggedIn &&
                <button onClick={() => this.handleSignOut()} className="btn btn-secondary os s2">SIGN OUT</button>
              }
            </li>
            <li>
              {
                !isLoggedIn &&
                <button onClick={() => this.handleClick()} className="btn btn-secondary os s2">SIGN IN</button>
              }
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Header