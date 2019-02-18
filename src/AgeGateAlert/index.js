import React from "react"
import Button from "Components/button"
import Layout from "Components/Layout"
import "./age-gate.scss"

class AgeGate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showNote: false
    }
    this.closeWindow = this.closeWindow.bind(this)
    this.agreeAgeGate = this.agreeAgeGate.bind(this)
  }

  componentDidMount() {
    localStorage.removeItem("age-gate__agreed")
  }

  closeWindow() {
    this.setState({showNote: true})
  }

  agreeAgeGate() {
    localStorage.setItem("age-gate__agreed", 1)
    if (document.referrer.split("/")[3] !== "age-gate") {
      location.href = document.referrer
    } else {
      location.href = "/"
    }

    // document.cookie = "isAgeGateAgreed=true; path=/; expires=" + (new Date(new Date().getTime() + 60 * 60 * 1000)).toUTCString() + `;path=/;  domain=${location.hostname}`
    // if(this.props.history.location.state) {
    //   console.log("props", this.props.history)
    // location.href = this.props.history.location.state.navigateTo
    // } else {
    //   location.href = "/"  
    // }
    //localStorage.setItem("agreedAgeGate", true)
    //unMountModal()
  }

  render() {
    const {showNote} = this.state
    return (
      <Layout image="https://res.cloudinary.com/www-hipbar-com/image/upload/q_auto:good/v1550240044/Gifting-website/bg-gift.webp">
        <div className="agegate-container">
          <span className="ft s2 header">
            Agree if you are of legal drinking age in your current state of residence
          </span>
          <div style={{ margin: "20px 0 40px 0" }}>
            <a 
              className="ft s3 sub-header" 
              href="/legal-drinking-age" 
              target="_blank"
            >
              Legal drinking age by states/UTs
            </a>
          </div>
          <div className="button-group">
            <Button secondary style={{marginRight: '24px', width: '160px'}} onClick={() => {return this.closeWindow()}}>DISAGREE</Button>
            <Button  primary style={{width: '160px'}} onClick={this.agreeAgeGate}>AGREE</Button>     
          </div>
          {
            showNote &&
            <div className="note">
              {/* <span  className="icon">
                <Icon name="alert"/>
              </span> */}
              <div className="ft s6">Sorry! You've to be of legal drinking age to access this website</div>
            </div>
          }
       
        </div>
      </Layout>
    )
  }
}

export default AgeGate