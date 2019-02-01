import React from "react"
import "./sendgiftv2.scss"
import GetStarted from "./get-started"
import Name from "./name"
import City from "./city"
import FavDrink from "./fav-drink"

class SendGiftV2 extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
      pageNo:0,
      receiverName:"",
      selectedCityId:0,
      selectedGenreId:0
    }
    
    this.handleReceiverChange = this.handleReceiverChange.bind(this)
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

  handleCityClick(e) {
    this.setState({
      selectedCityId: parseInt(e.target.id)
    })
  }

  handleGenreClick(e) {
    this.setState({
      selectedGenreId:parseInt(e)
    })
  }

  handleNavigatePageClick(e, pageNo) {
    this.setState({
      pageNo:pageNo
    })
  }

  handleViewDrinksClick(e) {
    const brandURL = `brands?city_id=${this.state.selectedCityId}&genre_id=${this.state.selectedGenreId}`
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
            selectedCityId = {this.state.selectedCityId}
            handleCityClick={this.handleCityClick}
            handleNavigatePageClick={this.handleNavigatePageClick}                        
            />:""
          }
          {
            this.state.pageNo ==3 ? <FavDrink
            receiverName= {this.state.receiverName}
            selectedGenreId = {this.state.selectedGenreId} 
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