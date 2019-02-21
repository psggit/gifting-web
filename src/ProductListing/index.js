/*
  This page need to be server side renderesd
*/

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
 
class ProductListing extends React.Component {
  constructor(props) {
    super(props)
    this.fetchBrandsReq = {}
    this.shouldFetchMore = true
    this.state = {
      search_text: "",
      brands: props.brands || [],
      isBrandsLoading: false,
      isBrandsAvailable: true,
      shouldMountGenres: false,
      shouldMountSearchResults: false,
      genres: [],
      scrollUp: false,
      WebHeaderKey: 0,
      intersectionTarget: null,
      isMobile: props.isMobile,
      isLaptop: !props.isMobile,  
      isTablet: !props.isMobile,
      basket: null,
      activeCity: props.activeCity,
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
    const brands = window.__BRANDS__ || []
    const activeCity = window.__active_city__ || this.props.match.params.citySlug
    const activeGenre = window.__active_genre__ || this.props.match.params.genreSlug
    delete window.__active_city__
    delete window.__active_genre__
    delete window.__BRANDS__
    this.setState({ brands, activeCity, activeGenre })
    this.setState({ basket: localStorage.getItem("basket") })
    window.onpopstate = this.setDataFromUrl
    window.addEventListener("scroll", this.observeScrollDirection, false)

    const fetchGenresReq = {
      city: capitalize(activeCity)
    }

    fetchGenres(fetchGenresReq)
      .then(genres => this.sortGenres(genres))
      .then(sortedGenres => this.setGenres(sortedGenres))
    /* Polyfill for intersection observer API */
    require("intersection-observer")
    if (!brands.length) {
      this.setDataFromUrl()
    }
  }

  getViewPortWidth() {
    const isMobile = window.innerWidth <= 640
    const isTablet = window.innerWidth > 640 && window.innerWidth <= 1024
    const isLaptop = window.innerWidth > 1024

    return { isMobile, isTablet, isLaptop }
  }

  setDataFromUrl() {
    const { params } = this.props.match
    const fetchBrandsReq = {
      city: capitalize(params.citySlug),
      genre: params.genreSlug,
      offset: 0,
      limit: this.limit
    }

    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info")) || {}
    receiverInfo.cityName = params.citySlug
    receiverInfo.genreName = params.genreSlug
    localStorage.setItem("receiver_info", JSON.stringify(receiverInfo))
    
    fetchBrandsUsingGenre(fetchBrandsReq)
      .then(brands => {
        this.setState({ isBrandsAvailable: brands.length > 0 })
        this.setBrands(brands, () => {
          this.findInterSection()
        })
      })
  }

  setBrands(brands, CB) {
    if (CB) {
      this.setState({ brands }, CB)
    } else {
      this.setState({ brands })
    }
  }

  setGenres(genres) {
    this.setState({ genres })
  }

  sortGenres(genres) {
    return genres.sort((a, b) => a.ordinal_position - b.ordinal_position)
  }

  resetScrollIntersectionParams() {
    this.disableScrollIntersection = false
    this.offset = 0
  }

  handleCityChange(city) {
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info")) || {}
    receiverInfo.cityName = city.name
    receiverInfo.gps = city.gps
    localStorage.setItem("receiver_info", JSON.stringify(receiverInfo))
    localStorage.removeItem("basket")
    this.resetScrollIntersectionParams()
    const fetchGenresReq = {
      city: capitalize(city.name)
    }

    fetchGenres(fetchGenresReq)
      .then(genres => this.sortGenres(genres))
      .then(sortedGenres => {
        this.props.history.push(`/brands/${city.name}/${sortedGenres[0].short_name}`)
        this.setState({ activeCity: city.name, activeGenre: sortedGenres[0].short_name })
        this.setGenres(sortedGenres)
        
        fetchBrandsUsingGenre({
          city: capitalize(city.name),
          genre: sortedGenres[0].short_name,
          offset: 0,
          limit: this.limit
        })
          .then(brands => this.setBrands(brands))
      })
  }

  handleGenreChange(genre) {
    this.props.history.push(`/brands/${this.props.match.params.citySlug}/${genre.shortName}`)
    this.setState({ activeGenre: genre.shortName })
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info")) ||{}
    receiverInfo.genreName = genre.shortName
    localStorage.setItem("receiver_info", JSON.stringify(receiverInfo))
    this.resetScrollIntersectionParams()
    const fetchBrandsReq = {
      city: capitalize(this.props.match.params.citySlug),
      genre: genre.shortName,
      limit: this.limit,
      offset: 0
    }

    fetchBrandsUsingGenre(fetchBrandsReq)
      .then(brands => this.setBrands(brands))
  }

  setFetchMoreStatus(res) {
    if (res.length < this.limit) {
      this.shouldFetchMore = false
    }
  }

  findInterSection() {
    const intersectionTarget = document.getElementById("scroll-intersection")
    const _self = this

    let io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !_self.disableScrollIntersection) {
          _self.setState({ isBrandsLoading: true })
          _self.offset += _self.limit
          const fetchBrandsReq = {
            city: capitalize(_self.props.match.params.citySlug),
            genre: _self.props.match.params.genreSlug,
            limit: _self.limit,
            offset: _self.offset
          }
          
          fetchBrandsUsingGenre(fetchBrandsReq)
            .then(brands => {
              _self.setState({
                brands: _self.state.brands.concat(brands),
                isBrandsLoading: false
              })
              // _self.updateIntersectionTarget()
              _self.disableScrollIntersection = brands.length < _self.limit
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
    return (
      <div id="BrandsListing">
        <div className="container">
          <div className="paper">
            {
              this.state.isMobile
                ? <MobileHeader
                  {...this.props}
                  activeGenre={this.state.activeGenre}
                  activeCity={this.state.activeCity}
                  openGenres={this.openGenres}
                  handleGenreChange={this.handleGenreChange}
                  genres={this.state.genres}
                  onCityChange={this.handleCityChange}
                />
                : <WebHeader
                  {...this.props}
                  // key={this.state.WebHeaderKey}
                  activeGenre={this.state.activeGenre}
                  activeCity={this.state.activeCity}
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
              this.state.shouldMountGenres &&
              <GenreOverlay
                {...this.props}
                activeGenre={this.state.activeGenre}
                activeCity={this.state.activeCity}
                genres={this.state.genres}
                closeGenres={this.closeGenres}
                handleGenreChange={this.handleGenreChange}
                shouldMountGenres={this.state.shouldMountGenres}
              />
            }
            {
              this.state.isMobile && this.state.scrollUp && this.state.basket && <BasketTotal />
            }

            {
              this.state.isBrandsAvailable
                ? <BrandsList
                  activeGenre={this.state.activeGenre}
                  activeCity={this.state.activeCity}
                  data={this.state.brands} 
                />
                : <NoBrandsAvailable />
            }
            { this.state.isBrandsLoading && <Loader /> }
            <div style={{ position: "absolute", bottom: "20%" }} id="scroll-intersection"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductListing