import React from 'react'
import './signup.scss'
import { unMountModal, mountModal } from 'Components/modal-box/utils'
import ModalBox from '../components/modal-box/modalBox'
import Icon from "Components/icon"
import SignIn from './../SignIn'
import { Api } from '../utils/config'
import {createSession} from 'Utils/session-utils'

export default function SignUp(data) {
  return class SignUp extends React.Component {
    constructor(props) {
      super(props)
      //console.log("data", data)
      this.state = {
        otpSent: false,
        mobileNo: data.mobile ? data.mobile : "",
        disableField: data.mobile ? true : false,
        name: "",
        email: "",
        otp: "",
        errorInSignUp: false,
        isGettingOtp: false,
        isSigningUp: false,
        mobileErr: {
          value: "",
          status: ""
        },
        nameErr: {
          value: "",
          status: ""
        },
        emailErr: {
          value: "",
          status: ""
        },
        otpErr: {
          value: "",
          status: ""
        }
      }
      this.handleClick = this.handleClick.bind(this)
      this.signUp = this.signUp.bind(this)
      this.resendOtp = this.resendOtp.bind(this)
      this.handleTextChange = this.handleTextChange.bind(this)
    }

    handleClick () {
      //console.log("clikc")
      // unMountModal()
      // data.handleGetOtp()
      //this.setState({otpSent: true})
      this.signUp()
    }

    signUp() {
      //console.log("data", data)
      // unMountModal()
      // data.handleSignIn()
      //this.setState({otpSent: false, isMobile: false})
      //location.href="/using-gift-card"
      const payload = {
        info: {},
        mobile: this.state.mobileNo,
        email: this.state.email,
        username: this.state.name
      }
      const fetchOptions = {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        //credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(payload)
      }
      this.setState({errorInSignUp: false, isSigningUp: true})
      fetch(`${Api.blogicUrl}/consumer/auth/otp-signup`, fetchOptions)
        .then((response) => {
          if(response.status === 409) {
            unMountModal()
            mountModal(SignIn({
              otpSent: true,
              mobile: this.state.mobileNo
            }))
          } else if(response.status !== 400){
            this.getOtp()
            this.setState({isSigningUp: false})
          }
          //return
        })
        .catch((err) => {
          this.setState({errorInSignUp: true})
        })
    }

    login() {
      const payload = {
        info: {},
        mobile: this.state.mobileNo,
        otp: this.state.otp
      }
      const fetchOptions = {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        //credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(payload)
      }
      this.setState({errorInSignIn: false, isSigningUp: true})
      fetch(`${Api.blogicUrl}/consumer/auth/otp-login`, fetchOptions)
        .then((response) => {
          response.json().then((data) => {
            createSession(data)
            unMountModal()
            this.setState({isSigningUp: false})
          })
        })
        .catch((err) => {
          this.setState({errorInSignUp: true})
        })
    }

    getOtp() {
      const payload = {
        info: {},
        mobile: this.state.mobileNo
      }
      const fetchOptions = {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        //credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(payload)
      }
      this.setState({errorInSignUp: false, isGettingOtp: true})
      fetch(`${Api.blogicUrl}/consumer/auth/otp-login`, fetchOptions)
        .then((response) => {
          if (response.status === 401) {
            this.setState({otpSent: true, disableField: true})
          }
          this.setState({isGettingOtp: false})
          return
        })
        .catch((err) => {
          this.setState({errorInSignUp: true})
        })
    }

    resendOtp() {
      //this.setState({otpSent: true})
      this.getOtp()
    }

    handleTextChange(e) {
      this.setState({[e.target.name]: e.target.value})
    }

    render() {
      const {otpSent} = this.state
      return (
        <div>
          {
            <ModalBox>
              <div id="SignUp">
                <h2 className="header os s2">
                  Sign up with HipBar
                </h2>
                <div className="page-body">
                  <label>Phone Number</label>
                  <div style={{display: 'flex'}}>
                    <div className="country-code">
                      +91
                    </div>
                    <div style={{width: 'calc(100% - 40px'}}>
                      <input 
                        type="text"
                        name="mobileNo"
                        disabled={this.state.disableField}
                        value={this.state.mobileNo}
                        autocomplete="off"
                        onChange={(e) => this.handleTextChange(e)}
                      />
                    </div>
                  </div>
                  {   
                    otpSent &&
                    <div className="note os s7">Otp has been sent</div>
                  }
                  <label>Name</label>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={this.state.name}
                      disabled={this.state.disableField && this.state.otpSent}
                      autocomplete="off"
                      onChange={(e) => this.handleTextChange(e)} 
                    />
                  </div>
                  <label>Email Address</label>
                  <div>
                    <input 
                      type="text"
                      name="email"
                      value={this.state.email}
                      disabled={this.state.disableField && this.state.otpSent} 
                      autocomplete="off"
                      onChange={(e) => this.handleTextChange(e)} 
                    />
                  </div>
                  {
                    otpSent &&
                    <div>
                      <label>OTP</label>
                      <div className="input-otp-container">
                        <input 
                          type="text"
                          name="otp"
                          value={this.state.otp}
                          //disabled={this.state.disableField}
                          autocomplete="off"
                          onChange={(e) => this.handleTextChange(e)} 
                        />
                        <div className="resend" onClick={this.resendOtp}>Resend</div>
                      </div>
                    </div>
                  }
                </div>
                <div className="page-footer">
                  {
                    !otpSent 
                    ? <React.Fragment>
                        <button className='btn btn-secondary os s7' onClick={unMountModal}>CANCEL</button>
                        <button className='btn btn-primary os s7' onClick={this.handleClick}>GET OTP</button>
                      </React.Fragment>
                    : <React.Fragment>
                        <button className='btn btn-secondary os s7' onClick={unMountModal}>CANCEL</button>
                        <button className='btn btn-primary os s7' onClick={this.login}>SIGN UP</button>
                      </React.Fragment>
                  } 
                </div>
              </div>
            </ModalBox>
          }
        </div>
      )
    }
  }
//export default SignIn
}