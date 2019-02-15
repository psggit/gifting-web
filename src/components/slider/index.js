import React from 'react'
import './slider.scss'
import Slider from "react-slick"
import Icon from "Components/icon"

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <span onClick={onClick} style={{ ...style}} className={className}>
//       <Icon name="rightArrow" />
//     </span>
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <span onClick={onClick} style={{ ...style}} className={className}>
//       <Icon name="leftArrow" />
//     </span>
//   );
// }

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  // nextArrow: <SampleNextArrow />,
  // prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}

const BrandPartner = () => (
  <div id="slider">
    <div className="brands">
      <div className="item">
        <Slider {...settings}>
          <div className="brand">
            {/* <Icon name="bacardi" /> */}
            <img className="brand-icon" src="https://res.cloudinary.com/www-hipbar-com/image/upload/c_lpad,w_180/v1550240040/Gifting-website/Bacardi_Logo_White.png" />
          </div>
          <div className="brand">
            {/* <Icon name="bacardi" /> */}
            <img className="brand-icon" src="https://res.cloudinary.com/www-hipbar-com/image/upload/c_lpad,w_240/v1550240038/Gifting-website/AB_InBev_Logo_BW.png" />
          </div>
          <div className="brand">
            {/* <Icon name="bacardi" /> */}
            <img className="brand-icon" src="https://res.cloudinary.com/www-hipbar-com/image/upload/c_lpad,w_240/v1550240038/Gifting-website/Beam_Suntory_Logo_White.png" />
          </div>
          <div className="brand">
            <img className="brand-icon" src="https://res.cloudinary.com/www-hipbar-com/image/upload/c_lpad,w_120/v1550240040/Gifting-website/Bira-91_Logo_White.png" />
          </div>
          <div className="brand">
            <img className="brand-icon" src="https://res.cloudinary.com/www-hipbar-com/image/upload/c_lpad,w_200/v1550240040/Gifting-website/Brown-Forman_Logo_White.png" />
          </div>
          <div className="brand">
            <img className="brand-icon" src="https://res.cloudinary.com/www-hipbar-com/image/upload/c_lpad,w_180/v1550240041/Gifting-website/Carlsberg_Logo_White.png" />
          </div>
          {/* <div className="brand">
            <img className="brand-icon" src="./../../images/Diageo_Logo_White.png" />
          </div>
          <div className="brand">
            <img className="brand-icon" src="./../../images/Fratelli_Logo_White.png" />
          </div>
          <div className="brand">
            <img className="brand-icon" src="./../../images/Grover Zampa_Logo_White.png" />
          </div>
          <div className="brand">
            <img className="brand-icon" src="./../../images/Johnnie Walker_Logo_White.png" />
          </div>
          <div className="brand">
            <img className="brand-icon" src="./../../images/Moet Hennessy_White.png" />
          </div>
          <div className="brand">
            <img className="brand-icon" src="./../../images/Paul John_Logo_White.png" />
          </div>
          <div className="brand">
            <img className="brand-icon" src="./../../images/Pernod Ricard_Logo_White.png" />
          </div>
          <div className="brand">
            <img className="brand-icon" src="./../../images/Sula_Logo_White.png" />
          </div>
          <div className="brand">
            <img className="brand-icon" src="./../../images/UB Group_Logo_White.png" />
          </div> */}
        </Slider>
      </div>
    </div>
  </div>
)

export default BrandPartner
