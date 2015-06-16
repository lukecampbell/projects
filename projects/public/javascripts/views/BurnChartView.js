"use strict"
/*
 * public/javascripts/views/BurnChartView.js
 */

var BurnChartView = Backbone.View.extend({
  initialize: function(options) {
  },
  
  render: function() {
    // Wrapping in nv.addGraph allows for '0 timeout render', stores rendered charts in nv.graphs, and may do more in the future... it's NOT required
    var chart;
    var data;
    nv.addGraph(function() {
        chart = nv.models.lineChart()
            .options({
                transitionDuration: 300,
                useInteractiveGuideline: true
            })
        ;
        // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        chart.xAxis
            .axisLabel("Date")
            .tickFormat(function(d) { return d3.time.format('%b %d')(new Date(d)); })
            .staggerLabels(false)
        ;
        chart.yAxis
            .axisLabel('Dollars')
            .tickFormat(function(d) {
                if (d == null) {
                    return 'N/A';
                }
                return d3.format(',d')(d);
            })
        ;

        var valueScale = d3.scale.linear()
                .domain([0, 100])
                .range([150000, 0]);
        var timeScale = d3.time.scale()
                .domain([0, 100])
                .range([new Date('2015-02-01'), new Date('2015-06-01')]);
        var x = d3.range(0,100).map(function(d) { return {x: timeScale(d), y: valueScale(d)};});
        data = [{
          values: x,
          color: '#888',
          key: "Data",
          classed: "dashed"
        }];
        d3.select('#burn-chart-view').append('svg')
            .datum(data)
            .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

    function genData() {
      var data = [];
      var initialDate = moment("2015-02-02");
      for(var i = 0; i < 100; i++) {
        var x = initialDate.add(1, 'days').valueOf();
        console.log(x);
        data.push({x: x, y: 100-i});
      }
      return data;
    }

    function sinAndCos() {
        var sin = [],
            sin2 = [],
            cos = [],
            rand = [],
            rand2 = []
            ;
        for (var i = 0; i < 100; i++) {
            sin.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) }); //the nulls are to show how defined works
            sin2.push({x: i, y: Math.sin(i/5) * 0.4 - 0.25});
            cos.push({x: i, y: .5 * Math.cos(i/10)});
            rand.push({x:i, y: Math.random() / 10});
            rand2.push({x: i, y: Math.cos(i/10) + Math.random() / 10 })
        }
        return [
            {
                area: true,
                values: sin,
                key: "Sine Wave",
                color: "#ff7f0e",
                strokeWidth: 4,
                classed: 'dashed'
            },
            {
                values: cos,
                key: "Cosine Wave",
                color: "#2ca02c"
            },
            {
                values: rand,
                key: "Random Points",
                color: "#2222ff"
            },
            {
                values: rand2,
                key: "Random Cosine",
                color: "#667711",
                strokeWidth: 3.5
            },
            {
                area: true,
                values: sin2,
                key: "Fill opacity",
                color: "#EF9CFB",
                fillOpacity: .1
            }
        ];
    }
    
  }
});
