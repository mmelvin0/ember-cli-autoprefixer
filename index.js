/* jshint node: true */
'use strict';

var autoprefixer = require('broccoli-autoprefixer');
var defaults     = require('lodash').defaults;

module.exports = {
  name: 'ember-cli-autoprefixer',
  included: function(parent) {
    while (!this.app && parent) {
      if (parent.app) {
        this.app = parent.app;
      } else {
        parent = parent.parent;
      }
    }
    this.options = defaults(this.app.options.autoprefixer || {}, {
      enabled: true
    });
    this.enabled = this.options.enabled;
    delete this.options.enabled;
  },
  postprocessTree: function(type, tree) {
    if ((type === 'all' || type === 'styles') && this.enabled) {
      tree = autoprefixer(tree, this.options);
    }

    return tree;
  }
};
