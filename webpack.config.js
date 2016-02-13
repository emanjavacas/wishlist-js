var webpack = require('webpack');

module.exports = {
    context: __dirname + '/src',
    entry: './entry.js',
    output: {
	filename: 'bundle.js',
	path: __dirname + '/build',
	publicPath: 'http://localhost:8080/build/'
    },
    module: {
	loaders: [
	    {
		test: /\.js$/, 
		loader: 'babel', 
		exclude: /node_modules/,
		query: {
		    presets: ['es2015', 'react']
		}
	    }
	]
    }
};