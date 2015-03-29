"use strict";
/*
 * public/javascripts/index.js
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
      el: $('#main-view')
    });
    this.views.exampleView.render();
  }
});
var app = new App();

