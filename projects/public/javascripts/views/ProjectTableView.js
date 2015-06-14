"use strict"
/*
 * public/javascripts/views/ProjectTableView.js
 */

var ProjectTableView = Backbone.View.extend({
  events: {
    'click th' : 'onSortBy'
  },
  initialize: function(options) {
    _.bindAll(this, "onSortBy");
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
  onSortBy: function(e) {
    e.stopPropagation();
    if($(e.target).hasClass('sorted')) {
      this.trigger('onReverseBy', $(e.target).data('id'));
    } else {
      this.trigger('onSortBy', $(e.target).data('id'));
    }
  },
  sortColumn: function(column) {
    this.clear();
    this.$el.find('th[data-id="' + column + '"]').toggleClass("sorted");
  },
  reverseColumn: function(column) {
    this.clear();
    this.$el.find('th[data-id="' + column + '"]').toggleClass("reverse");
  },
  clear: function() {
    this.$el.find('th').removeClass('sorted');
    this.$el.find('th').removeClass('reverse');
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
