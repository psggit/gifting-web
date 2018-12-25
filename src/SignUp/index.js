import React from 'react'
import './signup.scss'
import { unMountModal } from 'Components/modal-box/utils'
import ModalBox from '../components/modal-box/modalBox'
import Icon from "Components/icon"

export default function SignUp(data) {
  return class SignUp extends React.Component {
    constructor(props) {
      super(props)
      console.log("data", data)
      this.state = {
        otpSent: data ? data.otpSent : false,
        mobileNo: data.mobile ? data.mobile : '',
        disableField: data.mobile ? true : false,
        name: '',
        email: ''
      }
      this.handleClick = this.handleClick.bind(this)
      this.signUp = this.signUp.bind(this)
      this.resendOtp = this.resendOtp.bind(this)
      this.handleTextChange = this.handleTextChange.bind(this)
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
                      autocomplete="off"
                      onChange={(e) => this.handleTextChange(e)} 
                    />
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