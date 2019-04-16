import React from "react"
import "./sass/fav-drink.scss"
import Button from "Components/button"
import Icon from "Components/icon"
import MobileNavBar from "Components/mobile-nav-bar"
import GenreItem from "Components/GenreItem"
import { fetchGenres } from "./../api"
import Moment from "moment"

class FavDrink extends React.Component {
  constructor() {
    super()
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleEnterPress = this.handleEnterPress.bind(this)
    this.state = {
      name: "",
      genres: [],
      loadingGenres: true,
      active: -1,
      selectedCity: "",
      selectedGenre: null,
    }
  }

  UNSAFE_componentWillMount() {
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info"))
    if (!receiverInfo && !receiverInfo.cityName) {
      this.props.history.goBack()
    }
  }

  getGenreIdByName(genres, name) {
    return genres.findIndex(genre => genre.short_name === name)
  }

  handleEnterPress(e) {
    if (e.keyCode === 13 && this.state.selectedGenre) {
      location.href = `/brands/${this.state.selectedCity}/${this.state.selectedGenre}`
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEnterPress)
  }

  getGenreShortName(name) {
    return name.toLowerCase().split(" ").join("-")
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleEnterPress)
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info"))
    if (receiverInfo) {
      this.setState({
        name: receiverInfo.name,
        state_id: receiverInfo.state_id
      })
    }

    const fetchGenresReq = {
      state_id: receiverInfo.state_id
    }
    fetchGenres(fetchGenresReq)
      .then(genres => {
        const sortedGenres = genres.sort((a, b) => a.ordinal_position - b.ordinal_position)
        this.setState({ genres: sortedGenres, active: receiverInfo.genre_id, loadingGenres: false })
      })
  }

  handleClick(e) {
    e.preventDefault()
    if (!this.state.active) {
      return false
    } else {
      const path = "/" + e.currentTarget.href.split("/").slice(3).join("/")
      location.href = path
      // this.props.history.push(path)
    }
  }

  handleGenreChange(genre) {
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info"))
    if (receiverInfo) {
      receiverInfo.genreName = genre.name
      receiverInfo.genre_id = genre.id
    }

    if(window.gtag) {
      gtag("event", "choose_genre", {
        "event_label": JSON.stringify({
          selectedGenre: genre.name,
          date: Moment(new Date()).format("DD/MM/YYYY")
        })
      })
    }

    localStorage.setItem("receiver_info", JSON.stringify(receiverInfo))
    this.setState({ active: genre.id, selectedGenre: genre.name })
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
                  What is their favourite drink?
                </p>
                <p className="os s5">
                  This will let us curate a special list of drinks that you can gift them.                          
                </p>
                {
                  !this.state.loadingGenres
                    ? (
                      <div className="flex-grid">
                        {
                          this.state.genres.map((item, i) => (
                            <div className="col" key={i}>
                              <GenreItem
                                active={this.state.active}
                                onChange={this.handleGenreChange}
                                id={item.id}
                                name={item.name}
                                // shortName={item.short_name}
                              />
                            </div>
                          ))
                        }
                      </div>
                    )
                    : <p style={{ marginTop: "20px" }} className="os s5">Loading Genres...</p>
                }

                {
                  !this.state.loadingGenres && this.state.genres.length === 0 &&
                  <p style={{ marginTop: "20px" }} className="os s5">Services temporarily unavailable due to ongoing elections. We'll be back on Apr 19. #InkBeforeYouDrink</p>
                }

                <div style={{ marginTop: "20px" }}>
                  <a onClick={this.handleClick} href={`/brands/${this.state.state_id}/${this.state.active}`}>
                    <Button
                      disabled={this.state.active === -1}
                      primary
                      icon="rightArrowWhite"
                      className="small"
                    >
                      View Drink(s)
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