import React from "react"
//import { getIcon } from "Utils/icon-utils";
import "./navbar.scss"
import Icon from "Components/icon"
import Button from "Components/button"
import SignIn from "./../../SignIn"
import { Api } from "Utils/config"
import { readCookie } from "Utils/session-utils"
// import SignUp from "./../../SignUp"
import { mountModal, unMountModal } from 'Components/modal-box/utils'
import { createSession, clearSession, getUsername } from 'Utils/session-utils'
import NotifyError from './../../NotifyError'
// import {ThemeProvider, ThemeContext} from "./../../ThemeProvider"
import { GET } from "Utils/fetch"
// const ThemeConsumer = ThemeContext.Consumer

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false,
      //errorInSignIn: false,
      showDropdown: false,
      username: "",
      isLoggedIn: null,
      activePath: ""
    }

    this.navItems = [
      {
        label: "Send Gift Cards",
        value: "send-gift"
      },
      {
        label: "Redeeming Gift Cards",
        value: "how-to-redeem"
      },
      {
        label: "Retail Outlets",
        value: "retail-outlet"
      },
      {
        label: "FAQs",
        value: "FAQs"
      }
    ]
    this.onToggle = this.onToggle.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.checkActiveClass = this.checkActiveClass.bind(this)
  }

  componentDidMount() {
    this.links = document.querySelectorAll(".nav-items a div")
    this.setState({ isLoggedIn: localStorage.getItem("hasura-id") ? true : false })
    this.setState({ username: localStorage.getItem("username") })
    this.setState({ activePath: location.pathname.slice(1) })
  }

  handleSignOut() {
    this.setState({ showDropdown: false })
    const fetchOptions = {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
    }

    fetch(`${Api.blogicUrl}/consumer/auth/user/logout`, fetchOptions)
      .then((response) => {
        this.setState({ isLoggedIn: false })
        const notAllowedUrls = [
          "/transaction-successful",
          "/transaction-failure",
          "/transaction-cancelled",
          "/transaction-history",
          "/personalise",
          "/checkout"
        ]
        if (notAllowedUrls.indexOf(location.pathname) > -1) {
          location.href = "/send-gift"
        } else {
          location.href = location.pathname
        }
        //setTimeout(() => {
        clearSession()
        window.fcWidget.user.clear().then(function () {
          console.log('User cleared')
        }, function () {
          console.log("User Not cleared")
        })
        //console.log("user status out", userStatus)
        //}, 1000)
      })
      .catch((err) => {
        //console.log("Error in logout", err)
        mountModal(NotifyError({}))
      })
  }


  handleClick() {
    this.setState({ isMenuOpen: false })
    if (window.gtag) {
      gtag("event", "point_of_signin", {
        "event_label": location.pathname,
      })
    }
    window.dataLayer.push({ "event": "point_of_signin", "page_name": location.pathname }) 
    mountModal(SignIn({
      //reload: this.reloadHeader
    }))
  }

  openDropdown() {
    const { showDropdown } = this.state
    this.setState({ showDropdown: !showDropdown })
  }

  freezeVp(e) {
    e.preventDefault()
  }

  stopBodyScroll(bool) {
    if (bool === true) {
      document.body.addEventListener("touchmove", this.freezeVp, false)
    } else {
      document.body.removeEventListener("touchmove", this.freezeVp, false)
    }
  }

  onToggle() {
    const { isMenuOpen } = this.state
    this.setState({ isMenuOpen: !isMenuOpen }, () => {
      document.body.style = this.state.isMenuOpen === true ? "overflow:hidden" : "overflow:auto"
      // document.body.style = this.state.isMenuOpen === false ? this.stopBodyScroll(true) : this.stopBodyScroll(false)
    })
  }

  handleTransactionHistory() {
    location.href = "/transaction-history"
  }

  checkActiveClass(path) {
    return this.state.activePath === path ? "active" : undefined
  }

  render() {
    const { showDropdown } = this.state
    const { isLoggedIn } = this.state
    //console.log("header state", this.props)
    return (
      <div className="navbar">
        <div className="navbar-logo" >
          {
            this.state.isMenuOpen
              ? <a href="/"><Icon name="hipbarLogoMobile" /></a>
              : <a href="/"><Icon name="hipbarLogoMobile" /></a>
          }
        </div>
        {/* <div>
          <p>HipBar</p>
          <p>Gifting</p>
        </div> */}
        <div className="nav-items">
          {
            this.navItems.map((item, index) => (
              <a id={`nav-item-${index + 1}`} className={this.checkActiveClass(item.value)} href={`/${item.value}`} key={`nav-item-${index + 1}`}>
                <div
                  onClick={this.handleLink}
                  className="nav-item os s7"
                  key={index}
                >
                  {item.label}
                </div>
              </a>
            ))
          }
          {
            !isLoggedIn &&
            <div className="login">
              <Button onClick={() => this.handleClick()} primary size="small">SIGN IN</Button>
            </div>
          }
          {
            isLoggedIn &&
            <div className="logout" onClick={() => this.openDropdown()} >
              <span className="user">
                <Icon name="appUser" style={{ marginRight: '10px' }} />
              </span>
              <div className="os s7" style={{ marginRight: '8px' }} >{this.state.username}</div>
              <span style={{ display: 'flex', alignSelf: 'center' }}>
                <Icon name="filledDownArrow" />
              </span>

              <div className={`dropdown-menu ${showDropdown ? 'show' : 'hide'}`} >
                <div onClick={() => this.handleTransactionHistory()} className="menu-item os s9">Transaction History</div>
                <div onClick={() => this.handleSignOut()} className="menu-item os s9"> Sign Out</div>
              </div>
            </div>
          }
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
            <li>
              {
                isLoggedIn &&
                <React.Fragment>
                  <span className="user" style={{ marginRight: '10px' }}>
                    <Icon name="mobileApplnUser" />
                  </span>
                  <span style={{ color: '#fff' }}>{this.state.username}</span>
                </React.Fragment>
              }
            </li>
            {
              this.navItems.map((item, index) => (
                <li className={this.checkActiveClass(item.value)} key={index}>
                  <a onClick={this.handleLink} href={`/${item.value}`}>
                    {item.label}
                  </a>
                </li>
              ))
            }
            {
              isLoggedIn &&
              <li>
                <a onClick={this.handleTransactionHistory} href={`/transaction-history`}>
                  Transaction History
                </a>
              </li>
            }
            {
              isLoggedIn &&
              <li>
                <Button onClick={() => this.handleSignOut()} secondary>SIGN OUT</Button>
              </li>
            }
            {
              !isLoggedIn &&
              <li>
                <Button onClick={() => this.handleClick()} secondary>SIGN IN</Button>
              </li>
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Header