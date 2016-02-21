
'use strict';

var extend = require('../utils.js').extend;

/**
 * returns a function that will iterate over batches
 * of returned movies. Batch has to be less than 20.
 *
 * @param {function(page)} tmdbFn
 * @param {Integer} batch, optional default 10
 * @param {function(err, res)} callback
 */
function callBatches(tmdbFn, batch, callback) {
  batch = batch || 10;
  var current_page = 1,
      results_info = {},
      buffer = [],
      finished = false;
  return (
    function(){
      if (finished) {
	return null;
      }
      if (current_page === results_info["total_pages"]) {
	if (buffer.length > batch) {
	  callback(null, buffer.splice(0, batch));
	  return true;
	} else {
	  finished = true;
	  callback(null, buffer);
	  return true;
	}
      } 
      if (buffer.length < batch) {
	console.log("Retrieving page " + current_page + " from TMDB");
	tmdbFn(current_page, function(err,res){
	  if (err) {
	    callback(err, res);
	    return null;
	  } else {
	    if (Object.keys(results_info).length === 0) {
	      results_info["total_pages"] = res.total_pages;
	      results_info["total_results"] = res.total_results;
	    }
	    current_page ++;
	    buffer = buffer.concat(res.results);
	    callback(null, buffer.splice(0, batch));
	    return true;
	  }
	});
      }
      callback(null, buffer.splice(0, batch));
      return true;
    }
  );
}

var MovieDB;

function Tmdb() {
  var API = {
    
    /**
     * Reference to singleton
     */
    MovieDB: MovieDB,
    
    /**
     * movieBatches
     * @param {String} query
     * @param {Integer} batch
     * @param {function(err, req)} callerCallback
     * @param {Object} args, optional
     *
     * See http://docs.themoviedb.apiary.io/#reference/search/searchmovie/get
     * for a full description of optional parameters:
     * `language`, `year`, `page` will be overwritten
     */
    movieBatches: function(query, batch, callerCallback, args) {
      if (!MovieDB) {
	throw new Error("MovieDB isn't running");
      }
      args = args || {};
      return (
	callBatches(
	  function(page, calleeCallback){
	    args = extend({query: query}, args, {page: page});
	    MovieDB.searchMovie(args, calleeCallback);
	  },
	  batch,
	  callerCallback
	)
      );
    },
    
    /**
     * discoverBatches
     * @param {String} movie
     * @param {Integer} batch
     * @param {function(err, req)} callerCallback
     * @param {Object} args, optional
     *
     * See http://docs.themoviedb.apiary.io/#reference/discover/get
     * for a full description of optional parameters:
     * `language`, `sort_by {popularity.(asc, desc), vote_average.(asc, desc)}`
     * `page` will be overwritten
     */
    discoverBatches: function(movie, batch, callerCallback, args) {
      if (!MovieDB) {
	throw new Error("MovieDB isn't running");
      }
      args = args || {};
      return (
	callBatches(
	  function(page, calleeCallback){
	    args = extend({movie: movie}, args, {page: page});
	    MovieDB.discoverMovie(args, calleeCallback);
	  },
	  batch,
	  callerCallback
	)
      );
    }
  };

  
  return {
    /**
     * Initialization function
     * @param {String} APIkey
     */
    init: function(APIkey) {
      APIkey = APIkey || "36eab4df191f31872b0c4caec8c095f1"; // fetch from private file
      try {
	MovieDB = require('moviedb')(APIkey);
	console.log("MovieDB initialized correctly");
	return API;
      } catch (err) {
	throw new Error("Couldn't instantiate MovieDB");
	return null;
      }
    }
  };  
}

module.exports = new Tmdb();
