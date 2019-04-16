import React from "react"
import Icon from "Components/icon"
import Button from "Components/button"
import "./gift-more-drinks.scss"
import NavLink from "Components/NavLink"
import { unmountModal } from "Components/modal-box2/utils"

function GiftMoreDrinks({ url, history }) {
  return (
    <div className="gift--more-drinks">
      <NavLink extendedOnclick={unmountModal} history={history} href={url}>
        <Icon name="giftIcon" />
        <p className="os s7">Gift more drink(s)</p>
      </NavLink>
      <NavLink extendedOnclick={unmountModal} history={history} href="/basket">
        <Button primary icon="rightArrowWhite">Gift basket</Button>
      </NavLink>
    </div>
  )
}

export default GiftMoreDrinks