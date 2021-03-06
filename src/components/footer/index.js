import React from 'react'
import Icon from "Components/icon"
import './footer.scss'

const Footer = () => (
  <div className="footer">
    <div className="upper">
      <div className="col">
        {/* <Icon name="hipbarLogoFooter" />

        <p>HipBar</p>
        <p>
          © Copyright 2019 | All Rights Reserved
        </p> */}
        <img src="/images/footerLogo.png" style={{ width: '60px' }} />
        <p style={{ color: '#e97c07' }}>
          © Copyright 2019 | All Rights Reserved
        </p>
      </div>

      <div className="col">
        <div className="footer-item">
          <ul>
            <li><a href="/send-gift">Send Gift Cards</a></li>
            <li><a href="/how-to-redeem">Redeeming Gift Cards</a></li>
            <li><a href="/retail-outlet">Retail Outlets</a></li>
            <li><a href="/FAQs">FAQs</a></li>
          </ul>
        </div>

        <div className="footer-item">
          <ul>
            <li><a target="_blank" href="/user-terms">Consumer T&amp;C</a></li>
            <li><a target="_blank" href="/merchants-t-c">Merchant T&amp;C</a></li>
            <li><a target="_blank" href="/gifting-t-c">Gifting T&amp;C</a></li>
            <li><a target="_blank" href="/grievance-policy">Grievance Policy</a></li>
            <li><a target="_blank" href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="col">
        <div className="footer-item">
          <p>Hip Bar Private Limited</p>
          <p>
            No. 34, (1st Floor) B Ramachandra<br />
            Adithanar Road, <br />
            Gandhinagar, Adyar, Chennai, <br />
            Tamil Nadu 600020
          </p>
          <div className="social">
            <a target="_blank" href='https://facebook.com/hipbarapp'><Icon name="fbLogo" /></a>
            <a target="_blank" href='https://twitter.com/hipbarapp'><Icon name="twitterLogo" /></a>
            <a target="_blank" href='https://instagram.com/hipbarapp'><Icon name="instagramLogo" /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Footer
