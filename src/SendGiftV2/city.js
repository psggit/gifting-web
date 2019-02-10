import React from "react"
import "./city.scss"
import Button from "Components/button"
import Icon from "Components/icon"
import MobileNavBar from "Components/mobile-nav-bar"
import CityCheckBox from "Components/city-checkbox"

import { fetchCities } from "./../api"

class City extends React.Component {
  constructor(props) { 
    super(props)
    this.handleCityClick = this.handleCityClick.bind(this)
    this.state = {
      cities: [],
    }
  }

  handleCityClick(e) {
    this.props.handleCityClick(e)
  }

  componentDidMount() {
    fetchCities().then(data => {
      const sortedCities = data.sort((a, b)=>{
        if(a.name<b.name){return -1}
        if(a.name>b.name){return 1}
        return 0;
      })

      this.setState({ cities: sortedCities })
    })
  }
 
  
  render() {
    return(
      <div id="city" className="paper">
        <MobileNavBar stepNo = {2} stepName = {"Recipient's City"} 
          handleNavigatePageClick = {this.props.handleNavigatePageClick} />
        <div className="paper-content">
          <div className="row city"> 
            <Icon name="locationOutlined" />
          </div>                           
          <div className="row">                            
            <p className="os s2">
              Which city does the {this.props.receiverName} reside in?            
            </p>
            <p className="os s5">
              This will let us show you the list of drinks available in that city.              
            </p>

            <div className="flex-grid">
            {
              this.state.cities.map((item, i) => (
                <div className="col" key={i}>
                  <CityCheckBox
                    active={this.props.selectedCityId}
                    handleClick={this.handleCityClick}
                    id={item.id}
                    gps={item.gps}
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
            onClick={(e) => this.props.handleNavigatePageClick(e, 3)}
            >
              Favourite Drink
            </Button>
        </div>
      </div>
    )
    }
  }
  export default City