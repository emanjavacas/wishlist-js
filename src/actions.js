'use strict';

const tmdb = require('./services/tmdb.js').init();

var iterators = (function () {
  var queries = {};
  return function(query, batch, callback, args) {
    if (!query in queries) {
      var iterator = tmdb.movieBatches(
	query,
	batch,
	callerCallback,
	args
      );
      queries[query] = iterator;
      iterator();
    } else {
      var iterator = queries[query];
      iterator();
    }
  };
}());

const SEARCH_MOVIE = 'SEARCH_MOVIE',
      DISCOVER_MOVIE = 'DISCOVER_MOVIE';

module.exports = {
  /**
   * Actions
   */
  SEARCH_MOVIE: SEARCH_MOVIE,
  DISCOVER_MOVIE: DISCOVER_MOVIE,

  /**
   * Action triggers
   */
  nextPage: function(query) {
    iterator()
  }
  
};
