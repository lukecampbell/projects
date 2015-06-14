"use strict";
/*
 * public/javascripts/index.js
 */
_.extend(App.prototype, {
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

    this.listenTo(this.views.projectTableView, "onRowClick", function(model) {
      console.log(model.attributes);
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
  }
});
var app = new App();

