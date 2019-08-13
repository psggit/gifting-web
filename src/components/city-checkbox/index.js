import React from "react"
import "./city-checkbox.scss"
import Icon from "Components/icon"

export default function CityCheckBox(props){
  const {name, id, active } = props

  return(
    <div
      id={id}
      onClick={() => 
        props.handleClick({
          id: props.id,
          gps: props.gps,
          name: props.name,
          state_id: props.state_id
        })
      }
      className={`city--item ${active === id ? "active" : ""}`}>
      <span><Icon name="drinkChecked" /></span>
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
      }}>
        <p className="os s7">{name}</p>
      </div>
    </div>
  )
}  