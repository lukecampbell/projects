"use strict"
/*
 * public/javascripts/controllers/ShowEmployee.js
 */

_.extend(App.prototype, {
  models: {},
  views: {
    navbarView: null
  },
  collections: {},
  initializeModels: function() {
    var self = this;
  },
  initializeViews: function() {
    var self = this;
    this.views.navbarView = new NavbarView({
      el: $('#navbar-view')
    }).render();
  },
  initializeCollections: function() {
    var self = this;
  },
  initializeListeners: function() {
    var self = this;
  },
  fetchCollections: function() {
    var self = this;
  }
});

var app = new App();
