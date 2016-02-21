
module.exports = {
  /**
   * basic extend function
   * var object3 = extend({}, object1, object2);
   * http://stackoverflow.com/a/14974931
   */
  extend: function(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
  }
};
