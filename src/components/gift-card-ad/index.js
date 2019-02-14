import React from "react"
import CustomButton from "./../custom-button"

class GiftCardAd extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: '#1c1c1c',
          padding: '8% 15%',
          textAlign: 'center',
          // position: 'absolute',
          // top: '50%',
          // transform: 'translateY(-50%)'
        }}
      > 
        <p 
          className="ft s1"
          style={{
            textTransform: 'uppercase',
            background: 'linear-gradient(to right, #ff4100, #ff9300)',
            webkitBackgroundClip: 'text',
            webkitTextFillColor: 'transparent',
            letterSpacing: '-0.7px',
            fontWeight: '600',
            marginBottom: '10px'
          }}
        >
          Share a drink. Spread the love.
        </p>
        <p className="ft s3 sub-header" style={{color: '#bcbec0', marginBottom: '56px'}}>
          Gift drinks to your friends &amp; family with hipbar gift cards!
        </p>
        <CustomButton text="Gift a drink" navigateTo="/send-gift" />
      </div>
    )
  }
}

export default GiftCardAd