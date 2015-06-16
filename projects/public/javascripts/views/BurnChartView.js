"use strict"
/*
 * public/javascripts/views/BurnChartView.js
 */

var BurnChartView = Backbone.View.extend({
  initialize: function(options) {
  },
  
  render: function() {
    var self = this;
    // Wrapping in nv.addGraph allows for '0 timeout render', stores rendered charts in nv.graphs, and may do more in the future... it's NOT required
    this.chart;
    var data;
    nv.addGraph(function() {
        self.chart = nv.models.lineChart()
            .options({
                transitionDuration: 300,
                useInteractiveGuideline: true
            })
        ;
        // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        self.chart.xAxis
            .axisLabel("Date")
            .tickFormat(function(d) { return d3.time.format('%b %d')(new Date(d)); })
            .staggerLabels(false)
        ;
        self.chart.yAxis
            .axisLabel('Dollars')
            .tickFormat(function(d) {
                if (d == null) {
                    return 'N/A';
                }
                return d3.format(',d')(d);
            })
        ;
        var points = 1200;

        var valueScale = d3.scale.linear()
                .domain([0, points])
                .range([150000, 0]);
        var timeScale = d3.time.scale()
                .domain([0, points])
                .range([new Date('2015-02-01'), new Date('2015-06-01')]);
        var x = d3.range(0,points).map(function(d) { return {x: timeScale(d), y: valueScale(d)};});
        data = [{
          values: x,
          color: '#888',
          key: "Linear Burn",
          classed: "dashed"
        }];
        var node = self.$el.toArray();
        d3.select(node[0]).append('svg')
            .datum(data)
            .call(self.chart);
        nv.utils.windowResize(self.chart.update);
        return self.chart;
    });

  }
});
