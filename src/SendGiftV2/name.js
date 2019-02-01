import React from "react"
import "./name.scss"
import Button from "Components/button"
import Icon from "Components/icon"
import MobileNavBar from "Components/mobile-nav-bar"

export default function Name(props){    
    return(      
      <div id = "name" className="paper">
        <MobileNavBar stepNo = {1} stepName = {"Recipient's Name"}/>
        <div className="paper-content">
          <div className="row receiver"> 
            <Icon name= "person"/>
          </div>                           
          <div className="row">                            
            <p className="os s2">
              Enter the name of your loved one
            </p>
            <p className="os s5">
              This will help us provide a much better personalised experience to you.
            </p>
            <div className="form-group">
                <input 
                    name="receiverName" 
                    type="text" 
                    placeholder="Enter your name"
                    value = {props.name}
                    onChange= {props.handleReceiverChange}
                />
            </div>
          </div>
        </div>
        <div className="row next">
          <Button
          primary 
          icon="rightArrowWhite"
          className="small"
          onClick={(e) => props.handleNavigatePageClick(e, 2)}
          >
            Select City
          </Button>
        </div>
      </div>          
    )
    }