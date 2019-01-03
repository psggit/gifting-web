import React from 'react'
import './signin.scss'
import { unMountModal, mountModal } from 'Components/modal-box/utils'
import ModalBox from '../components/modal-box/modalBox'
import Icon from "Components/icon"
import {Api} from 'Utils/config'
import SignUp from './../SignUp'
import {createSession} from 'Utils/session-utils'
import { checkCtrlA, validateNumType, checkCtrlV, checkCtrlC } from 'Utils/logic-utils'
import { validateNumberField } from 'Utils/validators'
import { validateTextField } from '../utils/validators';
import NotifyError from './../NotifyError';
import Button from "Components/button"

export default function SignIn(data) {
  return class SignIn extends React.Component {
    constructor(props) {
      super(props)
      this.inputNameMap ={
        mobileNo: "Mobile number",
        otp: "Otp"
      }

      this.state = {
        otpSent: data.otpSent ? data.otpSent : false,
        mobileNo: data.mobile ? data.mobile : "",
        otp: "",
        errorInSignIn: false,
        resentOtp: false,
        disableField: data.otpSent ? true : false,
        isSigningIn: false,
        mobileNoErr: {
          value: "",
          status: false
        },
        otpErr: {
          value: "",
          status: false
        }
      }
      this.handleClick = this.handleClick.bind(this)
      this.signIn = this.signIn.bind(this)
      this.handleTextChange = this.handleTextChange.bind(this)
      this.verifyUserAndGetOtp = this.verifyUserAndGetOtp.bind(this)
      this.resendOtp = this.resendOtp.bind(this)
      this.isFormValid = this.isFormValid.bind(this)
    }

    verifyUserAndGetOtp(dataObj) {
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
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(payload)
      }
      this.setState({errorInSignIn: false, isGettingOtp: true})
      fetch(`${Api.blogicUrl}/consumer/auth/otp-login`, fetchOptions)
        .then((response) => {
          response.json().then((responseData) => {
            if (response.status === 400 && responseData.errorCode && responseData.errorCode.includes("invalid-user")) {
              if(dataObj.unMountModal) {
                unMountModal()
              }
              mountModal(SignUp({
                mobile: this.state.mobileNo,
                //reload: data.reload
              }))
              this.setState({isGettingOtp: false})
              return
            } else if(response.status === 400){
              this.setState({mobileNoErr: {status: true, value: "Invalid mobile number"}})
            } else if (response.status === 401) {
              this.setState({otpSent: true, disableField: true})
              if(dataObj.resendOtp) {
                this.setState({resentOtp : true})
              }
            }
            this.setState({isGettingOtp: false})
          })
        })
        .catch((err) => {
          this.setState({errorInSignIn: true, isGettingOtp: false})
          //this.setState({isGettingOtp: false})
          mountModal(NotifyError({}))
        })
    }

    isFormValid() {
      const {otpSent} = this.state
      let otpErr = this.state.otpErr

      const mobileNoErr = validateNumberField(this.inputNameMap['mobileNo'], this.state.mobileNo)
      this.setState({mobileNoErr: validateNumberField(this.inputNameMap['mobileNo'], this.state.mobileNo)})
      
      if(otpSent) {
        otpErr = validateTextField(this.inputNameMap['otp'], this.state.otp)
        this.setState({otpErr: validateTextField(this.inputNameMap['otp'], this.state.otp)})
      }
    
      if (!mobileNoErr.status && !otpErr.status && !otpSent) {
        return true
      }
      return false
    }

    handleClick () {
      if(this.isFormValid() && !this.state.isGettingOtp) {
        this.verifyUserAndGetOtp({unMountModal: true, resendOtp: false})
      }
    }

    handleNumberChange(e) {
      const errName = `${e.target.name}Err`

      if(validateNumType(e.keyCode) || checkCtrlA(e) || checkCtrlV(e) || checkCtrlC(e)) {
        this.setState({ 
          [e.target.name]: (e.target.value).trim(),
          //[errName]:  validateNumberField(this.inputNameMap[e.target.name], e.target.value)
        })
      } else {
        e.preventDefault()
      }   
    }

    signIn() {
      if(!this.state.isSigningIn) {
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
          credentials: 'include',
          mode: 'cors',
          body: JSON.stringify(payload)
        }
        this.setState({errorInSignIn: false, isSigningIn: true})
        fetch(`${Api.blogicUrl}/consumer/auth/otp-login`, fetchOptions)
          .then((response) => {
            response.json().then((responseData) => {
              if(response.status === 400 && responseData.errorCode.includes("invalid-otp")){
                this.setState({otpErr: {status: true, value: "Incorrect OTP. Please enter again or resend OTP"}})
                this.setState({isSigningIn: false})
                return
              } else if(response.status === 401 && responseData.errorCode.includes("role-invalid")){
                this.setState({otpErr: {status: true, value: responseData.message}})
                this.setState({isSigningIn: false})
                return
              } else if(response.status === 400 && responseData.errorCode.includes("expired-otp")){
                this.setState({otpErr: {status: true, value: responseData.message}})
                this.setState({isSigningIn: false})
                return
              }
              createSession(responseData, "true")
              //localStorage.setItem("showAgegate", false)
              location.href= (location.pathname)
              unMountModal()
              //data.reload(true)
              this.setState({isSigningIn: false})
            })
          })
          .catch((err) => {
            this.setState({errorInSignIn: true})
            mountModal(NotifyError({}))
          })
      }
    }

    resendOtp() {
      if(!this.state.isGettingOtp) {
        this.verifyUserAndGetOtp({unMountModal: false, resendOtp: true})
        //this.setState({})
      }
    }

    handleTextChange(e) {
      this.setState({[e.target.name]: (e.target.value).trim()})
    }

    render() {
      const {otpSent, isGettingOtp, mobileNoErr, otpErr, isSigningIn} = this.state
      const cursorStyle = {
        cursor: 'not-allowed'
      }
      return (
        <div>
          {
            <ModalBox>
              <div id="SignIn">
                {
                  !otpSent && 
                  <h2 className="header os s2">
                    Sign In / Sign Up with mobile number
                  </h2>
                }
                {
                  otpSent &&
                  <h2 className="header os s2">
                    Sign in with OTP
                  </h2>
                }
                <div className="page-body">
                  <div className="form-group">
                  <label className="os s7">Phone Number</label>
                  <div style={{display: 'flex'}}>
                    <div className={`country-code ${mobileNoErr.status ? 'error' : ''}`}>
                      +91
                    </div>
                    {/* <div style={{width: 'calc(100% - 40px'}}> */}
                      <input 
                        type="text"
                        name="mobileNo"
                        disabled={this.state.disableField}
                        style={this.state.disableField ? cursorStyle : {}}
                        placeholder="Enter the phone number"
                        // value={this.state.mobileNo}
                        autoComplete="off"
                        maxLength={10}
                        //onChange={(e) => this.handleTextChange(e)}
                        //defaultValue={this.state.mobileNo}
                        className={`mobile ${mobileNoErr.status ? 'error' : ''}`}
                        onKeyDown={(e) => {this.handleNumberChange(e)}}
                        onKeyUp={(e) => {this.handleNumberChange(e)}}
                      />
                    </div>
                  </div>
                  {
                    mobileNoErr.status &&
                    <p className="error-message os s9">{mobileNoErr.value}</p>
                  }
                  {
                    otpSent &&
                    <React.Fragment>
                      <div className="note os s9">OTP has been sent!</div>
                      <div className="alert-box">
                        <div style={{marginRight: '10px', display: 'flex'}}>
                          <Icon name="alert" />
                        </div>
                        <div className="os s8">
                          Welcome back to HipBar! Please enter the OTP to sign in.
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="os s7">OTP</label>
                        <div className="input-otp-container"> 
                          <input 
                            type="text"
                            name="otp"
                            placeholder="Enter the OTP that you've received"
                            //value={this.state.otp}
                            className={`${otpErr.status ? 'error' : ''}`}
                            autocomplete="off"
                            maxLength={6}
                            onKeyDown={(e) => {this.handleNumberChange(e)}}
                            onKeyUp={(e) => {this.handleNumberChange(e)}}
                            //onChange={(e) => this.handleTextChange(e)}
                          />
                          <div className={`resend os s10 ${isGettingOtp ? 'disabled': ''}`} onClick={this.resendOtp}>RESEND OTP</div>
                          {
                            this.state.resentOtp && 
                            <div className="note os s9">OTP has been resent!</div>
                          }
                        </div>
                        {
                          otpErr.status &&
                          <p className="error-message os s9">{otpErr.value}</p>
                        }
                      </div>
                    </React.Fragment>
                    
                  }
                </div>
                <div className="page-footer">
                  {
                    !otpSent 
                    ? <React.Fragment>
                        <div>
                          <div className="button-section">
                            <Button size="small" secondary onClick={unMountModal}>Cancel</Button>
                            <Button size="small" icon="rightArrowWhite" style={{ marginLeft: "15px" }} disabled={isGettingOtp} primary onClick={this.handleClick}>PROCEED</Button>
                          </div> 
                          <div className="button-section mobile">
                            <Button size="small"  icon="rightArrowWhite" disabled={isGettingOtp} primary onClick={this.handleClick}>PROCEED</Button>
                            <Button size="small" secondary onClick={unMountModal}>Cancel</Button>
                          </div> 
                        </div>
                        
                      </React.Fragment>
                    : <React.Fragment>
                        <div className="button-section">
                          <Button size="small" secondary onClick={unMountModal}>Cancel</Button>
                          <Button size="small" style={{ marginLeft: "15px" }}  icon="rightArrowWhite" disabled={isGettingOtp} primary onClick={this.signIn}>Sign in</Button>
                        </div> 
                        <div className="button-section mobile">
                          <Button size="small" icon="rightArrowWhite" disabled={isGettingOtp} primary onClick={this.signIn}>Sign in</Button>
                          <Button size="small" secondary onClick={unMountModal}>Cancel</Button>
                        </div> 
                      </React.Fragment>
                  } 
                </div>
                {/* {
                  errorInSignIn && 
                  this.renderErrorNotification()
                } */}
              </div>
            </ModalBox>
          }
        </div>
      )
    }
  }
//export default SignIn
}