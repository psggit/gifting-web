import React from "react"
import "./mobile-nav-bar.scss"
import Icon from "Components/icon"

export default function MobileNavBar(props){
    const {stepNo,stepName} = props
    var stepNo1 = 2
    return(
      <div className="nav-bar">              
        <div className="text-nav">
          <div className="os">
            {stepName}
          </div>
          {stepNo > 1 ?
            <div className="nav">
              <div className={"active"} 
                onClick={(e) => props.handleNavigatePageClick(e, stepNo-1)}
                >
                <Icon name= "rightArrowBlack"/></div>
              <div ><Icon name= "rightArrowBlack"/></div>
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