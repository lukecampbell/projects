"use strict"
/*
 * public/javascripts/views/ProjectView.js
 */

var ProjectView = Backbone.View.extend({
  initialize: function(options) {
  },
  subviews: {},
  template: JST['Project.jade'],
  renderPieChart: function() {
    var self = this;
    var spent = this.budgetModel.get('spent_budget');
    console.log(this.budgetModel.get('project'));
    var remaining = this.budgetModel.get('project').budget - this.budgetModel.get('spent_budget');
    var records = [];
    if(spent > 0) {
      records.push({label: "Spent", value: spent});
    }
    records.push({label: "Remaining", value: remaining});
    var pieModel = new PieModel({
      records: records
    });
    var width = Math.min(this.$el.find('#pie-view').width(), 500);
    this.subviews.pieChartView = new PieChartView({
      el: this.$el.find('#pie-view'),
      height: width+50,
      width: width,
      model: pieModel,
      title: this.model.get('name'),
      subtitle: this.model.get('id')
    }).render();

    this.listenTo(this.subviews.pieChartView, "onClick", function() {
      self.trigger("chartClick");
    });
  },
  renderBudgetEdit: function() {
    var self = this;
    var budgetModel = new BudgetModel({
      project_id: this.model.get('id'),
      spent_budget: this.budgetModel.get('spent_budget')
    });
    this.subviews.budgetEditView = new BudgetEditView({
      model: budgetModel,
      el: this.$el.find('#budget-edit-view')
    }).render();
    this.listenTo(this.subviews.budgetEditView, "newBudget", function(model) {
      self.trigger('newBudget', model);
    });
  },
  render: function() {
    this.$el.html(this.template({model: this.model}));
    this.$el.ipsum();
    if(!_.isUndefined(this.budgetModel)) {
      this.renderPieChart();
    }
    return this;
  }
});
