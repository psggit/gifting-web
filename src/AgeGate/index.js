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
            <button className='btn btn-secondary' onClick={unMountModal}>DISAGREE</button>
            <button className='btn btn-primary' onClick={unMountModal}>AGREE</button>
          </ModalFooter>
        </ModalBox>
      )
    }
  }
}

//export default NewAddress
