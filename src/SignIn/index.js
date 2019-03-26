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
import InputMask from "react-input-mask"

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
        //resentOtp: false,
        setTimer: false,
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
      this.countdown = this.countdown.bind(this)
      this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    componentDidMount() {
      window.addEventListener("keydown", this.handleKeyDown)
    }

    handleKeyDown(e) {
      //console.log("keydown", this.state.otpSent)
      if(e.keyCode === 13) {
        const {otpSent} = this.state;
        if(!otpSent) {
          this.handleClick()
        } else {
          this.signIn()
        }
      }
    }

    // componentWillUnmount() {
    //   window.removeEventListener("keydown")
    // }

    countdown() {
      let timeoutHandle;
      let seconds = 30
      let self = this
      function tick() {
        let counter = document.getElementById("timer")
        seconds--
        counter.innerHTML ="OTP can be resent in" + " 00" + ":"  +(seconds < 10 ? "0" : "") + String(seconds) + " seconds";
        if( seconds > 0 ) {
          timeoutHandle=setTimeout(tick, 1000)
        }else {
          self.setState({setTimer: false})
        }
      }
      tick();
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
              this.setState({otpSent: true, disableField: true, setTimer: true})
              this.countdown()
              // if(dataObj.resendOtp) {
              //   this.setState({resentOtp : true})
              // }
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

      const mobileNoErr = validateTextField(this.inputNameMap['mobileNo'], this.state.mobileNo)
      this.setState({mobileNoErr: validateTextField(this.inputNameMap['mobileNo'], this.state.mobileNo)})
      if(otpSent) {
        otpErr = validateTextField(this.inputNameMap['otp'], this.state.otp)
        this.setState({otpErr: validateTextField(this.inputNameMap['otp'], this.state.otp)})
      }
      
      if (!mobileNoErr.status && !otpErr.status) {
        return true
      }
      return false
    }

    handleClick () {
      if(this.isFormValid() && !this.state.isGettingOtp) {
        this.verifyUserAndGetOtp({unMountModal: true})
      }
    }

    handleNumberChange(e) {
      const errName = `${e.target.name}Err`

      if(validateNumType(e.keyCode) || checkCtrlA(e) || checkCtrlV(e) || checkCtrlC(e)) {
        this.setState({ 
          [e.target.name]: (e.target.value),
          //[errName]:  validateNumberField(this.inputNameMap[e.target.name], e.target.value)
        })
      } else {
        e.preventDefault()
      }   
    }

    signIn() {
      //if (window.ga && ga.loaded) {
        //console.log("ga")
        // ga("send", {
        //   hitType: "event",
        //   eventCategory: "",
        //   eventAction: "",
        //   eventLabel: "point_of_sign_in"
        // })
      //}
      console.log("gtag", window.gtag , gtag.loaded)
      

      if(window.gtag) {
        console.log("gtag")
        gtag('event', 'add_to_cart', {
          "items": [
            {
              "id": "P12345",
              "name": "Android Warhol T-Shirt",
              "list_name": "Search Results",
              "brand": "Google",
              "category": "Apparel/T-Shirts",
              "variant": "Black",
              "list_position": 1,
              "quantity": 2,
              "price": '2.0'
            }
          ]
        });
      }
      if(window.gtag) {
        gtag("event", "test", {
          "event_label": JSON.stringify({
            "id": "1",
            "name": "hello"
          })
        })
      }

      console.log(!this.state.isSigningIn, "form valid", this.isFormValid())
      if(!this.state.isSigningIn && this.isFormValid()) {
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
          mode: 'cors',
          credentials: "include",
          body: JSON.stringify(payload)
        }
        this.setState({errorInSignIn: false, isSigningIn: true})
        fetch(`${Api.blogicUrl}/consumer/auth/otp-login`, fetchOptions)
          .then((response) => {
            response.json().then((responseData) => {
              if(response.status === 400 && responseData.errorCode.includes("invalid-otp")){
                this.setState({otpErr: {status: true, value: "Incorrect OTP. Please enter again or resend OTP"}})
                this.setState({isSigningIn: false})
                // ga("send", {
                //   hitType: "event",
                //   eventCategory: "",
                //   eventAction: "",
                //   eventLabel: "sign_in_failure"
                // })
                return
              } else if(response.status === 401 && responseData.errorCode.includes("role-invalid")){
                this.setState({otpErr: {status: true, value: responseData.message}})
                this.setState({isSigningIn: false})
                // ga("send", {
                //   hitType: "event",
                //   eventCategory: "",
                //   eventAction: "",
                //   eventLabel: "sign_in_failure"
                // })
                return
              } else if(response.status === 400 && responseData.errorCode.includes("expired-otp")){
                this.setState({otpErr: {status: true, value: responseData.message}})
                this.setState({isSigningIn: false})
                // ga("send", {
                //   hitType: "event",
                //   eventCategory: "",
                //   eventAction: "",
                //   eventLabel: "sign_in_failure"
                // })
                return
              }
              createSession(responseData, "true")
              window.fcWidget.user.clear().then(function() {
                console.log('User cleared')
              }, function() {
                console.log("User Not cleared")
              })
              // ga("send", {
              //   hitType: "event",
              //   eventCategory: "",
              //   eventAction: "",
              //   eventLabel: "sign_in_success"
              // })
              //localStorage.setItem("showAgegate", false)
              location.href= (location.pathname)
              unMountModal()
              //data.reload(true)
              this.setState({isSigningIn: false})
            })
          })
          .catch((err) => {
            this.setState({errorInSignIn: true})
            // ga("event", "sign_in_failure", {"method": "Google"})
            mountModal(NotifyError({}))
          })
      }
    }

    resendOtp() {
      if(!this.state.isGettingOtp) {
        this.verifyUserAndGetOtp({unMountModal: false})
        //this.setState({})
      }
    }

    handleTextChange(e) {
      this.setState({[e.target.name]: (e.target.value)})
    }

    render() {
      const {otpSent, isGettingOtp, mobileNoErr, otpErr, isSigningIn, setTimer} = this.state
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
                      <span className="os s7">+91</span>
                    </div>
                    {/* <div style={{width: 'calc(100% - 40px'}}> */}
                      {/* <input 
                        type="text"
                        name="mobileNo"
                        disabled={this.state.disableField}
                        style={this.state.disableField ? cursorStyle : {}}
                        placeholder="Enter the phone number"
                        defaultValue={data.mobile}
                        autoComplete="off"
                        maxLength={10}
                        //onChange={(e) => this.handleTextChange(e)}
                        //defaultValue={this.state.mobileNo}
                        className={`mobile ${mobileNoErr.status ? 'error' : ''}`}
                        onKeyDown={(e) => {this.handleNumberChange(e)}}
                        onKeyUp={(e) => {this.handleNumberChange(e)}}
                      /> */}

                      <InputMask
                        onChange={this.handleTextChange} 
                        name="mobileNo"
                        mask="9999999999"
                        disabled={this.state.disableField}
                        style={this.state.disableField ? cursorStyle : {}}
                        placeholder="Enter the phone number"
                        defaultValue={this.state.mobileNo}
                        autoComplete="off"
                        className={`mobile ${mobileNoErr.status ? 'error' : ''}`}
                        maskChar={null}
                        type="text"
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
                      <div className="note"><span className="os s9">OTP has been sent!</span></div>
                      <div className="alert-box">
                        <div style={{marginRight: '10px', display: 'flex'}}>
                          <Icon name="alert" />
                        </div>
                        <div>
                          <p className="os s8">
                          Welcome back to HipBar! Please enter the OTP to sign in.
                          </p>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="os s7">OTP</label>
                        <div className="input-otp-container"> 
                          {/* <input 
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
                          /> */}
                          <InputMask
                            onChange={this.handleTextChange} 
                            name="otp"
                            mask="999999"
                            className={`${otpErr.status ? 'error' : ''}`} 
                            placeholder="Enter the OTP"
                            autoComplete="off"
                            maskChar={null}
                            type="text"
                          />
                          <div className={`resend os s10 ${setTimer ? 'disabled': ''}`} onClick={this.resendOtp}><span>RESEND OTP</span></div>
                          {
                            this.state.setTimer && 
                            <p className="note os s9" id="timer"></p>
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