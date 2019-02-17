import React from "react"
//import { getIcon } from "Utils/icon-utils";
import "./navbar.scss"
import Icon from "Components/icon"
import Button from "Components/button"
import SignIn from "./../../SignIn"
import { Api } from "Utils/config"
// import SignUp from "./../../SignUp"
import { mountModal, unMountModal } from 'Components/modal-box/utils'
import {createSession, clearSession, getUsername} from 'Utils/session-utils'
import NotifyError from './../../NotifyError';
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
      isLoggedIn: null
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
  }

  componentDidMount() {
    this.links = document.querySelectorAll(".nav-items a div")
    this.setState({isLoggedIn: localStorage.getItem("hasura-id") ? true  : false})
    this.setState({username: localStorage.getItem("username")})
  }

  handleSignOut() {
    this.setState({showDropdown: false})
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
        this.setState({isLoggedIn: false})
        location.href = "/"
        //setTimeout(() => {
        clearSession()
        window.fcWidget.user.clear().then(function() {
          console.log('User cleared')
        }, function() {
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
    mountModal(SignIn({
      //reload: this.reloadHeader
    }))
  }

  openDropdown() {
    const {showDropdown} = this.state
    this.setState({showDropdown: !showDropdown})
  }

  onToggle() {
    const {isMenuOpen} = this.state
    this.setState({ isMenuOpen: !isMenuOpen }, () => {
      document.body.style = !isMenuOpen ? "overflow:hidden" : "overflow:auto"
    })
  }

  handleTransactionHistory() {
    location.href="/transaction-history"
  }

  render() {
    const {showDropdown} = this.state
    const { isLoggedIn } = this.state
    //console.log("header state", this.props)
    return (
      <div className="navbar">
        <div className="nav-items">
          {
            this.navItems.map((item, index) => (
              <a id={`nav-item-${index+1}`} href={`/${item.value}`}  key={`nav-item-${index+1}`}>
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
            <span className="login">
              <Button onClick={() => this.handleClick()} primary size="small">SIGN IN</Button>
            </span>
          }
          {
            isLoggedIn && 
            <div className="logout" onClick={() => this.openDropdown()} >
              <span className="user">
                <Icon name="appUser" style={{marginRight: '10px'}}/>
              </span>
              <div className="os s7"  style={{marginRight: '8px'}} >{this.state.username}</div>
              <span style={{display: 'flex', alignSelf: 'center'}}>
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
        <div className="navbar-logo" >
          {
            this.state.isMenuOpen 
              ? <a href="/"><Icon name="hipbarLogoMobile" /></a>
              : <a href="/"><Icon name="hipbarLogo" /></a>
          }
        </div>
        <div className={`navbar-mobile ${this.state.isMenuOpen ? "show" : "hide"}`}>
          <ul>
            <li>
              {
                isLoggedIn &&
                <React.Fragment>
                  <span className="user" style={{marginRight: '10px'}}>
                    <Icon name="mobileApplnUser" />
                  </span>
                  <span style={{color: '#fff'}}>{this.state.username}</span>
                </React.Fragment>
              }
            </li>
            {
              this.navItems.map((item, index) => (
                <li key={index}>
                  <a onClick={this.handleLink} href={`/${item.value}`} className="os s2">
                    {item.label}
                  </a>
                </li>
              ))
            }
            {
              isLoggedIn &&
              <li>
                <a onClick={this.handleTransactionHistory} href={`/transaction-history`} className="os s2">
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