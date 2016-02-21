'use strict';

var React = require('react');
var AppBar = require('material-ui/lib/app-bar');
var LeftNav = require('material-ui/lib/left-nav');
var MenuItem = require('material-ui/lib/menus/menu-item');
var IconButton = require('material-ui/lib/icon-button');
var MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
var TextField = require('material-ui/lib/text-field');
var Paper = require('material-ui/lib/paper');

var SearchField = require('./movies/SearchField.jsx');

var tmdb = require('../services/tmdb');

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
      <AppBar title="WishList"
	      iconElementRight={
		<IconButton onClick={this.props.handleToggle}>
		  <MoreVertIcon />
		</IconButton>
			       }>
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
      pressed: new Set()
    };    
  },
  handleToggle: function() {
    this.setState({leftNavOpen: !this.state.leftNavOpen});
  },
  onKeyDown: function(e) {
    var pressed = this.state.pressed;
    pressed.add(String.fromCharCode(e.which));
    this.setState({pressed: pressed});
  },
  onKeyUp: function(e) {
    var pressed = this.state.pressed;
    pressed.delete(String.fromCharCode(e.which));
    this.setState({pressed: pressed});
  },
  render: function() {
    return (
      <div> 
      <AppBarTest
	  leftNavOpen={this.state.leftNavOpen}
	  handleToggle={this.handleToggle}>
      </AppBarTest>
      <Paper style={this.style}
      children={
	<div>
	  <SearchField></SearchField>
	  <TextField
	      hintText="Movie Name"
	      onKeyDown={this.onKeyDown}
	      onKeyUp={this.onKeyUp}
	      floatingLabelText="I am a floating label text"/>
	  <div>You have input {this.state.pressed}</div>
	</div>}/>
      <LeftNavTest leftNavOpen={this.state.leftNavOpen}></LeftNavTest>
      </div>
    );
  }
});

module.exports = App;
