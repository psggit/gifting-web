import React from 'react'
import ModalHeader from 'Components/modal-box/ModalHeader'
import ModalFooter from 'Components/modal-box/ModalFooter'
import ModalBody from 'Components/modal-box/ModalBody'
import ModalBox from 'Components/modal-box'
import Icon from "Components/icon"
import { unMountModal } from 'Components/modal-box/utils'

export default function AgeGate(data) {
  return class AgeGate extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        showNote: false
      }
      this.closeWindow = this.closeWindow.bind(this)
    }

    closeWindow() {
      this.setState({showNote: true})
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
              Agree if you are above the legal drinking age in your state of residence
            </p>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-secondary os s7' onClick={() => {return this.closeWindow()}}>DISAGREE</button>
            <button className='btn btn-primary os s7' onClick={unMountModal}>AGREE</button>     
          </ModalFooter>
          {
            showNote &&
            <div style={{border: '1px solid #000', borderRadius: '4px', display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '10px 12px', marginTop: '20px'}}>
              <Icon name="alert" />
              <div>Sorry! You've to be above the legal drinking age to access this website</div>
            </div>
          }     
        </ModalBox>
      )
    }
  }
}

//export default NewAddress
