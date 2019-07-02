export default function(scatter) {

  var d3=require('d3');
  var center = d3
    .nest()
    .key(function(d) {
      return d.c;
    })
    .rollup(function(leaves) {
      return {
        x: d3.mean(leaves, d => d.x),
        y: d3.mean(leaves, d => d.y)
      };
    })
    .entries(scatter);


  var pairs = Object.values(center).map(d => [d.value.x || 0, d.value.y || 0]);

  const dmodule = require("d3-delaunay");

  var delaunay = dmodule.Delaunay.from(pairs);
  var mapping = {};

  function greedy(id) {
    if (!mapping[id] === undefined) {
      return null;
    }

    var nodes = [...delaunay.neighbors(id)];

    if (nodes.length == 0) {
      return null;
    }
    var colrs = new Set(nodes.map(d => mapping[d]));
    var counter = 0;
    var match = false;


    while (!match) {
      if (colrs.has(counter)) {
        counter += 1;
      } else {
        mapping[id] = counter;
        match = true;
      }
    }


    nodes
      .filter(d => !mapping[d])
      .map(d => {
        greedy(d);
      });

    return true;
  }

  greedy(Object.keys(center)[0]);

  var keys = center.map(d=>d.key);
  var groupcol = {};
  Object.values(mapping).forEach((d,i)=>{groupcol[keys[i]] = d})

  return groupcol;
}
