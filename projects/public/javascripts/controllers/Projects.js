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
  },
  start: function() {
    var self = this;
    /* Views */
    this.views.navbarView = new NavbarView({
      el: $('#navbar-view')
    });
    this.views.navbarView.render();

    this.views.projectTableView = new ProjectTableView({
      el: $('#project-table-view'),
      collection: this.collections.projects
    });
    this.views.projectTableView.render();

    /* Listeners */
    this.listenTo(this.collections.projects, "add", function(model) {
      console.log("Add");
      this.views.projectTableView.add(model);
    });

    this.collections.projects.fetch({
      reset:true,
      success: function(collection) {
        self.views.projectTableView.render();
      }
    });
  }
});
var app = new App();

