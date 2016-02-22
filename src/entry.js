'use strict';

var React = require('react');	// react must be required in entry.js
var ReactDom = require('react-dom');
var Provider = require('react-redux').Provider;
var createStore = require('redux').createStore;
var App = require('./components/App.jsx');

// const store = createStore();

ReactDom.render(<App/>, document.getElementById('react-root'));
