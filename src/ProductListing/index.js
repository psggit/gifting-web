import React from "react"
import "./listing.scss"
import Icon from "Components/icon"

class ProductListing extends React.Component {
  constructor() {
    super()

    this.state = {
      search_text: ''
    }

    this.handleTextChange = this.handleTextChange.bind(this)
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value})
  }

  render() {
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
        </div>
      </div>
    )
  }
}

export default ProductListing