const combineReducers = require('redux').combineReducers;
const actions = require('./actions.js');
const defaultState = require('./store/schema.js');



function searchedMovies(state, action) {
  state = state || defaultState.currentSearch;
  switch(action.type) {
  case actions.SEARCH_MOVIE:
    return 1;   
  default:
    return state;
  }
}

function selectedMovies(state, action) {
  return state;
}
