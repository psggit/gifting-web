import React from "react"
import "./listing.scss"

/* Polyfill for intersection observer API */
import "intersection-observer"

import BrandsList from "./BrandsList"
import { GET } from "Utils/fetch"

import Loader from "Components/loader"
import GenreOverlay from "./genre-overlay"
import Search from "Components/Search"
import BasketTotal from "./BasketTotal"
import Icon from "Components/icon"
import SearchResults from "./SearchResults"
import { listCities, listGenres } from "./../api"
 
class ProductListing extends React.Component {
  constructor() {
    super()

    this.state = {
      search_text: "",
      products: [],
      offset: 0,
      isBrandsLoading: false,
      shouldMountGenres: false,
      shouldMountSearchResults: false,
      cityIdx: 0,
      cities: [],
      loadingCities: false,
      genres: []
    }

    this.limit = 8
    //this.offset = 0

    this.handleTextChange = this.handleTextChange.bind(this)
    //this.findScroll = this.findScroll.bind(this)
    this.findInterSection = this.findInterSection.bind(this)
    this.openGenres = this.openGenres.bind(this)
    this.closeGenres = this.closeGenres.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.cancelSearch = this.cancelSearch.bind(this)
  }

  componentDidMount() {
    this.findInterSection()
    this.fetchCities()
    this.setState({ loadingCities: true })
    listCities((data) => {
      this.setState({ cities: data, loadingCities: false })
      listGenres(data[this.state.cityIdx].gps, (data) => {
        this.setState({ genres: data })
      })
    })
  }

  fetchCities() {
    // fetch cities
  }

  fetchProducts({limit, offset}, CB) {
    GET({
      api: `http://jsonplaceholder.typicode.com/photos?_start=${offset}&_limit=${limit}`,
      prependBaseUrl: false,
      type: "public",
      handleError: true
    })
      .then(json => {
        CB(json)
      })
  }

  findInterSection() {
    const target = document.getElementById("scroll-intersection")
    const _self = this
    let io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          _self.setState({ isBrandsLoading: true })
          _self.fetchProducts({ limit: _self.limit, offset: _self.state.offset }, (data) => {
            _self.setState({
              products: _self.state.products.concat(data),
              isBrandsLoading: false,
            })
          })
          _self.setState({ offset: _self.state.offset + 10 })
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

  handleCityChange(e) {
    const target = e.target
    // const nativeTarget = e.nativeEvent.target
    // const index = nativeTarget.selectedIndex
    
    const cityIdx = target.value
    const gps = this.state.cities[cityIdx].gps
    listGenres(gps, (data) => {
      this.setState({ genres: data })
    })
    this.setState({ cityIdx: parseInt(cityIdx) })
    // this.setState({ isBrandsLoading: true })
    this.fetchProducts({ limit: this.limit, offset: 0 }, (data) => {
      this.setState({
        products: data,
        isBrandsLoading: false,
      })
    })
  }

  render() {
    return (
      <div id="BrandsListing">
        <div className="container">
          <div className="paper">

            <div className="header">

              <div className="row">
                <Search
                  onFocus={this.handleFocus}
                  placeholder="Search for products"
                  onSearch={this.handleSearch}
                  cancelSearch={this.cancelSearch}
                />
                <div className="city--select">
                  <Icon name="location" />
                  <select onChange={this.handleCityChange} value={this.state.cityIdx}>
                    {/* <option>frwfefew</option>
                    <option>fthis.state.loadingCitiesrwfefew2</option> */}
                    {
                      this.state.cities.map((item, i) => {
                        return (
                          <option
                            key={item.id}
                            value={i}>
                            { item.name }
                          </option>
                        )
                      })
                    }
                  </select>
                  <Icon name="caret" />
                </div>
              </div>

              { this.state.shouldMountSearchResults && <SearchResults data={[]} /> }

              <div className="row">
                <span className="os s1">Showing drinks for:</span>
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

              
            </div>
            
            <GenreOverlay genres={this.state.genres} closeGenres={this.closeGenres} shouldMountGenres={this.state.shouldMountGenres} />
            <BasketTotal totalPrice="7050" noOfDrinks="3" />

            <BrandsList data={this.state.products} />
            { this.state.isBrandsLoading && <Loader /> }
          </div>
        </div>
        <div id="scroll-intersection"></div>
      </div>
    )
  }
}

export default ProductListing