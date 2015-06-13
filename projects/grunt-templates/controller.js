"use strict"
/*
 * <%= filepath %>
 */

var App = function(){}
_.extend(App.prototype, {
  views: {},
  models: {},
  collections: {},
  start: function() {
    console.log("Application started");
  }
});

var app = new App();
