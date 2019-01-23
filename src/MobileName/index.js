import React from "react"
import "./mobile-name.scss"
import Button from "Components/button"
import Icon from "Components/icon"

export default function MobileName(props){
    return(
      <div id="mobile-name">
          <div className="container os">
            <div className="row reciever"> 
              <Icon name= "gift"/>
            </div>                           
            <div className="row">                            
              <div className="steps os s0">
              Start off by entering the name of your loved one
              </div>
              <div className="steps-result os s5">
              Start off by entering the name of your loved one
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
              SELECT CITY
              </Button>
            </div>
      </div>
    )
    }