var nio = require('niojs');
var d3 = require('d3');

var prev;
var diffs = [];

nio.source.socketio(
  'http://brand.nioinstances.com',
  ['count_by_time']
  ).pipe(nio.func(calcDifferenceInSeconds))
  .pipe(nio.func(function(diff){
    diffs.push(diff);
  }));
 

setInterval(function() {
  var color = determineColor(averageDiff(diffs, 2));
  d3.select("circle")
      .style("fill", d3.hcl(color))
    .transition()
      .duration(1200)
      .style("fill", function() {
        var that = d3.select(this),
            fill0 = that.style("fill"),
            fill1 = that.style("fill", null).style("fill");
        that.style("fill", fill0);
        return fill1;
      });
}, 2000);  

function averageDiff (diffs, size) {
  var copy = diffs;
  var l = copy.length;
  if (copy.length >= size) {
    var total = copy.reduce(function(prev, curr){
      return prev + curr;
    });
    diffs.splice(0, l);
    var avg = Math.round(total/l);
    console.log("Avg",avg)
    console.log("Diffs",diffs)
    return avg;
  }
}


function determineColor (diff) {
  if (diff > 20) {
    return '#567238'
  } else if (diff > 2) {
    return '#488B5C'
  } else if (diff < -2) {
    return '#3FB6BC'
  } else if (diff < -20) {
    return '#76C6EB'
  } else {
    return '#37A28A'
  }
};


function calcDifferenceInSeconds (chunk) {
  if (chunk.count_type === 'countpersec') {
      if ( !prev ) { prev = chunk };
      var diff = prev.count_value - chunk.count_value;
      return Math.round(diff);
    }
}


