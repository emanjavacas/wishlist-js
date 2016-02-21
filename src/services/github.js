'use strict';

var github = (function(config){
  var gh = require('github');
  return new gh(config);
}({
  version: "3.0.0"
}));

github.user.getFollowingFromUser({
  user: "emanjavacas"
}, function(err, res) {
  console.log(JSON.stringify(res));
});










