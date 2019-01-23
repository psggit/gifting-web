import React from "react"
import "./mobile-fav-drink.scss"
import Button from "Components/button"
import Icon from "Components/icon"

export default function MobileFavDrink(props){
    return(
      <div id="mobile-fav-drink">
          <div className="container os">
            <div className="row fav-drink"> 
              <Icon name= "gift"/>
            </div>                           
            <div className="row">                            
              <div className="steps os s0">
              What’s Karthik Pasagada’s favourite drink?
              </div>
              <div className="steps-result os s5">
              This will let us curate a special list of drinks that you can gift them.
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
              VIEW DRINKS
              </Button>
            </div>
      </div>
    )
    }