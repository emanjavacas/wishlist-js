'use strict';

var defaultState = {
  currentSearch: {
    type: '',			// 'searchMovie'
    query: '',			// 'star wars'
    batchSize: 10
  },
  // moviesBySearch: {
  //   star: {
  //     isFetching: false,
  //     didInvalidate: false,
  //     currentPage: 1,
  //     results: [ 12131, 511 ],
  //     lastUpdated: 1439478405547
  //   },
  //   wars: {
  //     isFetching: true,
  //     didInvalidate: false,
  //     results: []
  //   }
  // },
  entities: {
    movies: {
      // 12131: {
      // 	title: 'Star wars'
      // },
      // 511: {
      // 	title: 'War on terror'
      // }
    }
  }
};

module.exports = defaultState;
