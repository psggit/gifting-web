import React from "react"
import "./listing.scss"
import Icon from "Components/icon"
import { Suspense, lazy } from "react"
const Albums = lazy(() => import('./albums.js'))
 
class ProductListing extends React.Component {
  constructor() {
    super()

    this.state = {
      search_text: '',
      products: [],
    }

    this.handleTextChange = this.handleTextChange.bind(this)
  }

  componentDidMount() {
    fetch(`https://itunes.apple.com/in/rss/topalbums/limit=100/json`)
      .then((response) => {
        response.json().then((res) => {
          console.log("res", res.feed.entry)
          this.setState({products: res.feed.entry})
        })
      })
      .catch((error) => {
        console.log("error", error)
      })
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
        <Suspense key={e.id.label} fallback={loadingImg}>
          <Albums
            image={e["im:image"][2].label}
            title={e.title.label}
            link={e.id.label}
            price={e["im:price"].label}
            date={e["im:releaseDate"].label}
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
      </div>
    )
  }
}

export default ProductListing