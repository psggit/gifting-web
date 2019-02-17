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

class Landing extends React.Component {
  constructor() {
    super()
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
    return(
      <React.Fragment>
        <div id="landing-new">
          <Layout image="https://res.cloudinary.com/www-hipbar-com/image/upload/q_auto:good/v1550240044/Gifting-website/bg-gift.webp">
            <div className="header-container">
              <div className="company-logo" >
                <span style={{cursor: 'pointer'}} onClick={() => {location.href="/"}}>
                  <Icon name="hipbarLogoWhite" />
                </span>
              </div>
              <p className="ft s1 header">
                Gifting a drink is now possible!
              </p>
              <p className="ft s3 sub-header">
                Make great memories. Gift your friend a drink today
              </p>
              <a href="/send-gift"><Button icon="rightArrowWhite">Start gifting</Button></a>
              {/* <CustomButton text="Start Gifting" navigateTo="/send-gift" /> */}
            </div>
          </Layout>
          <Slider />
          <div className="steps">
            <div className="step-image">
              <img src="https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_512,q_auto:good/v1550240057/Gifting-website/Step1.webp" />
            </div>
            <div className="step-notes">
              <div>
                <p className="ft s5 step-no">Step-1</p>
                <p className="ft s5 step-note">Enter details &amp; pay <br/>via hipbar</p>
              </div>
            </div>
          </div>

          <div className="steps">
            <div className="step-image">
              <img src="https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_512,q_auto:good/v1550240053/Gifting-website/Step2.webp" />
            </div>
            <div className="step-notes">
              <div>
                <p className="ft s5 step-no">Step-2</p>
                <p className="ft s5 step-note">Recipient receives <br/>gift card</p>
              </div>
            </div>
          </div>

          <div className="steps">
            <div className="step-image">
              <img src="https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_512,q_auto:good/v1550240058/Gifting-website/Step3.webp" />
            </div>
            <div className="step-notes">
              <div>
                <p className="ft s5 step-no">Step-3</p>
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
                className="ft"
                style={{
                  background: '#000',
                  padding: '0 30px',
                  color: '#bcbec0'
                }}
              >
                CITIES
              </span>
            </div>
            <div className="city-wrapper">
              <div className="ft s7 city">
                Goa
              </div>
              <div className="ft s7 city">
                Mahe, Pondicherry
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

export default Landing