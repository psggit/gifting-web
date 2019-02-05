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
 
class ProductListing extends React.Component {
  constructor() {
    super()
    this.fetchBrandsReq = {}
    this.shouldFetchMore = true
    this.state = {
      search_text: "",
      brands: [],
      isBrandsLoading: false,
      shouldMountGenres: false,
      shouldMountSearchResults: false,
      genres: []
    }

    this.limit = 10
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
  }

  componentDidMount() {
    this.setState({ loadingCities: true })
    // this.findInterSection()
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
      .then(brands => this.setBrands(brands))
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
          const fetchBrandsReq = {
            city: capitalize(_self.props.match.params.citySlug),
            genre: _self.props.match.params.genreSlug,
            limit: _self.limit,
            offset: _self.offset + _self.limit
          }
          
          fetchBrandsUsingGenre(fetchBrandsReq)
            .then(brands => {
              _self.setState({
                brands: _self.state.brands.concat(brands),
                isBrandsLoading: false
              })
              _self.disableScrollIntersection = brands.length < _self.limit
              _self.offset += _self.limit
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

  // findScroll() {
  //   console.log("scrolling")
  //   const scrollInterSection = document.getElementById("scroll-intersection")
  //   const scrollInterSectionOffset = scrollInterSection.offsetTop
  //   // var footerElement = document.getElementsByClassName("footer")[0]
  //   //var scrollElement = document.getElementById("scrollDiv")
  //   var scrollHeight = document.body.offsetHeight
  //   var scrollPosition = (window.scrollY + window.innerHeight)

  //   //console.log("footer length", footerElement.offsetHeight, "1", window.scrollY, "2",window.innerHeight, "3", (window.scrollY + window.innerHeight), "pos", scrollPosition, "hei", scrollHeight)
  
  //   if (this.intersectionIsInsideViewport(scrollInterSection)) {
  //       console.log("scroll bottom")
  //       this.fetchProducts({limit: this.limit, offset: this.state.offset})
  //       this.setState({ offset: this.state.offset + 10 })
  //   }
  // }

  // intersectionIsInsideViewport(el) {
  //   var rect = el.getBoundingClientRect()

  //   return (
  //      rect.top    >= 0
  //   && rect.left   >= 0
  //   && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  //   )
  // }

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
                ? <MobileHeader />
                : <WebHeader
                  {...this.props}
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
            
            {/* <GenreOverlay genres={this.state.genres} closeGenres={this.closeGenres} shouldMountGenres={this.state.shouldMountGenres} /> */}
            {/* <BasketTotal totalPrice="7050" noOfDrinks="3" /> */}

            <BrandsList data={this.state.brands} />
            { this.state.isBrandsLoading && <Loader /> }
          </div>
        </div>
        <div id="scroll-intersection"></div>
      </div>
    )
  }
}

export default ProductListing