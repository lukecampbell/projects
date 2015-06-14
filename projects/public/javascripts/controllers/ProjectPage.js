"use strict"
/*
 * public/javascripts/controllers/ProjectPage.js
 */

_.extend(App.prototype, {
  models: {},
  views: {
    navbarView: null
  },
  collections: {},
  initializeModels: function() {
  },
  initializeViews: function() {
    this.views.navbarView = new NavbarView({
      el: $('#navbar-view')
    }).render();
  },
  initializeCollections: function() {
  },
  initializeListeners: function() {
  },
  fetchCollections: function() {
  }
});

var app = new App();
