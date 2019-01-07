import React from 'react'
import ModalHeader from 'Components/modal-box/ModalHeader'
import ModalFooter from 'Components/modal-box/ModalFooter'
import ModalBody from 'Components/modal-box/ModalBody'
import ModalBox from 'Components/modal-box'
import Icon from "Components/icon"
import { unMountModal } from 'Components/modal-box/utils'

export default function NotifyError(data) {
  return class NotifyError extends React.Component {

    constructor(props) {
      super(props)
    }

    render() {
      return (
        <ModalBox>
          <ModalHeader>  
            <Icon name="errorIcon" />
          </ModalHeader>
          <ModalBody>
            <p className="os s4">
              Something went wrong! Please try again
            </p>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-primary' onClick={unMountModal}>RETRY</button>
          </ModalFooter>
        </ModalBox>
      )
    }
  }
}

//export default NewAddress
