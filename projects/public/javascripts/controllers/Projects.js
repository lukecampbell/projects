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
  models: {
    windowModel: new WindowModel()
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
    var self = this;
    /* Listeners */
    this.listenTo(this.collections.projects, "add", function(model) {
      console.log("Add");
      this.views.projectTableView.add(model);
    });
    this.listenTo(this.views.projectTableView, "onRowClick", function(model) {
      console.log(model.attributes);
    });
    this.listenTo(this.views.projectTableView, "onSortBy", function(column) {
      self.collections.projects.comparator = column;
      self.collections.projects.sort();
      self.views.projectTableView.render();
      self.views.projectTableView.sortColumn(column);
    });
    this.listenTo(this.views.projectTableView, "onReverseBy", function(column) {
      function reverseSortBy(sortByFunction) {
        return function(left, right) {
          var l = sortByFunction(left);
          var r = sortByFunction(right);

          if (l === void 0) return -1;
          if (r === void 0) return 1;

          return l < r ? 1 : l > r ? -1 : 0;
        };
      }
      self.collections.projects.comparator = function(model) {
        return model.get(column);
      }
      self.collections.projects.comparator = reverseSortBy(self.collections.projects.comparator);
      self.collections.projects.sort();
      self.views.projectTableView.render();
      self.views.projectTableView.reverseColumn(column);
    });

    this.listenTo(this.models.windowModel, 'resize', function(model) {
      // Re-render the budget view
      self.views.budgetView.render();
    });
  },
  fetchCollections: function() {
    var self = this;
    this.collections.projects.fetch({
      reset:true,
      success: function(collection) {
        self.views.projectTableView.render();
        self.views.projectTableView.sortColumn('id');
      }
    });
  }
});
var app = new App();

