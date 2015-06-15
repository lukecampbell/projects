"use strict"
/*
 * public/javascripts/views/BudgetView.js
 */

var BudgetView = Backbone.View.extend({
  initialize: function(options) {
  },
  template: JST['Budget.jade'],
  subviews: [],
  addPieChart: function(model) {
    var el = this.$el.find('#pie-view');
    var w = Math.min($(el).width(), 500);
    var subview = new PieChartView({
      el: el,
      model: model,
      width: w,
      height: w,
      title: this.model.get('project').name
    });
    this.subviews.push(subview);
    subview.render();
  },
  render: function() {
    this.$el.html(this.template());
    var tempModel = new PieModel({
      records: [
        {
          label: "Spent",
          value: this.model.get('spent_budget')
        },
        {
          label: "Remaining",
          value: this.model.get('project').budget - this.model.get('spent_budget')
        }
      ]
    });
    console.log(tempModel.attributes);
    this.addPieChart(tempModel);
    return this;
  }
});
