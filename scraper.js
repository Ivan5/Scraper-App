const fetch = require('node-fetch')
const cheerio = require('cheerio')
const searchURL = 'https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q='
const movieURL = 'https://www.imdb.com/title/' 

function searchMovies(searchTerm){
 return  fetch(`${searchURL}${searchTerm}`)
    .then(response => response.text())
    .then(body => {
      const movies = []
      const $ = cheerio.load(body)
      $('.findResult').each(function(i, element){
        const $element = $(element)
        const $image = $element.find('td a img')
        const $title = $element.find('td.result_text a')
        const imdbID= $title.attr('href').match(/title\/(.*)\//)[1]
        const movie = {
          image: $image.attr('src'),
          title: $title.text(),
          imdbID
        }
        movies.push(movie)
      })
      return movies
    })
}

function getMovie(imdbID){
  return  fetch(`${movieURL}${imdbID}`)
    .then(response => response.text())
    .then(body => {
      const $ = cheerio.load(body)
      const $title = $('.title_wrapper h1')
      const title = $title.first().contents().filter(function(){
        return this.type === 'text'
      }).text().trim()

      const duration = $('time[itemprop="duration"]').first().contents().filter(function(){
        return this.type === 'text'
      }).text().trim()
      const genres = []
      $('span[itemprop="genre"]').each(function(i,element){
        const genre = $(element).text()
        genres.push(genre)
      })

      const datePublished =  $('meta[itemprop="datePublished"]').attr('content')
      const poster = $('div.poster a img').attr('src');
      const summary = $('span[itemprop="description"]').text().trim()
      const director = $('span[itemprop="director"]').text().trim()
      return {
        imdbID,
        title,
        duration,
        genres,
        datePublished,
        poster,
        summary,
        director
      }
      
    })
}

module.exports = {
  searchMovies,
  getMovie
}
  
