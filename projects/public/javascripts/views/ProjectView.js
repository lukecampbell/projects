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
      height: width,
      width: width,
      model: pieModel,
      title: this.model.get('name')
    }).render();

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
