import React from "react"
import "./sass/fav-drink.scss"
import Button from "Components/button"
import Icon from "Components/icon"
import MobileNavBar from "Components/mobile-nav-bar"
import GenreItem from "Components/GenreItem"
import { fetchGenres } from "./../api"

class FavDrink extends React.Component {
  constructor() {
    super()
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      name: "",
      genres: [],
      active: -1,
      selectedCity: "",
      selectedGenre: null,
    }
  }

  componentWillMount() {
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info"))
    if (!receiverInfo && !receiverInfo.cityName) {
      this.props.history.goBack()
    }
  }

  componentDidMount() {
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info"))
    if (receiverInfo) {
      this.setState({
        name: receiverInfo.name,
        active: receiverInfo.genreId,
        selectedGenre: receiverInfo.genreName || null,
        selectedCity: receiverInfo.cityName
      })
    }

    const fetchGenresReq = {
      city: receiverInfo.cityName
    }
    fetchGenres(fetchGenresReq)
      .then(data => {
        this.setState({ genres: data })
      })
  }

  handleClick(e) {
    if (!this.state.selectedGenre) {
      e.preventDefault()
    }
  }

  handleGenreChange(genre) {
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info"))
    if (receiverInfo) {
      receiverInfo.genreId = genre.id
      receiverInfo.genreName = genre.shortName
    }

    localStorage.setItem("receiver_info", JSON.stringify(receiverInfo))
    this.setState({ active: genre.id, selectedGenre: genre.shortName })
  }
  render() {
    return (
      <div id="send-gift-drink">
        {/* <MobileNavBar stepNo = {3} stepName = {"Favourite drink"}  */}
          {/* handleNavigatePageClick = {props.handleNavigatePageClick}/> */}
        <div className="container">
          <div className="paper">
            <div className="paper-content">
              <div className="row fav-drink"> 
                <Icon name="drink" />
              </div>                           
              <div className="row">                            
                <p className="os s2">
                  What’s {this.state.name}'s favourite drink?
                </p>
                <p className="os s5">
                  This will let us curate a special list of drinks that you can gift them.                          
                </p>
                <div className="flex-grid">
                  {
                    this.state.genres.map((item, i) => (
                      <div className="col" key={i}>
                        <GenreItem
                          active={this.state.active}
                          onChange={this.handleGenreChange}
                          id={i}
                          name={item.display_name}
                          shortName={item.short_name}
                        />
                      </div>
                    ))
                  }
                </div>

                <div style={{ marginTop: "40px" }}>
                  <a onClick={this.handleClick} href={`/brands/${this.state.selectedCity}/${this.state.selectedGenre}`}>
                    <Button 
                      primary
                      icon="rightArrowWhite"
                      className="small"
                    >
                      View Drinks
                    </Button>
                  </a>
                </div>

              </div> 
            </div>
          </div>
        </div>
      </div>          
    )
  }
}

export default FavDrink