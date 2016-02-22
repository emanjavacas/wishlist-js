'use strict';

var React = require('react');
var AppBar = require('material-ui/lib/app-bar');
var LeftNav = require('material-ui/lib/left-nav');
var MenuItem = require('material-ui/lib/menus/menu-item');
var IconButton = require('material-ui/lib/icon-button');
var MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');

var MovieSearchComponent = require('./movies/SearchField.jsx');

var LeftNavTest = React.createClass({
  render: function() {
    return (
      <div>
	<LeftNav open={this.props.leftNavOpen}>
	  <MenuItem>Menu Item</MenuItem>
	  <MenuItem>Menu Item 2</MenuItem>
	</LeftNav>
      </div>
    );
  }
});

var AppBarTest = React.createClass({
  render: function() {	
    return (
      <AppBar
	  title="WishList"
	  iconElementRight={
	    <IconButton onClick={this.props.handleToggle}>
	      <MoreVertIcon />
	    </IconButton>}>
      </AppBar>
    );
  }
});

var App = React.createClass({
  style: {
    margin: 10,
    padding: 20
  },
  getInitialState: function() {    
    return {
      leftNavOpen: false,
    };    
  },
  handleToggle: function() {
    this.setState({leftNavOpen: !this.state.leftNavOpen});
  },
  render: function() {
    return (
      <div> 
      <AppBarTest
	  leftNavOpen={this.state.leftNavOpen}
	  handleToggle={this.handleToggle}>
      </AppBarTest>
      <LeftNavTest leftNavOpen={this.state.leftNavOpen}></LeftNavTest>
      <MovieSearchComponent></MovieSearchComponent>
      </div>
    );
  }
});

module.exports = App;
