import React from "react"
import ModalHeader from "Components/modal-box2/ModalHeader"
import ModalFooter from "Components/modal-box2/ModalFooter"
import ModalBody from "Components/modal-box2/ModalBody"
import ModalBox from "Components/modal-box2"
import { unmountModal } from "Components/modal-box2/utils"
import Icon from "Components/icon"
import Button from "Components/button"
import "./notification-modal.scss"

export default function NotificationModal() {
  return class NotificationModal extends React.Component {
    render() {
      return (
        <div id="notification--modal">
          <ModalBox>
            {/* <ModalHeader>
              <span onClick={unmountModal}><Icon name="cross" /></span>
            </ModalHeader> */}
            <ModalBody width="350px">
              <Icon name="info" />
              <p className="os s4">Something went wrong!</p>
              <p className="os s4">Please try again later</p>
            </ModalBody>
            <ModalFooter>
              <div className="submit" onClick={unmountModal}>
                <Button primary>OK</Button>
              </div>
            </ModalFooter>
          </ModalBox>
        </div>
      )
    }
  }
}
