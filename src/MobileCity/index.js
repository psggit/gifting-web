import React from "react"
import "./mobile-city.scss"
import Button from "Components/button"
import Icon from "Components/icon"
import MobileNavBar from "Components/mobile-nav-bar"

export default function MobileCity(props){
    return(
      <div id="mobile-city">
          <div className="container os">
            <MobileNavBar stepNo = {2} stepName = {"Recipient's City"}/>
            <div className="row place"> 
              <Icon name= "gift"/>
            </div>                           
            <div className="row">                            
              <div className="steps os s0">
              Which city does the Karthik Pasagada reside in?
              </div>
              <div className="steps-result os s5">
              This will let us show you the list of drinks available in that city.
              </div>
              <div className="form-group">
                  <input 
                      name="receiverName" 
                      type="text" 
                      placeholder="Enter your name"
                  />
              </div>
            </div>
          </div>
          <div className="row next">
              <Button
              primary 
              icon="rightArrowWhite"
              className="small"
              >
              FAVOURITE DRINK
              </Button>
            </div>
      </div>
    )
    }