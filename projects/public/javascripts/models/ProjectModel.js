"use strict"
/*
 * public/javascripts/models/ProjectModel.js
 */

var ProjectModel = Backbone.Model.extend({
  urlRoot: '/api/project',
  defaults: {
    name: "",
    description: "",
    start_date: "",
    manager: "",
    budget: null
  }
});

var ProjectCollection = Backbone.Collection.extend({
  url: '/api/project',
  parse: function(response) {
    if(response && response.projects) {
      return response.projects;
    }
    return [];
  }
});
