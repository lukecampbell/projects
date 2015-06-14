"use strict";
/*
 * projects/public/javascripts/models/WindowModel.js
 */

var WindowModel = Backbone.Model.extend({
  initialize: function() {
    _.bindAll(this, "setSize");
    this.setSize();
    var caller = _.debounce(this.setSize);
    $(window).on('resize', caller);
  },
  setSize: function() {
    this.set({
      width: $(window).width(),
      height: $(window).height()
    });
    this.trigger('resize', this);
  },
  defaults: {
    width: 0,
    height: 0
  }
});
