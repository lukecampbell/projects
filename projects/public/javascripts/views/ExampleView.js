"use strict";
/*
 * public/javascripts/views/ExampleView.js
 */

var ExampleView = Backbone.View.extend({
  initialize: function() {
    this.initialRender();
  },
  initialRender: function() {
    this.$el.html('Spinner goes here');
  },
  template: JST['example.jade'],
  render: function() {
    this.$el.html(this.template({message: 'hi'}));
  }
});
