"use strict"
/*
 * public/javascripts/views/NewProjectItemView.js
 */

var NewProjectItemView = Backbone.View.extend({
  tagName: 'tr',
  events: {
    'keyup :input' : 'onKeyUp',
    'blur :input' : 'onBlur'
  },
  bindings: {
    '#project-id-input':'id',
    '#project-name-input':'name',
    '#project-manager-input':'manager',
    '#project-description-input':'description',
    '#project-budget-input':'budget'
  },
  initialize: function(options) {
    _.bindAll(this, "onKeyUp", "onBlur");
    this.model = new ProjectModel({
      id: 'Project ID',
      name: "Name",
      manager: "Manager",
      description: "Description",
      budget: "Budget"
    });
  },
  onKeyUp: function(e) {
    console.log("oi");
    if(e.keyCode == 13) {
      console.log("It's going down!");
    }
  },
  onBlur: function(e) {
    var self = this;
    setTimeout(function() {
      if(self.$el.find('input:focus').length == 0) {
        self.model.save(null, {
          success: function(model) {
            self.$el.html("");
            app.trigger("app:newProject", self.model);
            var budgetModel = new BudgetModel({project_id: self.model.get('id'), spent_budget: 0});
            budgetModel.save();
          }
        });
      }
    }, 500);
  },
  template: JST['NewProjectItem.jade'],
  render: function() {
    
    this.$el.html(this.template());
    this.stickit();
    
    return this;
  }
});
