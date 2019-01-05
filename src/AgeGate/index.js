import React from 'react'
import ModalHeader from 'Components/modal-box/ModalHeader'
import ModalFooter from 'Components/modal-box/ModalFooter'
import ModalBody from 'Components/modal-box/ModalBody'
import ModalBox from 'Components/modal-box'
import Icon from "Components/icon"
import { unMountModal } from 'Components/modal-box/utils'
import Button from "Components/button"

export default function AgeGate(data) {
  return class AgeGate extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        showNote: false
      }
      this.closeWindow = this.closeWindow.bind(this)
    }

    componentDidMount() {
      //localStorage.setItem("agreedAgeGate", false)
    }

    closeWindow() {
      this.setState({showNote: true})
    }

    agreeAgeGate() {
      document.cookie = "isAgeGateAgreed=true; path=/; expires=" + (new Date(new Date().getTime() + 30 * 60 * 1000)).toUTCString() + `;path=/;  domain=${location.hostname}`
      //localStorage.setItem("agreedAgeGate", true)
      unMountModal()
    }

    render() {
      const {showNote} = this.state
      return (
        <ModalBox>
          <ModalHeader>  
            <Icon name="user" />
          </ModalHeader>
          <ModalBody>
            <p className="os s2">
              Agree if you are of legal drinking age in your current state of residence
            </p>
            <div style={{display: 'flex', marginTop: '40px', alignItems: 'center'}}>
              <a className="os s6" href="/legal-drinking-age" target="_blank">
                Legal drinking age by states/UTs
              </a>
              <Icon name="rightArrowBlack" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button secondary style={{marginRight: '24px', width: '160px'}} onClick={() => {return this.closeWindow()}}>DISAGREE</Button>
            <Button  primary style={{width: '160px'}} onClick={this.agreeAgeGate}>AGREE</Button>     
          </ModalFooter>
          {
            showNote &&
            <div className="note">
              <span  className="icon">
                <Icon name="alert"/>
              </span>
              <div className="os s6">Sorry! You've to be of legal drinking age to access this website</div>
            </div>
          }     
        </ModalBox>
      )
    }
  }
}

//export default NewAddress
