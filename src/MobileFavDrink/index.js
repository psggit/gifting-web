import React from "react"
import "./mobile-fav-drink.scss"
import Button from "Components/button"
import Icon from "Components/icon"
import MobileNavBar from "Components/mobile-nav-bar"
import GenreItem from "Components/GenreItem"

export default function MobileFavDrink(props){
  const genres = [
    { name: "Whiskey", id: 1 },
    { name: "Rum", id: 2},
    { name: "Vodka", id: 3},
    { name: "RTD", id: 4},
    { name: "Beer", id: 5},
    { name: "Tequila", id: 6},
    { name: "Gin", id: 7}
  ]



  return(
    <div className="paper drink">
      <MobileNavBar stepNo = {3} stepName = {"Favourite drink"} 
        handleNavigatePageClick = {props.handleNavigatePageClick}/>
      <div className="paper-content">
        <div className="row fav-drink"> 
          <Icon name="drink" />
        </div>                           
        <div className="row">                            
          <p className="os s2">
            What’s {props.receiverName} favourite drink?
          </p>
          <p className="os s5">
            This will let us curate a special list of drinks that you can gift them.                          
          </p>
          <div className="flex-grid">
          {
            genres.map((item, i) => (
              <div className="col" key={i}>
                <GenreItem
                  active={props.selectedGenreId}
                  handleClick={props.handleGenreClick}
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
          //onClick={props.handleNavigatePageClick}
        >
          View Drinks
        </Button>
      </div>
    </div>          
  )
}