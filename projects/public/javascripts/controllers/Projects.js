"use strict";
/*
 * public/javascripts/index.js
 */
var App = function() {
};
_.extend(App.prototype, Backbone.Events, {
  views: {
    navbarView: null
  },
  start: function() {
    /* Views */
    this.views.navbarView = new NavbarView({
      el: $('#navbar-view')
    });
    this.views.navbarView.render();
    console.log("App started");
  }
});
var app = new App();

