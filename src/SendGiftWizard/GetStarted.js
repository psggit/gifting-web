import React from "react"
import "./sass/get-started.scss"
import Button from "Components/button"
import Icon from "Components/icon"

class GetStarted extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    e.preventDefault()
    const path = "/" + e.currentTarget.href.split("/").slice(3).join("/")
    this.props.history.push(path)
  }

  handleConnectionChange(e) {
    if (e.type === "offline") {
      window.addEventListener('online', () => { location.reload() });
    }
  }

  componentDidMount() {
    window.addEventListener('offline', this.handleConnectionChange);
    if (localStorage.getItem("transaction--completed")) {
      localStorage.removeItem("receiver_info")
      localStorage.removeItem("amount")
      localStorage.removeItem("basket")
      localStorage.removeItem("promo_code")
    }
    localStorage.removeItem("transaction--completed")
  }

  render() {
    return (
      <div id="getstarted">
        <div className="container">
          <div className="paper">
            <div className="paper-content">
              <div className="gift">
                <Icon name="giftIcon" />
              </div>
              <p className="os s1">
                Welcome to HipBar Gifting!
              </p>
              <p className="os s4">
                Say cheers with the perfect gift
              </p>
              <div style={{ marginTop: "40px" }}>
                <a onClick={this.handleClick} href="/send-gift/select-name">
                  <Button
                    primary
                    icon="rightArrowWhite"
                  >
                    Get started
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

export default GetStarted