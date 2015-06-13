"use strict"
/*
 * <%= filepath %>
 */

var <%= viewName %> = Backbone.View.extend({
  initialize: function(options) {
  },
  <% if(!_.isUndefined(templateName) && templateName != "") { %>
  template: JST['<%= templateName %>'],
  <% } %>
  render: function() {
    <% if(!_.isUndefined(templateName) && templateName != "") { %>
    this.$el.html(this.template());
    <% } %>
    return this;
  }
});
