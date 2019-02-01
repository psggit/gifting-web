import React from "react"
import "./wizard-progress-bar.scss"
import Icon from "./../icon"

export default function WizardProgressBar(props){    
    return(
      <div className="flex-grid">
        <div
          onClick={props.handleClick}
          className="wizard">
          <div className="wizard-icon-left">
            <span><Icon name="drinkChecked" /></span>
            <div className="wizard-text">
              <p className="os">Recipients's Name</p>
            </div>
          </div>          
        </div>

        <div
          onClick={props.handleClick}
          className="wizard">
          <div className="wizard-icon-left">
            <span><Icon name="drinkChecked" /></span>
            <div className="wizard-text">
              <p className="os">Recipients's City</p>
            </div>
          </div>          
          <div className="wizard-icon-right">
            <span><Icon name="drinkChecked" /></span>
            <div className="wizard-text-last">
              <p className="os">Favorite Drink</p>
          </div>
          </div>          
        </div>
        
      </div>
    )
  }