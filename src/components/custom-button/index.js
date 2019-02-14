import React from "react"
import "./custom-button.scss"

const CustomButton = ({ text, navigateTo }) => {
  function handleClick() {
    //console.log("hello", navigateTo)
    location.href = navigateTo
  }
  return (
    <div className="box1" onClick={handleClick}>
      <div className="box2"></div>
      <span className="ft s3">{text}</span>
    </div>
  )
}

export default CustomButton