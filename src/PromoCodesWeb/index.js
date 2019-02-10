import React from "react"
import ModalHeader from "Components/modal-box2/ModalHeader"
import ModalFooter from "Components/modal-box2/ModalFooter"
import ModalBody from "Components/modal-box2/ModalBody"
import ModalBox from "Components/modal-box2"
import { unmountModal } from "Components/modal-box2/utils"
import Icon from "Components/icon"
import PromoCodes from "./../PromoCodes"
import "./promo-codes-web.scss"

export default function PromoCodesWeb(data) {
  return class AddedToBasketModal extends React.Component {
    render() {
      return (
        <ModalBox>
          <ModalHeader> 
            <div className="promo--header">
              <div>
                <p className="os s6">Promo Codes</p>
              </div>
              <div onClick={unmountModal} className="close">
                <Icon name="cross" />
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <PromoCodes data={data} />
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalBox>
      )
    }
  }
}
