"use strict"
/*
 * public/javascripts/controllers/ProjectPage.js
 */

_.extend(App.prototype, {
  models: {},
  views: {
    navbarView: null,
    projectView: null
  },
  collections: {},
  initializeModels: function() {
  },
  initializeViews: function() {
    this.views.navbarView = new NavbarView({
      el: $('#navbar-view')
    }).render();
    this.views.projectView = new ProjectView({
      el: $('#project-view')
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
