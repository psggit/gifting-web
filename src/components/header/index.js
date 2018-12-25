import React from "react"
//import { getIcon } from "Utils/icon-utils";
import "./navbar.scss"
import Icon from "Components/icon"
import Button from "Components/button"
import SignIn from "./../../SignIn"
import SignUp from "./../../SignUp"
import { mountModal } from 'Components/modal-box/utils'
import {Api} from 'Utils/config'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false,
      errorInSignIn: false
    }
    this.navItems = ["Send Gift Cards", "Using Gift Cards", "Retailer Outlets", "Support"]
    this.onToggle = this.onToggle.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleClick = this.handleClick.bind(this)
    //this.getOtp = this.getOtp.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.getSignUpOtp = this.getSignUpOtp.bind(this)
    //this.handleSignIn = this.handleSignIn.bind(this)
  }

  componentDidMount() {
    this.links = document.querySelectorAll(".nav-items a")
  }
  
  handleClick() {
    //console.log("props header", this.props, this.props.history)
    //location.href="/sign-in"
    mountModal(SignIn({
      handleGetOtp: this.getOtp,
      //otpSent: false
    }))
    // mountModal(SignUp({
    //   handleGetOtp: this.getSignUpOtp,
    //   otpSent: false
    // }))
  }

  // getOtp(payloadObj) {
  //   console.log("get otp")
  //   //Api.verifyUser(payloadObj)
  //   const fetchOptions = {
  //     method: 'post',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     //credentials: 'include',
  //     mode: 'cors',
  //     body: JSON.stringify(payloadObj)
  //   }

  //   //this.setState({isSubmitting: true})

  //   fetch(`${Api.blogicUrl}/consumer/auth/otp-login`, fetchOptions)
  //     .then((response) => {
  //       console.log("success")
  //       if (response.status === 400) {
  //         mountModal(SignUp({
  //           handleSignUp: this.handleSignUp,
  //           //otpSent: true
  //         }))
  //       } else if (response.status === 401) {
  //         mountModal(SignIn({
  //           handleSignIn: this.handleSignIn,
  //           otpSent: true
  //         }))
  //       }
  //     })
  //     .catch((err) => {
  //       this.setState({errorInSignIn: true})
  //     })
  //   // mountModal(SignIn({
  //   //   handleSignIn: this.handleSignIn,
  //   //   otpSent: true
  //   // }))
  // }

  // handleSignIn() {
  //   console.log("signIn")
  // }

  getSignUpOtp() {
    mountModal(SignUp({
      handleSignIn: this.handleSignUp,
      otpSent: true
    }))
  }

  handleSignUp() {
    console.log("sign up")
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
                className="nav-item" key={index}
                onMouseOut={this.handleMouseOut}
                onMouseOver={this.handleMouseOver}
              >
                {item}
              </a>
            ))
          }
          <Button onClick={() => this.handleClick()} primary size="small">Sign in</Button>
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
                  <a href="/">
                    {item}
                  </a>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Header