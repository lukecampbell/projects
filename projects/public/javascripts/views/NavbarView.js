"use strict"
/*
 * public/javascripts/views/NavbarView.js
 */

var NavbarView = Backbone.View.extend({
  initialize: function(options) {
  },
  
  template: JST['Navbar.jade'],
  
  render: function() {
    console.log("uke totte kudasai");
    
    this.$el.html(this.template());
    this.$el.find('li#projects').toggleClass('active');
    
    return this;
  }
});
