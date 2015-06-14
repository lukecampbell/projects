"use strict"
/*
 * public/javascripts/views/ProjectView.js
 */

var ProjectView = Backbone.View.extend({
  initialize: function(options) {
  },
  
  template: JST['Project.jade'],
  
  render: function() {
    
    this.$el.html(this.template());
    this.$el.ipsum();
    
    return this;
  }
});
