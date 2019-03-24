import React from "react"
import Slider from "react-slick"
import GenreItem from "Components/GenreItem"
import "./sass/genre-slider.scss"
import Icon from "Components/icon"

class GenresSlider extends React.Component {
  constructor() {
    super()
    this.settings = {
      dots: false,
      infinite: false,
      speed: 400,
      slidesToShow: 7,
      slidesToScroll: 1,
      variableWidth: true,
      prevArrow: <div><Icon name="chevronRight" /></div>,
      nextArrow: <div><Icon name="chevronRight" /></div>,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: false,
            infinite: false
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            infinite: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            infinite: false
          }
        }
      ]
    }
    this.state = {
      active: -1
    }
    this.getGenreIndexByName = this.getGenreIndexByName.bind(this)
    this.handleGenreChange = this.handleGenreChange.bind(this)
  }

  handleGenreChange(genre) {
    this.setState({ active: genre.id })
    this.props.handleGenreChange(genre)
  }
  
  getGenreIndexByName(name) {
    return this.props.genres.findIndex(genre => genre.short_name === name)
  }

  componentDidMount() {
    const active = this.props.active
    const activeIdx = this.getGenreIndexByName(active)
    this.setState({ active: activeIdx })
    if (activeIdx > 6) {
      setTimeout(() => {
        this.slider.slickGoTo((activeIdx).toString(), true)
      }, 10)
    }
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.genres.length !== this.props.genres.length) || (this.props.active !== prevProps.active)) {
      const active = this.props.active
      const activeIdx = this.getGenreIndexByName(active)
      this.setState({ active: activeIdx })
      
      if (activeIdx < 6) {
        setTimeout(() => {
          this.slider.slickGoTo((0).toString(), true)
        }, 10)
      }
    }
  }
  render() {
    return (
      <div id="genre--slider">
        <Slider ref={slider => (this.slider = slider)} {...this.settings}>
          {
            this.props.genres.map((item, i) => (
              <GenreItem
                active={this.state.active}
                onChange={this.handleGenreChange}
                key={i}
                id={i}
                name={item.display_name}
                shortName={item.short_name}
              />
            ))
          }
        </Slider>
      </div>
    )
  }
}

export default GenresSlider