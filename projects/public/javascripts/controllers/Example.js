"use strict";
/*
 * projects/public/javascripts/controllers/Example.js
 */
var App = function() {
};
_.extend(App.prototype, Backbone.Events, {
  views: {
    exampleView: null
  },
  start: function() {
    console.log("App started");
    this.views.exampleView = new ExampleView({
      el: $('#example-view')
    });
    this.views.exampleView.render();
  }
});
var app = new App();
