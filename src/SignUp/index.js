import React from 'react'
import './signup.scss'
import { unMountModal, mountModal } from 'Components/modal-box/utils'
import ModalBox from '../components/modal-box/modalBox'
import Icon from "Components/icon"
import SignIn from './../SignIn'
import { Api } from '../utils/config'
import { createSession } from 'Utils/session-utils'
import { checkCtrlA, validateNumType, checkCtrlV, checkCtrlC } from 'Utils/logic-utils'
import { validateNumberField } from 'Utils/validators'
import { validateTextField, validateEmail } from '../utils/validators';
import NotifyError from './../NotifyError';
import Button from "Components/button"

export default function SignUp(data) {
  return class SignUp extends React.Component {
    constructor(props) {
      super(props)
      this.inputNameMap = {
        mobileNo: "Mobile no",
        email: "Email",
        name: "Name",
        otp: "Otp",
        dob: "Date of Birth",
        pin: "Account Pin",
        confirmPin: "Confirm Account Pin"
      }
      this.state = {
        otpSent: false,
        mobileNo: data.mobile ? data.mobile : "",
        disableField: data.mobile ? true : false,
        name: "",
        email: "",
        otp: "",
        pin: "",
        confirmPin: "",
        gender: "male",
        errorInSignUp: false,
        isGettingOtp: false,
        isSigningUp: false,
        mobileNoErr: {
          value: "",
          status: false
        },
        nameErr: {
          value: "",
          status: false
        },
        pinErr: {
          value: "",
          status: false
        },
        confirmPinErr: {
          value: "",
          status: false
        },
        emailErr: {
          value: "",
          status: false
        },
        otpErr: {
          value: "",
          status: false
        },
        dobErr: {
          value: "",
          status: false
        }
      }
      this.handleClick = this.handleClick.bind(this)
      this.signUp = this.signUp.bind(this)
      this.login = this.login.bind(this)
      //this.signOut = this.signOut.bind(this)
      this.resendOtp = this.resendOtp.bind(this)
      this.handleTextChange = this.handleTextChange.bind(this)
      this.isFormValid = this.isFormValid.bind(this)
      this.handleGenderChange = this.handleGenderChange.bind(this)
    }

    handleGenderChange(genderValue) {
      this.setState({ gender: genderValue })
    }

    isFormValid() {
      const { otpSent, pin, confirmPin } = this.state
      let otpErr = this.state.otpErr

      const mobileNoErr = validateNumberField(this.inputNameMap['mobileNo'], this.state.mobileNo)
      this.setState({ mobileNoErr: validateNumberField(this.inputNameMap['mobileNo'], this.state.mobileNo) })

      const nameErr = validateTextField(this.inputNameMap['name'], this.state.name)
      this.setState({ nameErr: validateTextField(this.inputNameMap['name'], this.state.name) })

      const emailErr = validateEmail(this.inputNameMap['email'], this.state.email)
      this.setState({ emailErr: validateEmail(this.inputNameMap['email'], this.state.email) })

      const dobErr = validateTextField(this.inputNameMap['dob'], this.state.dob)
      this.setState({ dobErr: validateTextField(this.inputNameMap['dob'], this.state.dob) })

      const pinErr = validateTextField(this.inputNameMap['pin'], this.state.pin)
      this.setState({ pinErr: validateTextField(this.inputNameMap['pin'], this.state.pin) })

      const confirmPinErr = validateTextField(this.inputNameMap['confirmPin'], this.state.confirmPin)
      this.setState({ confirmPinErr: validateTextField(this.inputNameMap['confirmPin'], this.state.confirmPin) })

      if (otpSent) {
        otpErr = validateTextField(this.inputNameMap['otp'], this.state.otp)
        this.setState({ otpErr: validateTextField(this.inputNameMap['otp'], this.state.otp) })
      }

      if (pin !== confirmPin) {
        this.setState({ confirmPinErr: { status: true, value: "Pin does not match" } })
        return false
      }

      if (!mobileNoErr.status && !otpErr.status && !otpSent && !emailErr.status && !nameErr.status && !dobErr.status && !pinErr.status && !confirmPinErr.status) {
        return true
      }
      return false
    }

    handleClick() {
      if (this.isFormValid() && !this.state.isGettingOtp) {
        this.signUp()
      }
    }

    signUp() {
      const payload = {
        info: {
          dob: new Date(this.state.dob).toISOString(),
          gender: this.state.gender,
          name: this.state.name,
          gps: "",
          pin: parseInt(this.state.pin),
          referral_code: ""
        },
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
      this.setState({ errorInSignUp: false, isGettingOtp: true })
      fetch(`${Api.blogicUrl}/consumer/auth/otp-signup`, fetchOptions)
        .then((response) => {
          response.json().then((responseData) => {
            // if(responseData.errorCode === "role-invalid") {
            //   this.signOut()
            // } else 
            if (response.status === 400 && responseData.errorCode === "dob-error") {
              this.setState({ dobErr: { status: true, value: responseData.message } })
            } else if (response.status === 409 && responseData.errorCode === "user-already-exists") {
              this.setState({ emailErr: { status: true, value: responseData.message } })
              //return
            } else if (response.status !== 400) {
              this.getOtp()
            }
            this.setState({ isGettingOtp: false })
          })
          //return
        })
        .catch((err) => {
          this.setState({ errorInSignUp: true, isGettingOtp: false })
          //this.setState({isGettingOtp: false})
          mountModal(NotifyError({}))
        })
    }

    login() {
      if (!this.state.isSigningUp) {
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
        this.setState({ errorInSignIn: false, isSigningUp: true })
        fetch(`${Api.blogicUrl}/consumer/auth/otp-login`, fetchOptions)
          .then((response) => {
            response.json().then((responseData) => {
              if (response.status === 400 && responseData.errorCode.includes("invalid-otp")) {
                this.setState({ otpErr: { status: true, value: "Incorrect OTP. Please enter again or resend OTP" } })
                this.setState({ isSigningUp: false })
                return
              } else if (response.status === 400 && responseData.errorCode === "expired-otp") {
                this.setState({ otpErr: { status: true, value: responseData.message } })
                this.setState({ isSigningUp: false })
                return
              }
              createSession(responseData)
              location.href = (location.pathname)
              unMountModal()
              //data.reload(true)
              this.setState({ isSigningUp: false })
            })
          })
          .catch((err) => {
            this.setState({ errorInSignUp: true, isSigningUp: false })
            //this.setState({})
            mountModal(NotifyError({}))
          })
      }
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
      this.setState({ errorInSignUp: false, isGettingOtp: true })
      fetch(`${Api.blogicUrl}/consumer/auth/otp-login`, fetchOptions)
        .then((response) => {
          if (response.status === 401) {
            this.setState({ otpSent: true, disableField: true })
          }
          this.setState({ isGettingOtp: false })
          return
        })
        .catch((err) => {
          this.setState({ errorInSignUp: true, isGettingOtp: false })
          //this.setState({})
          mountModal(NotifyError({}))
        })
    }

    resendOtp() {
      //this.setState({otpSent: true})
      if (!this.state.isGettingOtp) {
        this.getOtp()
      }
    }

    handleEmailChange(e) {
      const errName = `${e.target.name}Err`
      this.setState({
        [e.target.name]: e.target.value,
        //[errName]: validateEmail(this.inputNameMap[e.target.name], e.target.value),
      })
    }

    handleTextChange(e) {
      const errName = `${e.target.name}Err`
      this.setState({
        [e.target.name]: e.target.value,
        //[errName]: validateTextField(this.inputNameMap[e.target.name], e.target.value),
      })
    }

    handleNumberChange(e) {
      const errName = `${e.target.name}Err`

      if (validateNumType(e.keyCode) || checkCtrlA(e) || checkCtrlV(e) || checkCtrlC(e)) {
        this.setState({
          [e.target.name]: e.target.value,
          //[errName]:  validateNumberField(this.inputNameMap[e.target.name], e.target.value)
        })
      } else {
        e.preventDefault()
      }
    }

    render() {
      const { otpSent,
        mobileNoErr,
        emailErr,
        nameErr, otpErr,
        errorInSignUp,
        dobErr,
        pinErr,
        confirmPinErr,
        gender,
        isSigningUp,
        isGettingOtp
      } = this.state

      const cursorStyle = {
        cursor: 'not-allowed'
      }

      return (
        <div>
          {
            <ModalBox>
              <div id="SignUp">
                <h2 className="header os s2">
                  Sign up with HipBar
                </h2>
                <div className="page-body">
                  <div className="form-group">
                    <label className="os s7">Phone Number</label>
                    <div style={{ display: 'flex' }}>
                      <div className={`country-code ${mobileNoErr.status ? 'error' : ''}`}>
                        +91
                    </div>
                      <div style={{ width: 'calc(100% - 40px' }}>
                        <input
                          type="text"
                          name="mobileNo"
                          maxLength={10}
                          disabled={this.state.disableField}
                          style={this.state.disableField ? cursorStyle : {}}
                          //value={this.state.mobileNo}
                          autoComplete="off"
                          //onChange={(e) => this.handleTextChange(e)}
                          defaultValue={this.state.mobileNo}
                          className={`mobile ${mobileNoErr.status ? 'error' : ''}`}
                          onKeyDown={(e) => { this.handleNumberChange(e) }}
                          onKeyUp={(e) => { this.handleNumberChange(e) }}
                        />
                      </div>
                    </div>
                  </div>
                  {
                    mobileNoErr.status &&
                    <p className="error-message os s9">{mobileNoErr.value}</p>
                  }
                  {
                    otpSent &&
                    <div className="note os s7">Otp has been sent!</div>
                  }
                  <div className="form-group">
                    <label className="os s7">Name</label>
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className={`${nameErr.status ? 'error' : ''}`}
                        value={this.state.name}
                        disabled={this.state.disableField && this.state.otpSent}
                        autoComplete="off"
                        onChange={(e) => this.handleTextChange(e)}
                      />
                    </div>
                  </div>
                  {
                    nameErr.status &&
                    <p className="error-message os s9">{nameErr.value}</p>
                  }
                  <div className="form-group">
                    <label>Email Address</label>
                    <div>
                      <input
                        type="text"
                        name="email"
                        placeholder="Enter your email address"
                        value={this.state.email}
                        className={`${emailErr.status ? 'error' : ''}`}
                        disabled={this.state.disableField && this.state.otpSent}
                        autoComplete="off"
                        onChange={(e) => this.handleTextChange(e)}
                      />
                    </div>
                  </div>
                  {
                    emailErr.status &&
                    <p className="error-message os s9">{emailErr.value}</p>
                  }
                  {
                    !otpSent &&
                    <div style={{ position: "relative" }} className="form-group">
                      <label>Date of Birth</label>
                      <span className="calendar">
                        <Icon name="calendar" />
                      </span>
                      <div>
                        <input
                          type="date"
                          name="dob"
                          max="9999-12-31"
                          value={this.state.dob}
                          placeholder="Enter your date of birth"
                          className={`${dobErr.status ? 'error' : ''}`}
                          //disabled={this.state.disableField && this.state.otpSent} 
                          autoComplete="off"
                          onChange={(e) => this.handleTextChange(e)}
                          style={{ paddingLeft: '35px' }}
                        />
                      </div>
                    </div>
                  }
                  {
                    dobErr.status &&
                    <p className="error-message os s9">{dobErr.value}</p>
                  }
                  {
                    !otpSent &&
                    <div className="form-group">
                      <label>Gender</label>
                      <div className="row">
                        <div onClick={() => this.handleGenderChange("male")} className={`column os s8 ${gender === "male" ? 'active' : 'inactive'}`}>Male</div>
                        <div onClick={() => this.handleGenderChange("female")} className={`column os s8 ${gender === "female" ? 'active' : ''}`}>Female</div>
                        <div onClick={() => this.handleGenderChange("unspecified")} className={`column os s8 ${gender === "unspecified" ? 'active' : ''}`}>Unspecified</div>
                      </div>
                    </div>
                  }
                  {
                    !otpSent &&
                    <div className="form-group">
                      <label>Account Pin</label>
                      <div>
                        <input
                          type="password"
                          name="pin"
                          maxLength={4}
                          placeholder="Set your account pin"
                          //value={this.state.pin}
                          className={`${pinErr.status ? 'error' : ''}`}
                          autoComplete="off"
                          //onChange={(e) => this.handleTextChange(e)}
                          onKeyDown={(e) => {this.handleNumberChange(e)}}
                          onKeyUp={(e) => {this.handleNumberChange(e)}}
                        />
                      </div>
                    </div>
                  }
                  {
                    !otpSent &&
                    <div className="note os s9">Set account pin for secure transactions on the HipBar mobile app</div>
                  }
                  {
                    !otpSent &&
                    <div className="form-group">
                      <label>Confirm Account Pin</label>
                      <div>
                        <input
                          type="password"
                          name="confirmPin"
                          maxLength={4}
                          placeholder="Re enter your account pin"
                          //value={this.state.confirmPin}
                          className={`${confirmPinErr.status ? 'error' : ''}`}
                          autoComplete="off"
                          //onChange={(e) => this.handleTextChange(e)}
                          onKeyDown={(e) => {this.handleNumberChange(e)}}
                          onKeyUp={(e) => {this.handleNumberChange(e)}}
                        //style={{paddingLeft: '30px'}}
                        />
                      </div>
                    </div>
                  }
                  {
                    confirmPinErr.status &&
                    <p className="error-message os s9">{confirmPinErr.value}</p>
                  }
                  {
                    otpSent &&
                    <div className="form-group">
                      <label>OTP</label>
                      <div className="input-otp-container">
                        <input
                          type="text"
                          name="otp"
                          className={`${otpErr.status ? 'error' : ''}`}
                          value={this.state.otp}
                          //disabled={this.state.disableField}
                          autoComplete="off"
                          onChange={(e) => this.handleTextChange(e)}
                        />
                        <div className={`resend os s10 ${isGettingOtp ? 'disabled' : ''}`} onClick={this.resendOtp}>RESEND OTP</div>
                      </div>
                      {
                        otpErr.status &&
                        <p className="error-message os s9">{otpErr.value}</p>
                      }
                    </div>
                  }
                </div>
                <div className="page-footer">
                  {
                    !otpSent
                      ? <React.Fragment>
                        <Button size="small" secondary onClick={unMountModal}>Cancel</Button>
                        <Button size="small" style={{ marginLeft: "15px" }}  icon="rightArrowWhite" disabled={isGettingOtp} primary onClick={this.handleClick}>Get otp</Button>
                      </React.Fragment>
                      : <React.Fragment>
                        <Button size="small" secondary onClick={unMountModal}>Cancel</Button>
                        <Button size="small" style={{ marginLeft: "15px" }}  icon="rightArrowWhite" disabled={isSigningUp} primary onClick={this.login}>Sign up</Button>
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