"use strict"
/*
 * public/javascripts/views/BudgetEditView.js
 */

var BudgetEditView = Backbone.View.extend({
  events: {
    'blur :input' : 'onBlur',
    'hidden.bs.collapse .panel' : 'onHidden'
  },
  bindings: {
    '#spent_budget' : 'spent_budget'
  },
  onBlur: function(e) {
    var self = this;
    setTimeout(function() {
      if(self.$el.find('input:focus').length == 0) {
        self.model.save(null,{
          success: function() {
            self.trigger('newBudget', self.model);
          }
        });
        self.hide();
      }
    }, 500);
  },
  onHidden: function(e) {
  },
  hide: function() {
    console.log("hide");
    this.$el.find('.panel').collapse('hide');
  },
  initialize: function(options) {
    _.bindAll(this, "onBlur", "hide", "onHidden");
  },
  
  template: JST['BudgetEdit.jade'],
  
  render: function() {
    
    this.$el.html(this.template());
    this.$el.find('.panel').collapse();
    this.stickit();
    
    return this;
  }
});
