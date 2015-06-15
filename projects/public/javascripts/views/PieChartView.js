"use strict"
/*
 * public/javascripts/views/PieChartView.js
 * Dependencies:
 *  - d3
 *  - d3pie
 */

var PieChartView = Backbone.View.extend({
  events: {
    'click' : 'onClick'
  },
  onClick: function(e) {
    this.trigger("onClick");
  },
  initialize: function(options) {
    this.title = options && options.title || "Pie Chart";
    this.subtitle = options && options.subtitle || "";
    this.colors = options && options.colors || new ColorPaletteModel();
    this.width = options && options.width || 500;
    this.height = options && options.height || 500;
    _.bindAll(this, "onClick");
  },
  render: function() {
    var self = this;
    this.$el.html("");
    this.pie = new d3pie(this.el, {
      "header": {
        "title": {
          "text": this.title,
          "fontSize": 24,
          "font": "open sans"
        },
        "subtitle": {
          "text": this.subtitle,
          "color": "#999999",
          "fontSize": 12,
          "font": "open sans"
        },
        "titleSubtitlePadding": 9
      },
      "footer": {
        "color": "#999999",
        "fontSize": 10,
        "font": "open sans",
        "location": "bottom-left"
      },
      "size": {
        "canvasHeight":this.height,
        "canvasWidth":this.width,
        "pieInnerRadius": "19%",
        "pieOuterRadius": "90%"
      },
      "data": {
        "content": _.map(this.model.get('records'), function(record) {
          return {label: record.label, value: record.value, color: self.colors.chooseColor()}
        })
      },
      "labels": {
        "outer": {
          "format": "none"
        },
        "inner": {
          "format":"label-value2",
          "hideWhenLessThanPercentage": 3
        },
        "mainLabel": {
          "color":"#efefef",
          "fontSize": 11
        },
        "percentage": {
          "color": "#ffffff",
          "decimalPlaces": 0
        },
        "value": {
          "color": "#adadad",
          "fontSize": 11
        },
        "lines": {
          "enabled": true
        },
        "truncation": {
          "enabled": true
        }
      },
      "effects": {
        "pullOutSegmentOnClick": {
          "effect": "linear",
          "speed": 400,
          "size": 8
        }
      }
    });
    return this;
  }
});
