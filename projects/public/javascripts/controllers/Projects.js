"use strict";
/*
 * public/javascripts/index.js
 */
var App = function() {
};
_.extend(App.prototype, Backbone.Events, {
  collections: {
    projects: new ProjectCollection()
  },
  views: {
    navbarView: null,
    projectTableView: null,
    budgetView: null,
  },
  initializeModels: function() {
  },
  initializeViews: function() {
    this.views.navbarView = new NavbarView({
      el: $('#navbar-view')
    });
    this.views.navbarView.render();

    this.views.projectTableView = new ProjectTableView({
      el: $('#project-table-view'),
      collection: this.collections.projects
    });
    this.views.projectTableView.render();

    this.views.budgetView = new BudgetView({
      el: $('#budget-view')
    });
    this.views.budgetView.render();
  },
  initializeCollections: function() {
  },
  initializeListeners: function() {
    /* Listeners */
    this.listenTo(this.collections.projects, "add", function(model) {
      console.log("Add");
      this.views.projectTableView.add(model);
    });
  },
  fetchCollections: function() {
    var self = this;
    this.collections.projects.fetch({
      reset:true,
      success: function(collection) {
        self.views.projectTableView.render();
      }
    });
  },
  start: function() {
    var self = this;
    this.initializeModels();
    this.initializeCollections();
    this.initializeViews();
    this.initializeListeners();
    this.fetchCollections();
  }
});
var app = new App();

