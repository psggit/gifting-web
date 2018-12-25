import React from 'react'
import './signup.scss'
import { unMountModal } from 'Components/modal-box/utils'
import ModalBox from '../components/modal-box/modalBox'
import Icon from "Components/icon"

function checkStatus(response) {
  console.log("check sttus")
  if (response.status >= 200 && response.status <= 401) {
    return response
  } else {
    // console.log(response.statusText);
    var error = new Error(response.statusText)
    //console.log("res", response)
    //var error = new Error(response.error)
    error.response = response
    throw error
  }
}
export default function SignUp(data) {
  return class SignUp extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        //isMobile: props ? props.isMobile : false,
        otpSent: data ? data.otpSent : false,
      }
      this.handleClick = this.handleClick.bind(this)
      this.signUp = this.signUp.bind(this)
      this.resendOtp = this.resendOtp.bind(this)
    }

    handleClick () {
      //console.log("clikc")
      unMountModal()
      data.handleGetOtp()
      //this.setState({otpSent: true})
    }

    signUp() {
      //console.log("data", data)
      unMountModal()
      data.handleSignIn()
      //this.setState({otpSent: false, isMobile: false})
      //location.href="/using-gift-card"
    }

    resendOtp() {
      this.setState({otpSent: true})
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
                  <div>
                    <input type="text" />
                  </div>
                  {   
                    otpSent &&
                    <div className="note os s7">Otp has been sent</div>
                  }
                  <label>Name</label>
                  <div>
                    <input type="text" />
                  </div>
                  <label>Email Address</label>
                  <div>
                    <input type="text" />
                  </div>
                  {
                    otpSent &&
                    <div>
                      <label style={{margin: '10px 0'}}>OTP</label>
                      <div className="input-otp-container">
                        <input type="text" />
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
                        <button className='btn btn-primary os s7' onClick={this.signUp}>SIGN UP</button>
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