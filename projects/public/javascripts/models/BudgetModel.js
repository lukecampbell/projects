"use strict"
/*
 * public/javascripts/models/BudgetModel.js
 */

var BudgetModel = Backbone.Model.extend({
  urlRoot: '/api/budget',
  defaults: {
    project: {
      budget: null,
      description: "",
      end_date: null,
      id: "",
      manager: "",
      name: "",
      start_date: null
    },
    project_id: "",
    spent_budget: null
  }
});

var BudgetCollection = Backbone.Collection.extend({
  url: '/api/budget',
  model: BudgetModel,
  parse: function(response) {
    if(response && response.budgets) {
      return response.budgets;
    }
    return [];
  }
});
