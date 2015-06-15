"use strict";
/*
 * public/javascripts/index.js
 */
_.extend(App.prototype, {
  collections: {
    projects: new ProjectCollection(),
    budgets: new BudgetCollection()
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
  },
  initializeCollections: function() {
  },
  initializeListeners: function() {
    var self = this;
    /* Listeners */
    this.listenTo(this.collections.projects, "add", function(model) {
      if(_.isUndefined(self.collections.comparator)) {
        self.views.projectTableView.trigger("onSortBy", "id");
      } else {
        self.collections.projects.sort();
        self.views.projectTableView.render();
      }
    });
    this.listenTo(this.views.projectTableView, "onRowClick", function(model) {
      window.location.href = window.location.href + model.get('id');
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
    this.listenTo(this, "app:newProject", function(model) {
      self.collections.projects.add(model);
    });

    this.listenTo(this, "app:showProject", _.debounce(function(model) {
      self.loadBudget(model);
    }, 500));
  },
  loadBudget: function(projectModel) {
    var self = this;
    console.log(projectModel.get('name'));
    this.collections.budgets.fetch({
      data: $.param({project_id: projectModel.get('id')}),
      success: function(collection) {
        if(collection.length > 0) {
          self.views.budgetView.model = collection.at(0);
          self.views.budgetView.render();
        }
      }
    });
  },
  fetchCollections: function() {
    var self = this;
    this.collections.projects.fetch({
      reset:true,
      success: function(collection) {
        self.views.projectTableView.render();
        self.views.projectTableView.sortColumn('id');
        if(collection.length>0) {
          self.loadBudget(collection.at(0));
        }
      }
    });
  }
});
var app = new App();

