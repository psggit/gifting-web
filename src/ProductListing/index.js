import React from "react"
import "./listing.scss"
import Icon from "Components/icon"
import { Suspense, lazy } from "react"
import "intersection-observer"
const Albums = lazy(() => import('./albums.js'))
 
class ProductListing extends React.Component {
  constructor() {
    super()

    this.state = {
      search_text: '',
      products: [],
      offset: 0
    }

    this.limit = 10;
    //this.offset = 0;

    this.handleTextChange = this.handleTextChange.bind(this)
    //this.findScroll = this.findScroll.bind(this)
    this.findInterSection = this.findInterSection.bind(this)
  }

  componentDidMount() {
    this.findInterSection()
  }

  fetchProducts({limit, offset}) {
    fetch(`http://jsonplaceholder.typicode.com/photos?_start=${offset}&_limit=${limit}`)
    .then((response) => {
      response.json().then((res) => {
        // console.log("res", [...this.state.products, res])
        this.setState({
          products: this.state.products.concat(res)
        })
      })
    })
    .catch((error) => {
      console.log("error", error)
    })
  }

  findInterSection() {
    const componentThis = this
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          console.log("calling from intersection")
          componentThis.fetchProducts({ limit: componentThis.limit, offset: componentThis.state.offset })
          componentThis.setState({ offset: componentThis.state.offset + 10 })
        }
      });
    });

    lazyImageObserver.POLL_INTERVAL = 100
    lazyImageObserver.USE_MUTATION_OBSERVER = false
    const target = document.getElementById("scroll-intersection")
    lazyImageObserver.observe(target);
  }

  // findScroll() {
  //   console.log("scrolling")
  //   const scrollInterSection = document.getElementById("scroll-intersection")
  //   const scrollInterSectionOffset = scrollInterSection.offsetTop
  //   // var footerElement = document.getElementsByClassName('footer')[0];
  //   //var scrollElement = document.getElementById('scrollDiv');
  //   var scrollHeight = document.body.offsetHeight
  //   var scrollPosition = (window.scrollY + window.innerHeight)

  //   //console.log("footer length", footerElement.offsetHeight, "1", window.scrollY, "2",window.innerHeight, "3", (window.scrollY + window.innerHeight), "pos", scrollPosition, "hei", scrollHeight)
  
  //   if (this.intersectionIsInsideViewport(scrollInterSection)) {
  //       console.log("scroll bottom")
  //       this.fetchProducts({limit: this.limit, offset: this.state.offset})
  //       this.setState({ offset: this.state.offset + 10 })
  //   }
  // }

  intersectionIsInsideViewport(el) {
    var rect = el.getBoundingClientRect()

    return (
       rect.top    >= 0
    && rect.left   >= 0
    && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    )
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value})
  }

  render() {

    const loadingImg = <div className="album-img">
      <img alt="loading" src="https://media.giphy.com/media/y1ZBcOGOOtlpC/200.gif" />
    </div>

    const albums = this.state.products.map(e => {
      return (
        <Suspense key={e.id} fallback={loadingImg}>
          <Albums
            id={e.id}
            image={e.thumbnailUrl}
            title={e.title}
            link={e.url}
            price=""
            date=""
          />
        </Suspense>
      );
    });

    return (
      <div id="ProductListing">
        <div className="content">
          <div className="header">
            <div style={{display: 'flex', alignItems: 'center'}}>
              <p className="os s8" style={{marginRight: '16px'}}>Showing products in:</p>
              <div className="form-group" style={{marginTop: '0'}}>
                <div>
                  <select>
                    <option>Bangalore</option>
                    <option>Chennai</option>
                    <option>Erode</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              {/* <input type="text" placeholder="Search for products" />
              <span><Icon name="plus" /></span> */}
              <div className="form-group">
                <div>
                  <input
                    type="text"
                    name="search"
                    placeholder="Search for products"
                    //className={`${nameErr.status ? 'error' : ''}`}
                    value={this.state.search_text}
                    //disabled={this.state.disableField && this.state.otpSent}
                    //style={this.state.disableField && this.state.otpSent ? cursorStyle : {}}
                    autoComplete="off"
                    onChange={(e) => this.handleTextChange(e)}
                  />
                </div>
                <div >
                  <span><Icon name="plus" /></span>
                </div>
              </div>
            </div>
          </div>
          <div className="albums">
            {albums}
          </div>
        </div>
        <div id="scroll-intersection"></div>
      </div>
    )
  }
}

export default ProductListing