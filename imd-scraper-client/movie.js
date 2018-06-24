const main = document.querySelector('main')
const imdbID = window.location.search.match(/imdbID=(.*)/)[1];
const BASE_URL = 'http://localhost:3000/'

function getMovie(imdbID){
  return fetch(`${BASE_URL}movie/${imdbID}`)
    .then(res => res.json())
}

function showMovie(movie){
  const section = document.createElement('section');
  main.appendChild(section);

  section.outerHTML = `
    <section class="row">
     <h1 class="text-center">${movie.title}</h1>
      <div class="col-sm-12">
        <img src="${movie.poster}" class="img-fluid"/>
      </div>
      <div class="col-sm-12">
        <dl class="row">
          <dt class="col-sm-3">Duration</dt>
          <dd class="col-sm-9">${movie.duration}</dd>
        </dl>
        <dl class="row">
          <dt class="col-sm-3">Summary</dt>
          <dd class="col-sm-9">${movie.summary}</dd>
        </dl>
        <dl class="row">
          <dt class="col-sm-3">Director</dt>
          <dd class="col-sm-9">${movie.director}</dd>
        </dl>
      </div>
    </section>
  `;
}

getMovie(imdbID)
  .then(showMovie)