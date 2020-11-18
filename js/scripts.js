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
var elMovies = $_('.movies');
var elMovieWrapper = $_('.movie-wrapper');
var allMovies = movies.slice(0, 50);
var template = $_('#movie-template').content;

// edit json with array map 
var editedMovies = allMovies.map(function(movie, index) {
	return {
		id: index + 1,
		name: movie.Title,
		img: movie.ytid,
		year: movie.movie_year,
		imdb: movie.imdb_rating,
		catagory: movie.Categories.split('|')	
	}
});

// append movie to the template
var appendMovies = function(movie) {
	var newTemplateLi = template.cloneNode(true);

	newTemplateLi.querySelector('.movie__img').src = `https://img.youtube.com/vi/${movie.img}/2.jpg`;
	newTemplateLi.querySelector('.movie__img').alt = movie.name;
	newTemplateLi.querySelector('.movie__name').textContent = movie.name;
	newTemplateLi.querySelector('.movie__year').textContent = movie.year;
	newTemplateLi.querySelector('.movie__imdb').textContent = movie.imdb;
	newTemplateLi.querySelector('.movie__catagory').textContent = movie.catagory.join(', ');
	
	return newTemplateLi;
}

editedMovies.forEach(function(movie) {
	elMovieWrapper.append(appendMovies(movie));
});

// search
var elMoviesTemplate = $_('#movies-template').content;

elForm.addEventListener('submit', function(evt) {
	evt.preventDefault();

	elMovies.innerHTML = '';
	var regExpString = new RegExp(elSearch.value, 'gi');
	var answer = true;
	
	editedMovies.forEach(function(movie) {
		var findQuery = movie.name.toString().match(regExpString);	
		var newElMoviesTemplate = elMoviesTemplate.cloneNode(true);
			
		if(Boolean(findQuery)) {
			answer = false;
			newElMoviesTemplate.querySelector('.movies__item').textContent = movie.name;
			elMovies.append(newElMoviesTemplate);
		}
	});

	if(answer) {
		elMovies.innerHTML = "<a class=\"list-group-item list-group-item-action bg-danger text-white\" href=\"#\">Topilmadi</a>";
	}
});
