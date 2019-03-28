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

const brandImages = [
  "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300,w_300/v1553523225/Gifting-website/Brand_logos/Black_Dog_TR.jpg",
  //"https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_120,q_auto:good/v1551433032/Gifting-website/Brand_logos/VAT_69.png",
  "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_57,q_auto:good/v1551433032/Gifting-website/Brand_logos/Talisker.png",
  "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_109,q_auto:good/v1551433031/Gifting-website/Brand_logos/Tanqueray.png",
  "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_46,q_auto:good/v1551433031/Gifting-website/Brand_logos/The_Singleton_Of_Glen_Ord_12_Years_Old.png",
  // "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_80,q_auto:good/v1551433031/Gifting-website/Brand_logos/Signature.png",
  "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1553523224/Gifting-website/Brand_logos/JW-BL.jpg",
  "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_80,q_auto:good/v1551433031/Gifting-website/Brand_logos/Smirnoff.png",
  // "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_115,q_auto:good/v1551433031/Gifting-website/Brand_logos/Royal_Challenge.png",
  // "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_150,q_auto:good/v1551433031/Gifting-website/Brand_logos/McDowell_s_No.1_Reserve_Whisky.png",
  // "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_150,q_auto:good/v1551433031/Gifting-website/Brand_logos/McDowell_s_No1_Luxury_Premium_Whisky.png",
  "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_80,q_auto:good/v1551433031/Gifting-website/Brand_logos/Ketel_One_Vodka.png",
  "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_42,q_auto:good/v1551433031/Gifting-website/Brand_logos/Glenkinchie.png",
  // "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_52,q_auto:good/v1551433030/Gifting-website/Brand_logos/Gordon_s.png",
  // "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_120,q_auto:good/v1551433030/Gifting-website/Brand_logos/Justerini___Brooks.png",
  "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_80,q_auto:good/v1551433030/Gifting-website/Brand_logos/Baileys.png",
  // "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_150,q_auto:good/v1551433030/Gifting-website/Brand_logos/Antiquity_Blue.png",
  "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_120,q_auto:good/v1551433030/Gifting-website/Brand_logos/CiROC.png",
  "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_50,q_auto:good/v1551433030/Gifting-website/Brand_logos/Captain_Morgan.png",
  // "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_145,q_auto:good/v1551433030/Gifting-website/Brand_logos/Black___White.png",
  // "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_175,q_auto:good/v1551433030/Gifting-website/Brand_logos/Black___White_12.png",
  "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_200,q_auto:good/v1553595833/Gifting-website/more_button_2.jpg "
]

const BrandPartner = () => (
  <div id="slider">
    <div className="brands">
      <div className="item">
        <Slider {...settings}>
          {
            brandImages.map((item, i) => (
              <div key={i} className="brand">
                <img className="brand-icon" src={item} />
              </div>
            ))
          }
        </Slider>
      </div>
    </div>
  </div>
)

export default BrandPartner
