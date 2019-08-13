const genres = require("./genres")

function getGenreNameById(id) {
  return genres.find(genre => genre.id === parseInt(id)).genre_name
}


module.exports = getGenreNameById
