// functions
var $_ = function(selector, node = document) {
	return document.querySelector(selector);
}
var $$_ = function(selector, node = document) {
	return document.querySelectorAll(selector);
}

// variables
var elForm = $_('.form');
var elSearch = $_('.form__search', elForm);
var elCatagories = $_('.js-catagories', elForm);

var elMovies = $_('.movies');
var elMovieWrapper = $_('.movie-wrapper');
var allMovies = movies;
var template = $_('#movie-template').content;

// edit json with array map 
var editedMovies = allMovies.map(function(movie, index) {
	return {
		id: index + 1,
		name: movie.Title,
		img: `https://img.youtube.com/vi/${movie.ytid}/mqdefault.jpg`,
		imgHd: `https://img.youtube.com/vi/${movie.ytid}/maxresdefault.jpg`,
		youtubeId: movie.ytid,
		year: movie.movie_year,
		imdb: movie.imdb_rating,
		catagories: movie.Categories.split('|')	
	}
});

// append movie to the template
var fetchAllMovies = function(movie) {
	var newTemplateLi = template.cloneNode(true);

	newTemplateLi.querySelector('.movie__img').src = movie.img;
	newTemplateLi.querySelector('.movie__img').alt = movie.name;
	newTemplateLi.querySelector('.movie__name').textContent = movie.name;
	newTemplateLi.querySelector('.movie__year').textContent = movie.year;
	newTemplateLi.querySelector('.movie__imdb').textContent = movie.imdb;
	newTemplateLi.querySelector('.movie__catagories').textContent = movie.catagories.join(', ');
	
	return newTemplateLi;
}

// create fragment box
var movieFragment = document.createDocumentFragment();

// warap all fetched movies to fragmentBox
var partOfMovies = editedMovies.slice(0, 50);
partOfMovies.forEach(function(movie) {	
	movieFragment.append(fetchAllMovies(movie));
});

// add movieFragemnt to elMovieWrapper
elMovieWrapper.append(movieFragment);

// searching
var elMoviesTemplate = $_('#movies-template').content;

elForm.addEventListener('submit', function(evt) {
	evt.preventDefault();

	elMovies.innerHTML = '';
	var regExpString = new RegExp(elSearch.value, 'gi');
	var answer = true;
	
	// get matched movies with a searching word
	var searchedMovies = editedMovies.filter(function(movie) {
		return movie.name.toString().match(regExpString);
	});

	// if searchedMovies has elements
	if(searchedMovies.length > 0) {
		searchedMovies.forEach(function(movie) {
			var newElMoviesTemplate = elMoviesTemplate.cloneNode(true);
			newElMoviesTemplate.querySelector('.movies__item').textContent = movie.name;
			elMovies.append(newElMoviesTemplate);
		});
	}
	// if no searched movie
	else {
		elMovies.innerHTML = "<span class=\"list-group-item list-group-item-action bg-danger text-white\">Topilmadi</span>";
	}
});

// get catagorized movies

elCatagories.addEventListener('change', function () {
	elMovies.innerHTML = '';

	var selectedCatagory = this.value;
	editedMovies.filter(function(movie) {
		var isCatagoryFind = movie.catagories.some(function(catagory) {
			return catagory === selectedCatagory;
		});
		
		if(isCatagoryFind) {
			var newElMoviesTemplate = elMoviesTemplate.cloneNode(true);
			newElMoviesTemplate.querySelector('.movies__item').textContent = movie.name;
			elMovies.append(newElMoviesTemplate);
		}
	});
});
