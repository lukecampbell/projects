"use strict"
/*
 * public/javascripts/views/ProjectTableItemView.js
 */

var ProjectTableItemView = Backbone.View.extend({
  tagName: "tr",
  initialize: function(options) {
  },
  template: JST['ProjectTableItem.jade'],
  render: function() {
    this.$el.html(this.template({model: this.model}));
    return this;
  }
});
