import React from 'react'
import './signup.scss'
import { unMountModal, mountModal } from 'Components/modal-box/utils'
import ModalBox from '../components/modal-box/modalBox'
import Icon from "Components/icon"
import SignIn from './../SignIn'
import { Api } from '../utils/config'
import {createSession} from 'Utils/session-utils'
import { checkCtrlA, validateNumType, checkCtrlV } from 'Utils/logic-utils'
import { validateNumberField } from 'Utils/validators'
import { validateTextField, validateEmail } from '../utils/validators';
import NotifyError from './../NotifyError';

export default function SignUp(data) {
  return class SignUp extends React.Component {
    constructor(props) {
      super(props)
      //console.log("data", data)
      this.inputNameMap = {
        mobileNo: "Mobile no",
        email: "Email",
        name: "Name",
        otp: "Otp"
      }
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
        mobileNoErr: {
          value: "",
          status: false
        },
        nameErr: {
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
        }
      }
      this.handleClick = this.handleClick.bind(this)
      this.signUp = this.signUp.bind(this)
      this.resendOtp = this.resendOtp.bind(this)
      this.handleTextChange = this.handleTextChange.bind(this)
      this.isFormValid = this.isFormValid.bind(this)
    }

    isFormValid() {
      const {otpSent} = this.state
      let otpErr = this.state.otpErr

      const mobileNoErr = validateNumberField(this.inputNameMap['mobileNo'], this.state.mobileNo)
      this.setState({mobileNoErr: validateNumberField(this.inputNameMap['mobileNo'], this.state.mobileNo)})

      const nameErr = validateTextField(this.inputNameMap['name'], this.state.name)
      this.setState({nameErr: validateTextField(this.inputNameMap['name'], this.state.name)})

      const emailErr = validateEmail(this.inputNameMap['email'], this.state.email)
      this.setState({emailErr: validateEmail(this.inputNameMap['email'], this.state.email)})
      
      if(otpSent) {
        otpErr = validateTextField(this.inputNameMap['otp'], this.state.otp)
        this.setState({otpErr: validateTextField(this.inputNameMap['otp'], this.state.otp)})
      }
    
      if (!mobileNoErr.status && !otpErr.status && !otpSent && !emailErr.status && !nameErr.status) {
        return true
      }
      return false
    }

    handleClick () {
      if(this.isFormValid()) {
        this.signUp()
      }
    }

    renderErrorNotification() {
      mountModal(NotifyError({}))
    }

    signUp() {
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

    // handleTextChange(e) {
    //   this.setState({[e.target.name]: e.target.value})
    // }

    handleEmailChange(e) {
      const errName = `${e.target.name}Err`
      this.setState({
        [e.target.name]: e.target.value,
        [errName]: validateEmail(this.inputNameMap[e.target.name], e.target.value),
      })
    }

    handleTextChange(e) {
      const errName = `${e.target.name}Err`
      this.setState({
        [e.target.name]: e.target.value,
        [errName]: validateTextField(this.inputNameMap[e.target.name], e.target.value),
      })
    }

    handleNumberChange(e) {
      const errName = `${e.target.name}Err`

      if(validateNumType(e.keyCode) || checkCtrlA(e) || checkCtrlV(e)) {
        this.setState({ 
          [e.target.name]: e.target.value,
          [errName]:  validateNumberField(this.inputNameMap[e.target.name], e.target.value)
        })
      } else {
        e.preventDefault()
      }   
    }

    render() {
      const {otpSent, mobileNoErr, emailErr, nameErr, otpErr, errorInSignUp} = this.state
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
                    <div className={country-code `${mobileNoErr.status ? 'error' : ''}`}>
                      +91
                    </div>
                    <div style={{width: 'calc(100% - 40px'}}>
                      <input 
                        type="text"
                        name="mobileNo"
                        className={`${mobileNoErr.status ? 'error' : ''}`}
                        disabled={this.state.disableField}
                        value={this.state.mobileNo}
                        autocomplete="off"
                        onChange={(e) => this.handleTextChange(e)}
                      />
                    </div>
                    {
                      mobileNoErr.status &&
                      <p className="error-message os s7">{mobileNoErr.value}</p>
                    }
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
                      className={`${nameErr.status ? 'error' : ''}`}
                      value={this.state.name}
                      disabled={this.state.disableField && this.state.otpSent}
                      autocomplete="off"
                      onChange={(e) => this.handleTextChange(e)} 
                    />
                  </div>
                  {
                    nameErr.status &&
                    <p className="error-message os s7">{nameErr.value}</p>
                  }
                  <label>Email Address</label>
                  <div>
                    <input 
                      type="text"
                      name="email"
                      value={this.state.email}
                      className={`${emailErr.status ? 'error' : ''}`}
                      disabled={this.state.disableField && this.state.otpSent} 
                      autocomplete="off"
                      onChange={(e) => this.handleTextChange(e)} 
                    />
                  </div>
                  {
                    emailErr.status &&
                    <p className="error-message os s7">{emailErr.value}</p>
                  }
                  {
                    otpSent &&
                    <div>
                      <label>OTP</label>
                      <div className="input-otp-container">
                        <input 
                          type="text"
                          name="otp"
                          className={`${otpErr.status ? 'error' : ''}`}
                          value={this.state.otp}
                          //disabled={this.state.disableField}
                          autocomplete="off"
                          onChange={(e) => this.handleTextChange(e)} 
                        />
                        <div className="resend" onClick={this.resendOtp}>Resend</div>
                      </div>
                      {
                        otpErr.status &&
                        <p className="error-message os s7">{otpErr.value}</p>
                      }
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
                {
                  errorInSignUp && 
                  this.renderErrorNotification()
                }
              </div>
            </ModalBox>
          }
        </div>
      )
    }
  }
//export default SignIn
}