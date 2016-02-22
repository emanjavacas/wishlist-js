'use strict';

var React = require('react');
var TextField = require('material-ui/lib/text-field');
var Paper = require('material-ui/lib/paper');
var IconButton = require('material-ui/lib/icon-button');
var FontIcon = require('material-ui/lib/font-icon');
var tmdb = require('../../services/tmdb.js').init();

var MovieSearchInput = React.createClass({
  render: function() {
    return (
      <Paper style={{
	  margin: 10,
	  padding: 20,
	  display: 'flex'
	}}>
	<TextField
	    hintText="Movie Name"
	    onChange={this.props.onInputChange}/>
	<IconButton
	    style={{
		flex: 1
	      }}
	    onClick={this.props.onClick}>
	  <FontIcon className="material-icons">search</FontIcon>
	</IconButton>
      </Paper> 
    )
  }
});

var MovieSearchComponent = React.createClass({
  getInitialState: function() {
    return {
      selectedMovies: [],
      inputValue: "",
    }
  },
  onInputChange: function(e) {
    this.setState({
      inputValue: e.target.value
    })
  },
  onClick: function(e) {

  },
  nextBatch: function() {
    this.setState({
      searchedMovies: this.iterator()
    })
  },
  render: function() {
    return (
      <div>
	<MovieSearchInput
	    onInputChange={this.onInputChange}
	    onClick={this.onClick}>
	</MovieSearchInput>
      </div>
    )
  }
});
  
module.exports = MovieSearchComponent;
