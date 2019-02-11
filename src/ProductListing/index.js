import React from "react"
import "./sass/listing.scss"

/* Polyfill for intersection observer API */
import "intersection-observer"

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
  constructor() {
    super()
    this.fetchBrandsReq = {}
    this.shouldFetchMore = true
    this.state = {
      search_text: "",
      brands: [],
      isBrandsLoading: false,
      isBrandsAvailable: true,
      shouldMountGenres: false,
      shouldMountSearchResults: false,
      genres: [],
      scrollUp: false,
      WebHeaderKey: 0
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
    window.onpopstate = this.setDataFromUrl
    window.addEventListener("scroll", this.observeScrollDirection, false)
    this.setDataFromUrl()
  }

  setDataFromUrl() {
    const { params } = this.props.match
    const fetchBrandsReq = {
      city: capitalize(params.citySlug),
      genre: params.genreSlug,
      offset: 0,
      limit: this.limit
    }

    const fetchGenresReq = {
      city: capitalize(params.citySlug)
    }

    fetchGenres(fetchGenresReq)
      .then(genres => this.sortGenres(genres))
      .then(sortedGenres => this.setGenres(sortedGenres))
    
    fetchBrandsUsingGenre(fetchBrandsReq)
      .then(brands => {if (brands)
        this.setState({ isBrandsAvailable: brands.length > 0 })
        this.setBrands(brands)
      })
      .then(this.findInterSection())
  }

  setBrands(brands) {
    this.setState({ brands })
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
    localStorage.setItem("gps", city.gps)
    localStorage.removeItem("basket")
    const { WebHeaderKey } = this.state
    const key = WebHeaderKey + 1
    this.setState({ WebHeaderKey: key })
    this.resetScrollIntersectionParams()
    const fetchGenresReq = {
      city: capitalize(city.name)
    }

    fetchGenres(fetchGenresReq)
      .then(genres => this.sortGenres(genres))
      .then(sortedGenres => {
        this.props.history.push(`/brands/${city.name}/${sortedGenres[0].short_name}`)
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

  // fetchProducts({limit, offset}, CB) {
  //   GET({
  //     api: `http://jsonplaceholder.typicode.com/photos?_start=${offset}&_limit=${limit}`,
  //     prependBaseUrl: false,
  //     type: "public",
  //     handleError: true
  //   })
  //     .then(json => {
  //       CB(json)
  //     })
  // }

  findInterSection() {
    const target = document.getElementById("scroll-intersection")
    const _self = this
    let io = new IntersectionObserver(function(entries) {
      console.log("finding......")
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !_self.disableScrollIntersection) {
          console.log(_self.offset)
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
              _self.disableScrollIntersection = brands.length < _self.limit
            })
            
        }
      })
    })

    io.POLL_INTERVAL = 100
    io.USE_MUTATION_OBSERVER = false
    io.observe(target)
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
              this.props.context.isMobile
                ? <MobileHeader
                  {...this.props}
                  openGenres={this.openGenres}
                  handleGenreChange={this.handleGenreChange}
                  genres={this.state.genres}
                  onCityChange={this.handleCityChange}
                />
                : <WebHeader
                  {...this.props}
                  key={this.state.WebHeaderKey}
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
            
            <GenreOverlay
              genres={this.state.genres}
              closeGenres={this.closeGenres}
              shouldMountGenres={this.state.shouldMountGenres}
            />
            {
              this.props.context.isMobile && this.state.scrollUp && <BasketTotal />
            }

            {
              this.state.isBrandsAvailable
                ? <BrandsList {...this.props} data={this.state.brands} />
                : <NoBrandsAvailable />
            }
            { this.state.isBrandsLoading && <Loader /> }
          </div>
        </div>
        <div id="scroll-intersection"></div>
      </div>
    )
  }
}

export default ProductListing