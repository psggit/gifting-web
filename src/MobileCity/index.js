import React from "react"
import "./mobile-city.scss"
import Button from "Components/button"
import Icon from "Components/icon"
import MobileNavBar from "Components/mobile-nav-bar"
import CityCheckBox from "Components/city-checkbox"


export default function MobileCity(props){
    const cities = [
      { name: "Bengaluru", id: 1 },
      { name: "Goa", id: 2},
      { name: "Mahe", id: 3},
      { name: "New Delhi", id: 4},
    ]


    return(
      <div className="paper city">
        <MobileNavBar stepNo = {2} stepName = {"Recipient's City"} 
          handleNavigatePageClick = {props.handleNavigatePageClick} />
        <div className="paper-content">
          <div className="row city"> 
            <Icon name="locationOutlined" />
          </div>                           
          <div className="row">                            
            <p className="os s2">
              Which city does the {props.receiverName} reside in?            
            </p>
            <p className="os s5">
              This will let us show you the list of drinks available in that city.              
            </p>

            <div className="flex-grid">
            {
              cities.map((item, i) => (
                <div className="col" key={i}>
                  <CityCheckBox
                    active={props.selectedCityId}
                    handleClick={props.handleCityClick}
                    id={item.id}
                    name={item.name}
                  />
                </div>
              ))
            }
            </div> 
          </div>            
        </div>
        <div className="row next">
            <Button
            primary 
            icon="rightArrowWhite"
            className="small"
            onClick={(e) => props.handleNavigatePageClick(e, 3)}
            >
              Favourite Drink
            </Button>
        </div>
      </div>
    )
    }