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
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleSkip = this.handleSkip.bind(this)
  }

  componentDidMount() {
    const receiverInfo = JSON.parse(localStorage.getItem("receiver_info")) || {}
    if (receiverInfo.name) {
      this.setState({ name: receiverInfo.name })
    }
  }

  handleKeyDown(e) {
    if (this.state.name.length >= 3 && e.keyCode === 13) {
      const path = "/send-gift/select-city"
      this.props.history.push(path)
    }
  }

  handleChange(val) {
    const receiverInfo = {}
    receiverInfo.name = val
    localStorage.setItem("receiver_info", JSON.stringify(receiverInfo))
    this.setState({ name: val })
  }

  handleSkip(e) {
    localStorage.removeItem("receiver_info")
    e.preventDefault()
    const path = "/" + e.currentTarget.href.split("/").slice(3).join("/")
    this.props.history.push(path)
  }

  handleClick(e) {
    e.preventDefault()
    if (this.state.name.length >= 3) {
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
                  Who is the recipient?
                </p>
                <p className="os s5">
                  Enter a name to make it personal & special!
                </p>
                <div className="form-group">
                  <Input
                    name="receiverName"
                    type="text"
                    placeholder="Enter recipient's name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    maxLength="30"
                    pattern="[A-Za-z ]*"
                  />
                  <p className="os s9" style={{ marginTop: "5px" }}>Only alphabets allowed / Minimum character limit: 3</p>
                </div>
              </div>
              <div style={{ marginTop: "40px" }}>
                <a onClick={this.handleClick} href={"/send-gift/select-city"}>
                  <Button
                    disabled={this.state.name.length < 3}
                    primary
                    icon="rightArrowWhite"
                    className="small"
                  >
                    Select City
                  </Button>
                </a>
              </div>

              <div>
                <a className="skip-btn" onClick={this.handleSkip} href={"/send-gift/select-city"}>
                  <span className="os s8">skip for now</span>
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