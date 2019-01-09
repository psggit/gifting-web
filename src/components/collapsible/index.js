import React from "react"
import "./collapsible.scss"

class Collapsible extends React.Component {
  constructor() {
    super()
    this.state = {
      isCollpased: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState({
      isCollpased: !this.state.isCollpased
    })
  }
  render() {
    return (
      <div>
        <div className="collapsible--wrapper">
          <div className="collapsible--header">
            <div className="os s7">
              <input name="payment_method" value={this.props.method} id={this.props.method} type="radio" />
              <label onClick={this.handleClick} htmlFor={this.props.method}>
                {this.props.title}
              </label>
            </div>
          </div>
          <div className={`collapsible--body ${this.state.isCollpased ? "collapsed" : ""}`}>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}


export default Collapsible