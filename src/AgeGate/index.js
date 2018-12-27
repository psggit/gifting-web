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
      this.closeWindow = this.closeWindow.bind(this)
    }

    closeWindow(cmd) {
      if (cmd=='quit')
      {
        open(location, '_self').close()
      }   
      return false;   
    }

    render() {
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
            <button className='btn btn-secondary os s7' onClick={() => {return this.closeWindow('quit')}}>DISAGREE</button>
            <button className='btn btn-primary os s7' onClick={unMountModal}>AGREE</button>
          </ModalFooter>
        </ModalBox>
      )
    }
  }
}

//export default NewAddress
