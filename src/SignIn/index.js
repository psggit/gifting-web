import React from 'react'
import './signin.scss'
import { unMountModal } from 'Components/modal-box/utils'
import ModalBox from '../components/modal-box/modalBox'
import Icon from "Components/icon"

export default function SignIn(data) {
  return class SignIn extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        //isMobile: props ? props.isMobile : false,
        otpSent: data ? data.otpSent : false,
      }
      this.handleClick = this.handleClick.bind(this)
      this.signIn = this.signIn.bind(this)
      //this.resendOtp = this.resendOtp.bind(this)
    }

    handleClick () {
      //console.log("clikc")
      unMountModal()
      data.handleProceed()
      //this.setState({otpSent: true})
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

    render() {
      //console.log("redr")
      const {otpSent} = this.state
      return (
        <div id="signin">
          {
            <ModalBox>
              <div id="SignIn">
                <h2 className="header os s2">
                  Sign In / Sign Up with mobile number
                </h2>
                <div className="page-body">
                  <label>Phone Number</label>
                  <div>
                    <input type="text" />
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
                        <input type="text" />
                        <div className="resend" onClick={this.resendOtp}>Resend</div>
                      </div>
                    </React.Fragment>
                    
                  }
                </div>
                <div className="page-footer">
                  {
                    !otpSent 
                    ? <React.Fragment>
                        <button className='btn btn-secondary os s7' onClick={unMountModal}>CANCEL</button>
                        <button className='btn btn-primary os s7' onClick={this.handleClick}>PROCEED</button>
                      </React.Fragment>
                    : <React.Fragment>
                        <button className='btn btn-secondary os s7' onClick={unMountModal}>CANCEL</button>
                        <button className='btn btn-primary os s7' onClick={this.signIn}>SIGN IN</button>
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