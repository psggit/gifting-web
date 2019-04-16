import React from "react"
import "./sass/listing.scss"
import BrandsList from "./BrandsList"
import { GET } from "Utils/fetch"

import Loader from "Components/loader"
import GenreOverlay from "./GenreOverlay"
import Search from "Components/Search"
import BasketTotal from "./BasketTotal"
import Icon from "Components/icon"
import SearchResults from "./SearchResults"
import CitySelect from "./CitySelect"
import MobileHeader from "./MobileHeader"
import WebHeader from "./WebHeader"
import { fetchGenres, fetchBrandsUsingGenre } from "./../api"
import { capitalize } from "Utils/logic-utils"
import NoBrandsAvailable from "./NobrandsAvailable"
import { scrollToTop } from "Utils/ui-utils"
 
class ProductListing extends React.Component {
  constructor(props) {
    super(props)
    this.fetchBrandsReq = {}
    this.shouldFetchMore = true
    this.disableScrollIntersection = false
    this.state = {
      search_text: "",
      brands: props.brands || [],
      isBrandsLoading: false,
      isBrandsAvailable: true,
      isLoading: false,
      shouldMountGenres: false,
      shouldMountSearchResults: false,
      genres: [],
      scrollUp: false,
      WebHeaderKey: 0,
      intersectionTarget: null,
      isMobile: props.context ? props.context.isMobile : props.isMobile,
      basket: null,
      activeState: props.activeState,
      activeGenre: props.activeGenre
    }

    this.limit = 11
    this.offset = 0

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.findInterSection = this.findInterSection.bind(this)
    this.setFetchMoreStatus = this.setFetchMoreStatus.bind(this)
    this.resetScrollIntersectionParams = this.resetScrollIntersectionParams.bind(this)
    this.openGenres = this.openGenres.bind(this)
    this.closeGenres = this.closeGenres.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.cancelSearch = this.cancelSearch.bind(this)
    this.setDataFromUrl = this.setDataFromUrl.bind(this)
    this.observeScrollDirection = this.observeScrollDirection.bind(this)
  }

  componentWillUnmount() {
    window.onpopstate = null
    window.removeEventListener("scroll", this.observeScrollDirection, false)
  }

  componentDidMount() {
    scrollToTop()
    const brands = window.__BRANDS__ || []
    const activeState = window.__active_state__ || parseInt(this.props.match.params.citySlug)
    const activeGenre = window.__active_genre__ || parseInt(this.props.match.params.genreSlug)
    const isMobile = window.__isMobile__ || this.props.context.isMobile
    delete window.__isMobile__
    delete window.__active_state__
    delete window.__active_genre__
    delete window.__BRANDS__
    
    this.setState({ brands, activeState, activeGenre, isMobile })
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info")) || {}
    receiverInfo.state_id = activeState
    receiverInfo.genre_id = activeGenre

    localStorage.setItem("receiver_info", JSON.stringify(receiverInfo))
    this.setState({ basket: JSON.parse(localStorage.getItem("basket")) })
    window.onpopstate = this.setDataFromUrl
    window.addEventListener("scroll", this.observeScrollDirection, false)

    // const fetchGenresReq = {
    //   state_id: activeState
    // }

    // fetchGenres(fetchGenresReq)
    //   .then(genres => this.sortGenres(genres))
    //   .then(sortedGenres => this.setGenres(sortedGenres))
    /* Polyfill for intersection observer API */
    require("intersection-observer")
    if (!brands.length) {
      this.setDataFromUrl(activeState, activeGenre)
    }
    this.findInterSection()
  }

  getViewPortWidth() {
    const isMobile = window.innerWidth <= 640
    return { isMobile }
  }

  setDataFromUrl(activeState, activeGenre) {
    // const { params } = this.props.match
    const fetchBrandsReq = {
      state_id: activeState,
      genre_id: activeGenre,
      offset: 0,
      limit: this.limit
    }

    const fetchGenresReq = {
      state_id: activeState
    }

    // this.setState({ activeState: params.citySlug, activeGenre: params.genreSlug })
    // const receiverInfo = JSON.parse(localStorage.getItem("receiver_info")) || {}
    // receiverInfo.cityName = params.citySlug
    // receiverInfo.genreName = params.genreSlug
    // localStorage.setItem("receiver_info", JSON.stringify(receiverInfo))

    fetchGenres(fetchGenresReq)
      .then(genres => this.sortGenres(genres))
      .then(sortedGenres => this.setGenres(sortedGenres))
    
    fetchBrandsUsingGenre(fetchBrandsReq)
      .then(brands => {
        this.setState({ isBrandsAvailable: brands.length > 0 })
        this.setBrands(brands)
      })
  }

  setBrands(brands, CB) {
    console.log("set brands")
    if (CB) {
      this.setState({ brands, isLoading: false }, CB)
    } else {
      this.setState({ brands, isLoading: false })
    }
  }

  setGenres(genres) {
    console.log("genres", genres)
    this.setState({ genres })
  }

  sortGenres(genres) {
    // return genres.sort((a, b) => a.ordinal_position - b.ordinal_position)
    return genres.sort((a, b) => {
      if(a.short_name < b.short_name) { return -1 }
      if(a.short_name > b.short_name) { return 1 }
      return 0
    })
  }

  resetScrollIntersectionParams() {
    this.disableScrollIntersection = false
    this.offset = 0
  }

  handleCityChange(city) {
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info")) || {}
    receiverInfo.cityName = city.name
    receiverInfo.gps = city.gps
    receiverInfo.city_id = city.id
    receiverInfo.state_id = city.state_id
    localStorage.setItem("receiver_info", JSON.stringify(receiverInfo))
    localStorage.removeItem("basket")
    localStorage.removeItem("promo_code")
    this.setState({ basket: null, activeState: city.state_id, brands: [], genres: [], isLoading: true })
    this.resetScrollIntersectionParams()
    const fetchGenresReq = {
      state_id: city.state_id
    }

    fetchGenres(fetchGenresReq)
      .then(genres => this.sortGenres(genres))
      .then(sortedGenres => {
        this.props.history.push(`/brands/${city.id}/${sortedGenres[0].id}`)
        this.setState({ activeGenre: sortedGenres[0].id })
        this.setGenres(sortedGenres)
        
        fetchBrandsUsingGenre({
          state_id: city.state_id,
          genre_id: sortedGenres[0].id,
          offset: 0,
          limit: this.limit
        })
          .then(brands => this.setBrands(brands))
      })
  }

  handleGenreChange(genre) {
    this.props.history.push(`/brands/${this.props.match.params.citySlug}/${genre.id}`)
    this.setState({ activeGenre: genre.id, isLoading: true })
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info")) ||{}
    receiverInfo.genre_id = genre.id
    localStorage.setItem("receiver_info", JSON.stringify(receiverInfo))
    this.resetScrollIntersectionParams()
    const fetchBrandsReq = {
      state_id: parseInt(this.props.match.params.citySlug),
      genre_id: genre.id,
      limit: this.limit,
      offset: 0
    }

    fetchBrandsUsingGenre(fetchBrandsReq)
      .then(brands => this.setBrands(brands))
      .then(() => {
        this.setState({ isLoading: false })
      })
  }

  setFetchMoreStatus(res) {
    if (res.length < this.limit) {
      this.shouldFetchMore = false
    }
  }

  findInterSection() {
    const intersectionTarget = document.getElementById("scroll-intersection")

    let io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(this.disableScrollIntersection)
        if (entry.isIntersecting && !this.disableScrollIntersection) {
          this.setState({ isBrandsLoading: true })
          this.offset += this.limit
          const fetchBrandsReq = {
            state_id: parseInt(this.props.match.params.citySlug),
            genre_id: parseInt(this.props.match.params.genreSlug),
            limit: this.limit,
            offset: this.offset
          }
          
          fetchBrandsUsingGenre(fetchBrandsReq)
            .then(brands => {
              console.log(this.state.brands.concat(brands))
              this.setState({
                brands: this.state.brands.concat(brands),
                isBrandsLoading: false
              })
              // this.updateIntersectionTarget()
              this.disableScrollIntersection = brands.length < this.limit
            })  
        }
      })
    })

    io.POLL_INTERVAL = 100
    io.USE_MUTATION_OBSERVER = false
    io.observe(intersectionTarget)
  }

  openGenres() {
    this.setState({ shouldMountGenres: true })
    document.body.style.overflow = "hidden"
  }

  closeGenres() {
    this.setState({ shouldMountGenres: false })
    document.body.style.overflow = ""
  }

  observeScrollDirection() {
    var lastScrollTop = 0
    // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
    var st = window.pageYOffset || document.documentElement.scrollTop
    if (st > lastScrollTop){
      this.setState({ scrollUp: false })
    } else {
      this.setState({ scrollUp: true })
    }
    lastScrollTop = st <= 0 ? 0 : st // For Mobile or negative scrolling
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value})
  }

  handleSearch(query) {
    // call search api here
    console.log("Searching for " + query)
  }

  handleFocus() {
    console.log("mounting search..")
    this.setState({ shouldMountSearchResults: true })
    document.body.style.overflow = "hidden"
  }

  cancelSearch() {
    document.body.style.overflow = ""
    this.setState({ shouldMountSearchResults: false })
  }

  render() {
    const showMobileBasket = this.state.isMobile && this.state.basket
    return (
      <div id="BrandsListing">
        <div className="container">
          <div style={showMobileBasket ? { marginBottom:"85px"} :{}} className="paper">
            {
              this.state.isMobile
                ? <MobileHeader
                  {...this.props}
                  activeGenre={this.state.activeGenre}
                  activeState={this.state.activeState}
                  openGenres={this.openGenres}
                  handleGenreChange={this.handleGenreChange}
                  genres={this.state.genres}
                  onCityChange={this.handleCityChange}
                />
                : <WebHeader
                  {...this.props}
                  // key={this.state.WebHeaderKey}
                  activeGenre={this.state.activeGenre}
                  activeState={this.state.activeState}
                  handleGenreChange={this.handleGenreChange}
                  genres={this.state.genres}
                  onCityChange={this.handleCityChange}
                />
            }
            {/* <div className="header">

              <div className="row">
                <Search
                  onFocus={this.handleFocus}
                  placeholder="Search for products"
                  onSearch={this.handleSearch}
                  cancelSearch={this.cancelSearch}
                />
              </div>

              { this.state.shouldMountSearchResults && <SearchResults data={[]} /> }

              <div className="row">
                <span className="os s7">Showing drinks for:</span>
                <span
                  className="os s1"
                  onClick={this.openGenres}
                  style={{
                    textDecoration: "underline",
                    fontWeight: "600",
                    display: "inline",
                    padding: "16px 10px"
                  }}>
                  <Icon name="drink" />
                  Whiskey
                  <Icon name="caret" />
                </span>   
              </div>

              
            </div> */}
            
            {
              this.state.shouldMountGenres && this.state.genres.length > 0 &&
              <GenreOverlay
                {...this.props}
                activeGenre={this.state.activeGenre}
                activeState={this.state.activeState}
                genres={this.state.genres}
                closeGenres={this.closeGenres}
                handleGenreChange={this.handleGenreChange}
                shouldMountGenres={this.state.shouldMountGenres}
              />
            }
            {
              showMobileBasket && <BasketTotal />
            }
            {
              this.state.isLoading &&
              <Loader />
            }
            {
              !this.state.isLoading &&
                <BrandsList
                  {...this.props}
                  activeGenre={this.state.activeGenre}
                  activeState={this.state.activeState}
                  data={this.state.brands} 
                />
            }
            {
              !this.state.isLoading && !this.state.isBrandsLoading && this.state.brands.length === 0 &&
              <NoBrandsAvailable />
            }
            {/* { this.state.isBrandsLoading && <Loader /> } */}
            <div style={{ position: "absolute", bottom: "25%" }} id="scroll-intersection"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductListing