import React from "react"
import ModalHeader from "Components/modal-box2/ModalHeader"
import ModalFooter from "Components/modal-box2/ModalFooter"
import ModalBody from "Components/modal-box2/ModalBody"
import ModalBox from "Components/modal-box2"
import GiftMoreDrinks from "Components/GiftMoreDrinks"
import Icon from "Components/icon"
import "./sass/added-to-basket-modal.scss"

export default function AddToBasketModal() {
  return class AddedToBasketModal extends React.Component {
    render() {
      return (
        <div id="added-to-basket--modal">
          <ModalBox>
            <ModalHeader>  
              
            </ModalHeader>
            <ModalBody>
              <Icon name="roundTick" />
              <p className="os s4">Added to Gift Basket</p>
            </ModalBody>
            <ModalFooter>
              <GiftMoreDrinks />
            </ModalFooter>
          </ModalBox>
        </div>
      )
    }
  }
}
