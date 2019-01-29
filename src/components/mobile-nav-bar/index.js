import React from "react"
import "./mobile-nav-bar.scss"
import Icon from "Components/icon"

export default function MobileNavBar(props){
    const {stepNo,stepName, handleClick} = props
    
    return(
      <div className="nav-bar">              
        <div className="text-nav">
          <div>
            {stepName}
          </div>
          {stepNo > 1 ?
            <div className="nav">
              <div className={`${(stepNo > 1)?"active":""}`} onClick={handleClick}><Icon name= "rightArrowBlack"/></div>
              <div className={`${(stepNo < 3)?"active":""}`}><Icon name= "rightArrowBlack"/></div>
            </div>
          : ""
          }
        </div>
        <div className="p">
          <div className="active">
          </div>
          <div className={`${(stepNo >= 2)?"active":""}`}>
          </div>
          <div className={`${(stepNo == 3)?"active":""}`}>
          </div>
        </div>
      </div>
    )
  }