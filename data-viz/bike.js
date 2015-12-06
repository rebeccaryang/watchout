
var canvas = d3.select(".board")
  .append("svg")
  .attr("width", 532)
  .attr("height", 581);

var map = canvas.append("image")
  .attr('class','map')
  .attr('height',581)
  .attr('width',532)
  .attr("xlink:href","babs-map.png")
  .append('div')
  .attr('class','text')
  .text("20")
  .attr('color','black')
  .attr('position','absolute')
  .attr('font-size','12px')
  .attr('font-family','sans-serif')
  .attr('x', 417)
  .attr('y', 403);

var circle = d3.select("svg")
  .append("circle")
  .attr('class', 'station')
  .attr('cx', 417)
  .attr('cy', 403)
  .attr('r', 20)
  .attr('fill', 'red')

//var arr = stationBeanList;

// var text = d3.select("text")
  //.data("object.stationBeanList")
  // .append('div')
  canvas.append('text')
  .attr('class','text')
  .text("20")
  .attr('fill','black')
  .attr('position','absolute')
  .attr('font-size','12px')
  .attr('x', 417)
  .attr('y', 408);
