import React from "react"
import Slider from "react-slick"
import GenreItem from "Components/GenreItem"
import "./sass/genre-slider.scss"
import Icon from "Components/icon"

class GenresSlider extends React.Component {
  constructor(props) {
    super(props)
    this.settings = {
      dots: false,
      //infinite: true,
      speed: 400,
      initialSlide: this.getGenreIndexByName(props.active),
      slidesToShow: 3,
      slidesToScroll: 0,
      variableWidth: true,
      prevArrow: <div><Icon name="chevronRight" /></div>,
      nextArrow: <div><Icon name="chevronRight" /></div>,
      responsive: [
        {
          breakpoint: 2600,
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
      active: -1,
      key: 0
    }
    this.getGenreIndexByName = this.getGenreIndexByName.bind(this)
    this.handleGenreChange = this.handleGenreChange.bind(this)
  }

  handleGenreChange(genre) {
    if(window.gtag) {
      gtag("event", "change_genre", {
        "event_label": JSON.stringify({
          genre: genre.short_name,
          date: new Date()
        })
      })
    }
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
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeCity !== prevProps.activeCity) {
      let x = this.state.key
      x = x + 1
      this.setState({ key: x })
    }
    if ((prevProps.genres.length !== this.props.genres.length) || (this.props.active !== prevProps.active)) {
      const active = this.props.active
      const activeIdx = this.getGenreIndexByName(active)
      this.setState({ active: activeIdx })
    }
  }
  render() {
    return (
      <div id="genre--slider">
        <Slider key={this.state.key} ref={slider => (this.slider = slider)} {...this.settings}>
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