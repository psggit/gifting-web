import React from "react"
//import { getIcon } from "Utils/icon-utils";
import "./navbar.scss"
import Icon from "Components/icon"
import Button from "Components/button"
import SignIn from "./../../SignIn"
import SignUp from "./../../SignUp"
import { mountModal, unMountModal } from 'Components/modal-box/utils'
import {Api} from 'Utils/config'
import {createSession, clearSession, getUsername} from 'Utils/session-utils'
import NotifyError from './../../NotifyError';
import {ThemeProvider, ThemeContext} from "./../../ThemeProvider"
// import { NavLink } from 'react-router-dom'
const ThemeConsumer = ThemeContext.Consumer

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false,
      //errorInSignIn: false,
      showDropdown: false,
      username: localStorage.getItem("username"),
      isLoggedIn: localStorage.getItem("hasura-id") ? true : false
    }
    console.log("login", localStorage.getItem("hasura-id") ? true : false)
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
    //this.handleMouseOver = this.handleMouseOver.bind(this)
    //this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    //this.reloadHeader = this.reloadHeader.bind(this)
    //this.handleLink = this.handleLink.bind(this)
  }

  componentDidMount() {
    this.links = document.querySelectorAll(".nav-items a div")
    //console.log("links", this.links)
    // if(localStorage.getItem('isLoggedIn') === "false" || localStorage.getItem('isLoggedIn') === "undefined") {
    //   this.setState({isLoggedIn: false })
    // } else if(localStorage.getItem('isLoggedIn') === "true") {
    //   this.setState({isLoggedIn: true })
    // }
    //console.log("header mount", this.props)
    //this.setState({isLoggedIn: this.props.paramObj && this.props.paramObj.isLoggedIn ? this.props.paramObj.isLoggedIn  : ""})
    this.setState({isLoggedIn: localStorage.getItem("hasura-id") ? true  : false})
    this.setState({username: localStorage.getItem("username")})
    // if(this.props.paramObj && this.props.paramObj.username) {
    //   this.setState({username: this.props.paramObj.username})
    // }

    // if(!this.state.isLoggedIn) {
    //   setTimeout(()=> {localStorage.setItem("showAgeGate", true)}, 1000)
    // }
  }

  // componentDidUpdate(prevProps) {
  //   console.log("helo", prevProps)
  //   if (prevProps.paramObj && (prevProps.paramObj.username !== this.props.paramObj.username || prevProps.paramObj.isLoggedIn !== this.props.paramObj.isLoggedIn)) {
  //     console.log("if")
  //     this.setState({ username: this.props.paramObj.username, isLoggedIn: this.props.paramObj.isLoggedIn})
  //   }
  // }

  // reloadHeader(loginStatus) {
  //   // if(localStorage.getItem('isLoggedIn') === "true") {
  //   //   this.setState({isLoggedIn: true})
  //   // } else if(localStorage.getItem('isLoggedIn') === "false") {
  //   //   this.setState({isLoggedIn: false})
  //   // }
  //   this.setState({isLoggedIn: loginStatus})
  // }

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

  // handleLink(e) {
  //   // e.preventDefault()
  //   // this.props.history.push(e.target.href)
  // }
  
  handleClick() {
    this.setState({ isMenuOpen: false })
    mountModal(SignIn({
      //reload: this.reloadHeader
    }))
  }

  // handleMouseOver(e) {
  //   this.links.forEach(link => {
  //     //link.style.opacity = 0.6
  //     //e.target.style.opacity = 1
  //   })
  // }

  // handleMouseOut() {
  //   this.links.forEach(link => {
  //     //link.style.opacity = 1
  //   })
  // }

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
    //console.log("props", this.props, this.props.history)
    //history.pushState(null, "transaction history", '/transaction-history')
    location.href="/transaction-history"
  }

  render() {
    const {showDropdown} = this.state
    //console.log("header state", this.props)
    return (
      <ThemeProvider>
        <ThemeConsumer>
          {(paramObj) => {
            const {isLoggedIn} = this.state
            return (
            <div className="navbar">
        {/* <div className="logo"> */}
        
        {/* </div> */}

        {/* <div className="title">
          <p style={{ marginBottom: "6px" }}>
              HipBar
          </p>
          <p>
              Gifting
          </p>
        </div>   */}
        {/* <div className="navbar-logo" >
          {
            this.state.isMenuOpen 
            ? <span onClick={() => {location.href="/"}}><Icon name="hipbarLogoMobile" /></span>
            : <span onClick={() => {location.href="/"}}><Icon name="hipbarLogo" /></span>
          }
        </div> */}
        <div className="nav-items">
          {
            this.navItems.map((item, index) => (
              <a id={`nav-item-${index+1}`} className={location.pathname.slice(1) === item.value ? "active" : undefined} href={`/${item.value}`}  key={`nav-item-${index+1}`}>
                <div
                  onClick={this.handleLink}
                  className="nav-item os s7" 
                  key={index}
                  //onMouseOut={this.handleMouseOut}
                  //onMouseOver={this.handleMouseOver}
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
            // <Button onClick={() => this.handleSignOut()} primary size="small">SIGN OUT</Button>
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
        <div className="navbar-logo" >
          {
            this.state.isMenuOpen 
            ? <span style={{cursor: 'pointer'}} onClick={() => {location.href="/"}}><Icon name="hipbarLogoMobile" /></span>
            : <span style={{cursor: 'pointer'}} onClick={() => {location.href="/"}}><Icon name="hipbarLogo" /></span>
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
                  <a className={location.pathname.slice(1) === item.value ? "active" : undefined} onClick={this.handleLink} href={`/${item.value}`} className="os s2">
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
                <button onClick={() => this.handleSignOut()} className="btn btn-secondary os s2">SIGN OUT</button>
              </li>
            }
            {
              !isLoggedIn &&
              <li>
                <button onClick={() => this.handleClick()} className="btn btn-secondary os s2">SIGN IN</button>
              </li>
            }
          </ul>
        </div>
      </div>
          )}}
        </ThemeConsumer>
      </ThemeProvider>
    )
  }
}

export default Header