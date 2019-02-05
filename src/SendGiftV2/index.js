import React from "react"
import "./sendgiftv2.scss"
import GetStarted from "./get-started"
import Name from "./name"
import City from "./city"
import FavDrink from "./fav-drink"
import { fetchGenres } from "./../api"

class SendGiftV2 extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
      pageNo:0,
      receiverName:"",
      cities:[],
      selectedCity:{},
      genres:[],
      selectedGenre:{}
    }
    
    this.handleReceiverChange = this.handleReceiverChange.bind(this)
    this.handleSetCities = this.handleSetCities.bind(this)
    this.handleCityClick = this.handleCityClick.bind(this)
    this.handleGenreClick = this.handleGenreClick.bind(this)    
    this.handleNavigatePageClick = this.handleNavigatePageClick.bind(this)
    this.handleViewDrinksClick = this.handleViewDrinksClick.bind(this)
  }

  handleReceiverChange(e){
    this.setState({
      receiverName:e.target.value
    })
  }

  handleSetCities(data){
    this.setState({ cities: data })
  }

  handleCityClick(city) {
    this.setState({
      selectedCity: city
    })

    fetchGenres(city.gps, (data) => {
      var sortedGenres = data.sort((a, b) => a.ordinal_position - b.ordinal_position)
      sortedGenres = sortedGenres.map((item) => ({id:item.ordinal_position, name:item.genre_name, shortName: item.short_name}) )
      this.setState({ genres: sortedGenres })
    })
  }

  handleGenreClick(genre) {
    this.setState({
      selectedGenre:genre//parseInt(genre.shortName)
    })
  }

  handleNavigatePageClick(e, pageNo) {
    this.setState({
      pageNo:pageNo
    })
  }

  handleViewDrinksClick(e) {
    const brandURL = `brands/${this.state.selectedCity.name}/${this.state.selectedGenre.shortName}`
    this.props.history.push(brandURL)
  }

  render() {
    return(
      <div id="sendgiftv2">
        <div className="container">
          {
            this.state.pageNo ==0 ? <GetStarted handleNavigatePageClick={this.handleNavigatePageClick} />:""
          }
          {
            this.state.pageNo ==1 ? <Name name={this.state.receiverName} handleNavigatePageClick={this.handleNavigatePageClick} 
            handleReceiverChange={this.handleReceiverChange}/>:""
          }
          {
            this.state.pageNo ==2 ? <City
            receiverName= {this.state.receiverName}
            selectedCityId = {parseInt(this.state.selectedCity.id)}
            handleCityClick={this.handleCityClick}
            handleSetCities = {this.handleSetCities}
            handleNavigatePageClick={this.handleNavigatePageClick}                        
            />:""
          }
          {
            this.state.pageNo ==3 ? <FavDrink
            receiverName= {this.state.receiverName}
            genres = {this.state.genres}
            selectedGenreId = {parseInt(this.state.selectedGenre.id)} 
            handleGenreClick={this.handleGenreClick}
            handleNavigatePageClick={this.handleNavigatePageClick}
            handleViewDrinksClick={this.handleViewDrinksClick}
            />:""
          }
        </div>
      </div>
    )
  }
}

export default SendGiftV2