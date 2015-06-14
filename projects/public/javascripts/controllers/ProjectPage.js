"use strict"
/*
 * public/javascripts/controllers/ProjectPage.js
 */

_.extend(App.prototype, {
  models: {
    projectModel: new ProjectModel()
  },
  views: {
    navbarView: null,
    projectView: null
  },
  collections: {},
  initializeModels: function() {
    var paths = window.location.href.split('/');
    var id = paths[paths.length-1];
    this.models.projectModel.set('id', id);
  },
  initializeViews: function() {
    this.views.navbarView = new NavbarView({
      el: $('#navbar-view')
    }).render();
    this.views.projectView = new ProjectView({
      el: $('#project-view'),
      model: this.models.projectModel
    });
  },
  initializeCollections: function() {
  },
  initializeListeners: function() {
  },
  fetchCollections: function() {
    var self = this;
    this.models.projectModel.fetch({
      success: function(model) {
        self.views.projectView.render();
      }
    });
  }
});

var app = new App();
