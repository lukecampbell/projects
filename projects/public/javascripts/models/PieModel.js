"use strict"
/*
 * public/javascripts/models/PieModel.js
 */
var PieModel = Backbone.Model.extend({
  defaults: {
    records: [
      {
        label: "zenbu",
        value: 0,
        percent: 100
      }
    ] 
  }
});

var PieCollection = Backbone.Collection.extend({
  model: PieModel
});
