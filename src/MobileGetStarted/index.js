import React from "react"
import "./mobile-get-started.scss"
import Button from "Components/button"
import Icon from "Components/icon"

export default function MobileGetStarted(props){
    return(
      <div id="mobile-get-started">
          <div className="container os">
            <div className="row gift"> 
              <Icon name= "gift"/>
            </div>                           
            <div className="row">                            
              <div className="welcome-to-hipbar os s0">
                  Welcome to HipBar Gifting!
              </div>
              <div className="we-ll-help-you-choos os s5">
                  We’ll help you choose the perfect drink to gift for your special someone!
              </div>
            </div>

            <div className="row next">
              <Button
              primary 
              icon="rightArrowWhite"
              className="small"
              >
              GET STARTED
              </Button>
            </div>
          </div>
      </div>
    )
    }