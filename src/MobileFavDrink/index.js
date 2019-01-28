import React from "react"
import "./mobile-fav-drink.scss"
import Button from "Components/button"
import Icon from "Components/icon"
import MobileNavBar from "Components/mobile-nav-bar"

export default function MobileFavDrink(props){
    return(
      <div id="mobile-fav-drink">
          <div className="container os">
            <MobileNavBar stepNo = {3} stepName = {"Favourite drink"}/>
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
              <div class="list">
                <div class="" >
                  <Icon name="instagramLogo" />
                  <div>Whiskey</div>
                </div>
                <div class="" >
                  <Icon name="instagramLogo" />
                  <div>Beer</div>
                </div>
                <div class="active" >
                  <Icon name="instagramLogo" />
                  <div>Rum</div>
                </div>
                <div class="" >
                  <Icon name="instagramLogo" />
                  <div>Vodka</div>
                </div>
                <div class="" >
                  <Icon name="instagramLogo" />
                  <div>Gin</div>
                </div>
                <div class="" >
                  <Icon name="instagramLogo" />
                  <div>Tequila</div>
                </div>
                <div class="" >
                  <Icon name="instagramLogo" />
                  <div>Liqueur</div>
                </div>
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