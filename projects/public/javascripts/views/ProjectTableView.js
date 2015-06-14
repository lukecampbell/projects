"use strict"
/*
 * public/javascripts/views/ProjectTableView.js
 */

var ProjectTableView = Backbone.View.extend({
  initialize: function(options) {
  },
  subviews: {},
  template: JST['ProjectTable.jade'],
  add: function(model) {
    var self = this;
    var subview = new ProjectTableItemView({model: model});
    this.subviews[model.get('id')] = subview;
    subview.render();
    this.$el.find('tbody').append(subview.$el);
    // Pass the event upward
    this.listenTo(subview, "onClick", function(model) {
      self.trigger("onRowClick", model);
    });
  },
  render: function() {
    var self = this;
    this.$el.html(this.template());
    this.subviews = {};
    this.collection.each(function(model) {
      self.add(model);
    });
    return this;
  }
});
