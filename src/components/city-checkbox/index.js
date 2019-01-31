import React from "react"
import "./city-checkbox.scss"
import Icon from "Components/icon"

export default function CityCheckBox(props){
  const {name, id, active, handleClick} = props
  return(
    <div
      id={id}
      onClick={handleClick}
      className={`city--item ${active === id ? "active" : ""}`}>
      <span><Icon name="drinkChecked" /></span>
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
      }}>
        <p className="os" style={{ color: "#777", fontWeight: "bold" }}>{name}</p>
      </div>
    </div>
  )
}  