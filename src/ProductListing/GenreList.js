import React from "react"
import GenreItem from "Components/GenreItem"

class GenresList extends React.Component {
  constructor() {
    super()
    this.state = {
      active: -1
    }
    this.getGenreIndexByName = this.getGenreIndexByName.bind(this)
    this.handleGenreChange = this.handleGenreChange.bind(this)
  }

  handleGenreChange(genre) {
    this.setState({ active: genre.id })
    this.props.history.push(`/brands/${this.props.match.params.citySlug}/${genre.shortName}`)
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
      <React.Fragment>
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
      </React.Fragment>
    )
  }
}

export default GenresList