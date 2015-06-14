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
    var w = $(el).width();
    console.log("Width", w);
    var subview = new PieChartView({
      el: el,
      model: model,
      width: w,
      height: w
    });
    this.subviews.push(subview);
    subview.render();
    console.log("Pie Chart should be rendered");
  },
  render: function() {
    this.$el.html(this.template());
    var tempModel = new PieModel({
      records: [
        {
          label: "spent",
          value: 10000,
          percent: 35
        },
        {
          label: "remaining",
          value: 18571.42,
          percent: 65
        }
      ]
    });
    this.addPieChart(tempModel);
    return this;
  }
});
