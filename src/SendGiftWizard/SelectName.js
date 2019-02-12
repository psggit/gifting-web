import React from "react"
import "./sass/name.scss"
import Button from "Components/button"
import Icon from "Components/icon"
// import MobileNavBar from "Components/mobile-nav-bar"

class SelectName extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    localStorage.removeItem("receiver_info")
  }

  handleChange(e) {
    const receiverInfo = {}
    receiverInfo.name = e.target.value
    localStorage.setItem("receiver_info", JSON.stringify(receiverInfo))
    this.setState({ name: e.target.value })
  }

  handleClick(e) {
    if (!this.state.name.length) {
      e.preventDefault()
    }
  }
  
  render() {
    return (
      <div id="send-gift-name">
        <div className="container">
          {/* <MobileNavBar stepNo={1} stepName={"Recipient's Name"} /> */}
          <div className="paper">
            <div className="paper-content">
              <div className="row receiver">
                <Icon name="person" />
              </div>
              <div className="row">
                <p className="os s2">
                  Enter the name of your loved one
                </p>
                <p className="os s5">
                  This will help us provide a much better personalised experience to you.
                </p>
                <div className="form-group">
                  <input
                    name="receiverName"
                    type="text"
                    placeholder="Enter your name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div style={{ marginTop: "40px" }}>
                <a onClick={this.handleClick} href={"/send-gift/select-city"}>
                  <Button 
                    primary
                    icon="rightArrowWhite"
                    className="small"
                  >
                    Select City
                  </Button>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default SelectName