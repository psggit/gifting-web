import React from "react"
import Icon from "Components/icon"
import Button from "Components/button"
import "./gift-more-drinks.scss"
import NavLink from "Components/NavLink"
import { unmountModal } from "Components/modal-box2/utils"

function GiftMoreDrinks({ history }) {
  return (
    <div className="gift--more-drinks">
      <a onClick={unmountModal} href={"javascript:history.back()"}>
        <Icon name="giftIcon" />
        <p className="os s7">Gift more drink(s)</p>
      </a>
      <NavLink extendedOnclick={unmountModal} history={history} href="/basket">
        <Button primary icon="rightArrowWhite">Gift basket</Button>
      </NavLink>
    </div>
  )
}

export default GiftMoreDrinks