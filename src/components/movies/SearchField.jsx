'use strict';

var React = require('react');
var TextField = require('material-ui/lib/text-field');
var Paper = require('material-ui/lib/paper');
var IconButton = require('material-ui/lib/icon-button');
var FontIcon = require('material-ui/lib/font-icon');
var tmdb = require('../../services/tmdb.js').init();

var MovieSearchComponent = React.createClass({
  /* this is the parent component which should own this module
  /  state and the ways to change it (container components) and
  /  pass both (state and methods) to its children as appropriate
  /*/
});

var MovieSearchInput = React.createClass({
  getInitialState: function() {
    return {
      searchedMovies: [],
      selectedMovies: [],
      inputValue: "",
      iterator: null
    }
  },
  onChange: function(e) {
    this.setState({
      inputValue: e.target.value
    })
  },
  nextBatch: function() {
    this.setState({
      searchedMovies: this.iterator()
    })
  },
  onClick: function(e) {
    var that = this;
    var iterator = tmdb.movieBatches(
      this.state.inputValue, 
      10,
      function(err, res){
	if(err){
	  console.log(err);
	} else {
	  console.log(res);
	  that.setState({
	    searchedMovies: res
	  })
	}
      },
      {}
    );
    iterator();
    that.setState({
      iterator: iterator
    });
  },
  render: function() {
    return (
      <Paper style={{
	  margin: 10,
	  padding: 20,
	  display: 'flex'
	}}>
	<TextField
	    hintText="Movie Name"
	    onChange={this.onChange}/>
	<IconButton
	    style={{
		flex: 1
	      }}
	    onClick={this.onClick}>
	  <FontIcon className="material-icons">search</FontIcon>
	</IconButton>
      </Paper> 
    )
  }
});
  
module.exports = MovieSearchInput;
