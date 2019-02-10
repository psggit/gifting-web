import React from "react"
import "./fav-drink.scss"
import Button from "Components/button"
import Icon from "Components/icon"
import MobileNavBar from "Components/mobile-nav-bar"
import GenreItem from "Components/GenreItem"

export default function FavDrink(props){
  return(
    <div id="drink" className="paper">
      <MobileNavBar stepNo = {3} stepName = {"Favourite drink"} 
        handleNavigatePageClick = {props.handleNavigatePageClick}/>
      <div className="paper-content">
        <div className="row fav-drink"> 
          <Icon name="drink" />
        </div>                           
        <div className="row">                            
          <p className="os s2">
            What’s {props.receiverName}'s favourite drink?
          </p>
          <p className="os s5">
            This will let us curate a special list of drinks that you can gift them.                          
          </p>
          <div className="flex-grid">
          {
            props.genres.map((item, i) => (
              <div className="col" key={i}>
                <GenreItem
                  active={props.selectedGenreId}
                  onChange={props.handleGenreClick}
                  id={item.id}
                  name={item.name}
                  shortName={item.shortName}
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
          onClick={props.handleViewDrinksClick}
        >
          View Drinks
        </Button>
      </div>
    </div>          
  )
}