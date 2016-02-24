
var tmdb = require('./services/tmdb.js').init();

var SEARCH_MOVIE = 'SEARCH_MOVIE',
    DISCOVER_MOVIE = 'DISCOVER_MOVIE',
    RECEIVE_MOVIES = 'RECEIVE_MOVIES',
    FETCH_MOVIES = 'FETCH_MOVIES',
    REQUEST_HAS_ERROR = 'REQUEST_HAS_ERROR';

var iterators = (function () {
  var queries = {};
  return function(query, batch, callback, args) {
    if (! (query in queries)) {
      var iterator = tmdb.movieBatches(
	query,
	batch,
	callback,
	args
      );
      queries[query] = iterator;
      iterator();
    } else {
      queries[query]();
    }
  };
}());

module.exports = {
  /**
   * Actions
   */
  SEARCH_MOVIE: SEARCH_MOVIE,
  DISCOVER_MOVIE: DISCOVER_MOVIE,
  FETCH_MOVIES: FETCH_MOVIES,
  REQUEST_HAS_ERROR: REQUEST_HAS_ERROR,
  /**
   * Action triggers
   * 
   * searchMovies: trigger init search
   */
  requestMovies: function(query, batch, type){
    return {
      type: type,
      query: query,
      batch: batch
    };
  },
  /**
   * receiveMovies: on succesfull fetch
   */
  receiveMovies: function(query, movies){
    return {
      type: RECEIVE_MOVIES,
      query: query,
      movies: movies
    };
  },
  requestHasError: function(err, type) {
    return {
      type: type,
      err: err
    };
  },
  /**
   * fetchMovies: trigger fetch data from server
   */
  fetchMovies: function(query, batch, type){
    return function (dispatch){
      dispatch(requestMovies(query, batch, type));
      iterators(query, batch, function(err, res){
	if (err) {
	  dispatch(requestHasError(err, type));
	} else {
	  dispatch(receiveMovies(query, res));
	}
      });
    };
  }
};
