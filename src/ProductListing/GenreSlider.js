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
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 7,
      prevArrow: <div><Icon name="chevronRight" /></div>,
      nextArrow: <div><Icon name="chevronRight" /></div>
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
    this.setState({ active: this.getGenreIndexByName(active) }) 
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.genres.length !== this.props.genres.length) || (this.props.active !== prevProps.active)) {
      const active = this.props.active
      this.setState({ active: this.getGenreIndexByName(active) })
    }
  }
  render() {
    return (
      <div id="genre--slider">
        <Slider {...this.settings}>
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