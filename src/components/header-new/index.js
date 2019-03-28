import React from "react"
import "./header.scss"
import Icon from "Components/icon"
import {ThemeProvider, ThemeContext} from "./../../ThemeProvider"
import { mountModal } from 'Components/modal-box/utils'
import SignIn from "./../../SignIn"
import {Api} from 'Utils/config'
import NotifyError from './../../NotifyError';
import {createSession, clearSession, getUsername} from 'Utils/session-utils'
const ThemeConsumer = ThemeContext.Consumer

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false,
      // username: localStorage.getItem("username"),
      // isLoggedIn: localStorage.getItem("hasura-id") ? true : false
    }
    this.navItems = [
      {
        label: "Home",
        value: "home"
      },
      {
        label: "Catalogue",
        value: "catalogue"
      },
      {
        label: "Who We Are",
        value: "who-we-are"
      },
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
    this.setState({isLoggedIn: localStorage.getItem("hasura-id") ? true  : false})
    this.setState({username: localStorage.getItem("username")})
  }

  handleClick() {
    const {isMenuOpen} = this.state
    this.setState({ isMenuOpen: !isMenuOpen })
    mountModal(SignIn({
      //reload: this.reloadHeader
    }))
  }

  handleSignOut() {
    //this.setState({showDropdown: false})
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


  handleTransactionHistory() {
    location.href="/transaction-history"
  }

  onToggle() {
    const {isMenuOpen} = this.state
    this.setState({ isMenuOpen: !isMenuOpen }, () => {
      document.body.style = !isMenuOpen ? "overflow:hidden" : "overflow:auto"
    })
  }

  render() {
    return (
      <ThemeProvider>
        <ThemeConsumer>
          {(paramObj) => {
            const {isLoggedIn} = this.state
            return (
              <div className="page-header">
                <div className="menu-icon">
                  {
                    !this.state.isMenuOpen ? 
                      <div onClick={this.onToggle}><Icon name="menu" /></div>
                      : <div onClick={this.onToggle}><Icon name="cross" /></div>
                  }
                </div>
                <div className="company-logo" >
                  <span style={{cursor: 'pointer'}} onClick={() => {location.href="/"}}>
                    <Icon name="hipbarLogoWhite" />
                  </span>
                </div>
                <div className={`menu-items ${this.state.isMenuOpen ? "show" : "hide"}`}>
                  <ul>
                    {
                      this.navItems.map((item, index) => (
                        <li key={index}>
                          <a 
                            className={location.pathname.slice(1) === item.value ? "active" : undefined} 
                            onClick={this.handleLink} href={`/${item.value}`} 
                            className="ft s3"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))
                    }
                    {
                      isLoggedIn &&
                      <li>
                        <a onClick={() => this.handleTransactionHistory()} className="ft s3">
                            Transaction History
                        </a>
                      </li>
                    }
                    {
                      isLoggedIn &&
                      <li>
                        <a onClick={() => this.handleSignOut()} className="ft s3">
                            Sign Out
                        </a>
                      </li>
                    }
                    {
                      !isLoggedIn &&
                      <li>
                        {/* <button onClick={() => this.handleSignOut()} className="btn btn-secondary os s2">
                          Sign In
                        </button> */}
                        <a onClick={() => this.handleClick()} className="ft s3">
                            Sign In
                        </a>
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