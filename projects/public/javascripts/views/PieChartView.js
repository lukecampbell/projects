"use strict"
/*
 * public/javascripts/views/PieChartView.js
 */

var PieChartView = Backbone.View.extend({
  initialize: function(options) {
    this.width = options && options.width || 250;
    this.height = options && options.width || 250;
    this.radius = Math.min(this.height, this.width) / 2;
    this.colors = options && options.colors || new ColorPaletteModel();
  },
  render: function() {
    var self = this;
    var node = this.$el.toArray();

    var radius = Math.min(this.width, this.height) / 2;

    var color = d3.scale.ordinal()
      .range(this.colors.get('colors'));

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.percent });

    this.svg = d3.select(this.el).append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
      .append('g')
        .attr('transform', 'translate(' + this.width / 2 + "," + this.height / 2 + ")");

    var g = this.svg.selectAll(".arc")
        .data(pie(this.model.get('records')))
      .enter().append('g')
        .attr('class', 'arc');

    g.append('path')
        .attr('d', arc)
        .style("fill", function(d) { return self.colors.chooseColor(); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")";})
        .attr('dy', '.35em')
        .style('text-anchor', 'middle')
        .text(function(d) { return d.data.label; });


    return this;
  }
});
