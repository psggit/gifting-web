import React from "react"
//import { getIcon } from "Utils/icon-utils";
import "./navbar.scss"
import Icon from "Components/icon"
import Button from "Components/button"
import SignIn from "./../../SignIn"
import SignUp from "./../../SignUp"
import { mountModal } from 'Components/modal-box/utils'
import {Api} from 'Utils/config'
import {createSession} from 'Utils/session-utils'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false,
      errorInSignIn: false,
      //isLoggedIn: ""
    }
    this.navItems = ["Send Gift Cards", "Using Gift Cards", "Retailer Outlets", "Support"]
    this.onToggle = this.onToggle.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.reloadHeader = this.reloadHeader.bind(this)
    //this.getOtp = this.getOtp.bind(this)
    // this.handleSignUp = this.handleSignUp.bind(this)
    // this.getSignUpOtp = this.getSignUpOtp.bind(this)
    //this.handleSignIn = this.handleSignIn.bind(this)
  }

  componentDidMount() {
    // const fetchOptions = {
    //   method: 'get',
    //   credentials: 'include',
    //   mode: 'cors',
    //   //'x-hasura-role': 'user'
    // }

    // fetch(`${Api.authUrl}/user/account/info`, fetchOptions)
    //   .then((response) => {
    //     if (response.status !== 200) {
    //       this.setState({isLoggedIn: false })
    //       localStorage.clear()
    //       localStorage.setItem("isLoggedIn", "false")
    //       return
    //     }
    //     response.json().then((data) => {
    //       createSession(data, "true")
    //       this.setState({isLoggedIn: true })
    //     })
    //   })
    //   .catch((err) => {
    //     localStorage.setItem("isLoggedIn", "false")
    //     this.setState({isLoggedIn: false })
    //   })
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
      //body: JSON.stringify(payload)
    }
    //this.setState({errorInSignIn: false, isSigningIn: true})
    fetch(`${Api.blogicUrl}/consumer/auth/user/logout`, fetchOptions)
      .then((response) => {
        console.log("success")
        localStorage.clear()
        localStorage.setItem("isLoggedIn", "false")
        this.setState({isLoggedIn: false})
      })
      .catch((err) => {
        console.log("Error in logout", err)
      })
  }
  
  handleClick() {
    //console.log("props header", this.props, this.props.history)
    //location.href="/sign-in"
    mountModal(SignIn({
      handleGetOtp: this.getOtp,
      reload: this.reloadHeader
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

  // getSignUpOtp() {
  //   mountModal(SignUp({
  //     handleSignIn: this.handleSignUp,
  //     otpSent: true
  //   }))
  // }

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
    const {isLoggedIn} = this.state
    console.log("loggeg in", isLoggedIn, !isLoggedIn)
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
          {
            !isLoggedIn && 
            <Button onClick={() => this.handleClick()} primary size="small">SIGN IN</Button>
          }
          {
            isLoggedIn && 
            <Button onClick={() => this.handleSignOut()} primary size="small">SIGN OUT</Button>
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
            {
              this.navItems.map((item, index) => (
                <li key={index}>
                  <a href="/" className="os s2">
                    {item}
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