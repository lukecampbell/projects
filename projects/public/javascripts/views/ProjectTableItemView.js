"use strict"
/*
 * public/javascripts/views/ProjectTableItemView.js
 */

var ProjectTableItemView = Backbone.View.extend({
  tagName: "tr",
  events: {
    'click' : "onClick",
    'mouseover':'onHover'
  },
  onClick: function(e) {
    this.trigger("onClick", this.model);
  },
  onHover: function(e) {
    app.trigger("app:showProject", this.model);
  },
  initialize: function(options) {
    _.bindAll(this, 'onClick', 'onHover');
  },
  template: JST['ProjectTableItem.jade'],
  render: function() {
    this.$el.html(this.template({model: this.model}));
    return this;
  }
});
