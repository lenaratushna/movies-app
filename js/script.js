const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&language=ru&page=';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&language=ru&query=';

const main = document.querySelector('.main');
const searchForm = document.querySelector('#search-form');
const search = document.getElementById('search');
const nextPageBtn = document.querySelector('.next-page');
const prevPageBtn = document.querySelector('.prev-page');
let page = 1;

getMovies(API_URL+page);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    showMovies(respData.results);

    console.log(respData);
}

function showMovies(movies) {
    //Clear main
    main.innerHTML = '';
    //Create a movie cards
    movies.forEach(movie => {
        const movieEl = document.createElement('div');
        let poster = IMG_PATH + movie.poster_path;
        if(movie.poster_path == null){
            poster = 'http://www.ncenet.com/wp-content/uploads/2020/04/no-image-png-2.png';
        }
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <div class="movie__poster">
                <img src="${poster}" alt="${movie.title}" class="movie__img">
                <div class="overview">
                <h4 class="overview__title">Описание</h4>
                <p>${movie.overview}</p>
                </div>
            </div>
            <div class="movie__info">
                <h2 class="movie__title">${movie.title} (${movie.release_date.slice(0, 4)})</h2>
                
                <span class="movie__rating ${getClassByRate(movie.vote_average)}"><i class="fas fa-star"></i> ${movie.vote_average}</span>
            </div>
        `;
        
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 7.5) {
        return 'higth_rate';
    } else if (vote >= 5) {
        return 'average';
    } else {
        return 'low_rate';
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(SEARCH_API + searchTerm)
        search.value = '';
    }
});

