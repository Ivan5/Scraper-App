const imdbID = window.location.search.match(/imdbID=(.*)/)[1];
const BASE_URL = 'http://localhost:3000/'

function getMovie(imdbID){
  return fetch(`${BASE_URL}movie/${imdbID}`)
    .then(res => res.json())
}

function showMovie(movie){
  console.log(movie);
}

getMovie(imdbID)
  .then(showMovie)