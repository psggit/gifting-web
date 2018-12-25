import React from 'react'
import './signin.scss'
import { unMountModal, mountModal } from 'Components/modal-box/utils'
import ModalBox from '../components/modal-box/modalBox'
import Icon from "Components/icon"
import {Api} from 'Utils/config'
import SignUp from './../SignUp'

// function checkStatus(response) {
//   console.log("check sttus", response)
//   if (response.status >= 200 && response.status <= 401) {
//     return response
//   } else {
//     // console.log(response.statusText);
//     var error = new Error(response.statusText)
//     //console.log("res", response)
//     //var error = new Error(response.error)
//     error.response = response
//     throw error
//   }
// }

export default function SignIn(data) {
  return class SignIn extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        //isMobile: props ? props.isMobile : false,
        otpSent: data ? data.otpSent : false,
        mobileNo: '',
        otpValue: '',
        errorInSignIn: false
      }
      this.handleClick = this.handleClick.bind(this)
      this.signIn = this.signIn.bind(this)
      this.handleTextChange = this.handleTextChange.bind(this)
      //this.resendOtp = this.resendOtp.bind(this)
    }

    handleClick () {
      //console.log("clikc")
      
      // data.handleGetOtp({
      //   info: {},
      //   mobile: this.state.mobileNo
      // })
      //this.setState({otpSent: true})

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
      this.setState({errorInSignIn: false, isGettingOtp: true})
      fetch(`${Api.blogicUrl}/consumer/auth/otp-login`, fetchOptions)
      .then((response) => {
          if (response.status === 400) {
            unMountModal()
            mountModal(SignUp({}))
            this.setState({isGettingOtp: false})
            return
          } else if (response.status === 401) {
            this.setState({otpSent: true})
          }
          this.setState({isGettingOtp: false})
          unMountModal()
          return
        })
        .catch((err) => {
          console.log("failure",err.status)
          this.setState({errorInSignIn: true})
        })
    }

    signIn() {
      //console.log("data", data)
      unMountModal()
      data.handleSignIn()
      //this.setState({otpSent: false, isMobile: false})
      //location.href="/using-gift-card"
    }

    // resendOtp() {
    //   this.setState({otpSent: true})
    // }

    // componentWillReceiveProps(newProps) {
    //   if(this.props.isMobile !== newProps.isMobile) {
    //     this.setState({isMobile: newProps.isMobile})
    //   }
    // }
    handleTextChange(e) {
      this.setState({[e.target.name]: e.target.value})
    }

    render() {
      //console.log("redr")
      const {otpSent, errorInSignIn, isGettingOtp} = this.state
      return (
        <div>
          {
            <ModalBox>
              <div id="SignIn">
                <h2 className="header os s2">
                  Sign In / Sign Up with mobile number
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
                        value={this.state.mobileNo}
                        autocomplete="off"
                        onChange={(e) => this.handleTextChange(e)}
                      />
                    </div>
                  </div>
                
                  {
                    otpSent &&
                    <React.Fragment>
                      <div className="note os s7">Otp has been sent</div>
                      <div className="alert-box">
                        <div style={{marginRight: '10px'}}>
                          <Icon name="alert" />
                        </div>
                        <div className="0s s2">
                          Welcome back to HipBar! Please enter the OTP to sign in.
                        </div>
                      </div>
                      <label>OTP</label>
                      <div className="input-otp-container">
                        <input 
                          type="text"
                          name="otpValue"
                          value={this.state.otpValue}
                          autoComplete="fefef"
                          onChange={(e) => this.handleTextChange(e)}
                        />
                        <div className="resend" onClick={this.resendOtp}>Resend</div>
                      </div>
                    </React.Fragment>
                    
                  }
                </div>
                <div className="page-footer">
                  {
                    !otpSent 
                    ? <React.Fragment>
                        <div>
                          {
                            //!isGettingOtp &&
                            <div>
                              <button className='btn btn-secondary os s7' onClick={unMountModal}>CANCEL</button>
                              <button className='btn btn-primary os s7' onClick={this.handleClick}>GET OTP</button> 
                            </div> 
                          }
                          {/* {
                            isGettingOtp &&
                            <div style={{display: 'flex', position: 'relative'}}>
                              <button className='btn btn-primary os s7 loader'>GET OTP</button>
                              <div style={{position: 'absolute'}}><Icon name="loader" /></div>
                            </div>
                          } */}
                        
                        </div>
                        
                      </React.Fragment>
                    : <React.Fragment>
                        <button className='btn btn-secondary os s7' onClick={unMountModal}>CANCEL</button>
                        <button className='btn btn-primary os s7' onClick={this.signIn}>SIGN IN</button>
                      </React.Fragment>
                  } 
                  {
                    errorInSignIn && 
                    <p>Something went wrong, please try again later</p>
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