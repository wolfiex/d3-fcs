var tape = require("tape"),
  fcs = require("../");

tape("returns colours for vornoi", function(test) {
  points = [
    { x: 1, y: 1, c: 1 },
    { x: 1, y: 2, c: 1 },
    { x:1.2, y: 1, c: 4 },
    { x: 2, y: 1, c: 2 },
    { x: 2, y: 2, c: 3 },
    { x: 1.5, y: 1.5, c: 8 }
  ];

  test.equal( ''+fcs.fcs(points), ''+{ '1': 0, '2': 0, '3': 1, '4': 1, '8': 2 }
);
  test.end();
});
