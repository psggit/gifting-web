import React from "react"
import "./sass/name.scss"
import Button from "Components/button"
import Icon from "Components/icon"
import Input from "Components/input"
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
    localStorage.removeItem("amount")
    localStorage.removeItem("basket")
    localStorage.removeItem("promo_code")
  }

  handleChange(val) {
    const receiverInfo = {}
    receiverInfo.name = val
    localStorage.setItem("receiver_info", JSON.stringify(receiverInfo))
    this.setState({ name: val })
  }

  handleClick(e) {
    e.preventDefault()
    if (this.state.name.length < 3 || !/^[A-Za-z ]*$/.test(this.state.name)) {
      return false
    } else {
      const path = "/" + e.currentTarget.href.split("/").slice(3).join("/")
      this.props.history.push(path)
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
                  <Input
                    name="receiverName"
                    type="text"
                    placeholder="Enter recipient's name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    maxLength="30"
                  />
                  <p className="os s9" style={{ marginTop: "5px" }}>Only alphabets allowed / Minimum character limit: 3</p>
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