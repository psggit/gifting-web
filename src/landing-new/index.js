import React from "react"
import "./landing.scss"
import Layout from "Components/Layout"
import Slider from "Components/slider"
import CustomButton from "Components/custom-button"
import FirstGiftCard from "Components/gift-card-ad"
import Icon from "Components/icon"
import {readCookie} from "Utils/session-utils"
import Header from "Components/header"
import Footer from "Components/footer"
import Button from "Components/button"
import { fetchCities } from "./../api"

class Landing extends React.Component {
  constructor() {
    super()
    this.state = {
      cities: []
    }
  }

  componentDidMount() {
    setTimeout(() => {
      const el = document.querySelector("video")
      el.muted = true
      el.play()
        .catch(err => {
          console.log(err)
        })
    }, 1000)
    fetchCities()
      .then(cities => {
        this.setState({ cities })
      })
  }

  render() {
    const backgroundStyle={
      backgroundImage: 'linear-gradient(70deg, rgba(0, 0, 0, 0), #313131)',
      padding: '11% 10%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
    const textStyle = {
      textTransform: 'uppercase',
      fontWeight: '600',
      color: '#bcbec0'
    }

    const alt = "Gifts Online, Gifting in India, Alcohol Online, Drinks Online, Hipbar"
    return (
      <React.Fragment>
        <div id="landing-new">
          <div className="hero-container">
            <div className="video-bg-container">
              <video ref={(node) => this.video = node} playsInline preload="true" autoPlay muted loop>
                <source src="https://res.cloudinary.com/www-hipbar-com/video/upload/v1551262512/Gifting-website/video.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="hero-content">
              <p className="ft s1 header">
                Gifting a drink is now possible!
              </p>
              <p className="ft s3 sub-header">
                Make great memories. Gift your friend a drink today
              </p>
              <a href="/send-gift"><Button primary icon="rightArrowWhite">Start gifting</Button></a>
              {/* <CustomButton text="Start Gifting" navigateTo="/send-gift" /> */}
            </div>
          </div>
          <Slider />
          <div className="steps">
            <div className="step-image">
              <img alt={alt} src="https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_512,q_auto:good/v1550240057/Gifting-website/Step1.jpg" />
            </div>
            <div className="step-notes">
              <div>
                <p className="ft s5 step-no">Step 1</p>
                <p className="ft s5 step-note">Enter details &amp; pay <br/>via hipbar</p>
              </div>
            </div>
          </div>

          <div className="steps">
            <div className="step-image">
              <img alt={alt} src="https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_512/v1553508851/Gifting-website/shutterstock_226525846_2.jpg" />
            </div>
            <div className="step-notes">
              <div>
                <p className="ft s5 step-no">Step 2</p>
                <p className="ft s5 step-note">Recipient receives <br/>gift card</p>
              </div>
            </div>
          </div>

          <div className="steps">
            <div className="step-image">
              <img alt={alt} src="https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_512,q_auto:good/v1550240058/Gifting-website/Step3.jpg" />
            </div>
            <div className="step-notes">
              <div>
                <p className="ft s5 step-no">Step 3</p>
                <p className="ft s5 step-note">Recipient collects <br/>drink at retail store</p>
              </div>
            </div>
          </div>

          <FirstGiftCard />
          <div className="located-cities">
            <span>
              <Icon name="location" />
            </span>
            <div style={{
                width: '100%',
                borderBottom: '1px solid #aeaeae',
                lineHeight: '10px',
                margin: '10px 0 50px'
              }}
            >
              <span
                className="ft s8"
                style={{
                  background: '#000',
                  padding: '0 30px',
                  color: '#bcbec0',
                  letterSpacing: "2px",
                  fontWeight: "500"
                }}
              >
                CITIES
              </span>
            </div>
            <div className="city-wrapper">
              {
                this.state.cities.map((city, i) => (
                  <div key={i} className="city">
                    <span className="ft s7">{ city.name }</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </React.Fragment>
    )
  }
}

export default Landing