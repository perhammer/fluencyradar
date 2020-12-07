    var a =[]
    var b = []
    var c = []
    var d2 = []
    var e = []
    var f = []
    var g = []
    var h = []
    var color = '';
    var i = [];
    var j =[];
    var k = [];
    var l = [];
    var ax = [];
    var ay = [];
    var data3 = [];
    var angdatax = [];
    var headcolor = [];
    var headnames = [];

d3.json('radardata.json', function(data){

    data.sections.forEach(function(d,i){
        a.push(d)
    })
    a.forEach(function(d,i){
        b.push(d.heading)
        c.push(d.subsections)
        g.push(d.subcolour)
        h.push(d.subsections)
    })
    c.forEach(function(d,i){
        d.forEach(function(d,i){d2.push(d.heading); e.push(d.entries)})
    })
    e.forEach(function(d,i){
        var x = d2[i]
        d.forEach(function(d,i){
            var sc = d.score
            sc = sc.toString()
            var t = getColor(x)
        var final = {category_label: x, question_label:d.name, value:sc, color:color}
        f.push(final)
    })
    })
    

    function getColor(name){
    h.forEach(function(d,i){
            var x = g[i]
            d.forEach(function(d,i){
                if(d.heading == name){
                    color = x;
                }
            })
        })   
}

data3 = f;
})


function draw() {
          "use strict";
          
          var colarry = ['#000', '#222', '#726342', '#716239'];
          var margin = 0,
            width = 600,
            height = 600,
            maxBarHeight = height / 2 - (margin + 70);

          var innerRadius = 0.1 * maxBarHeight;

          var svg = d3.select('.app')
            .append("svg")
            .attr("width", 1000)
            .attr("height", 1000)
            .append("g")
            .attr("class", "chart")
            .attr("transform", "translate(450,450)");
          var defs = svg.append("defs");

          var gradients = defs
            .append("linearGradient")
            .attr("id", "gradient-chart-area")
            .attr("x1", "50%")
            .attr("y1", "0%")
            .attr("x2", "50%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

          gradients.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#EDF0F0")
            .attr("stop-opacity", 1);

          gradients.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#ACB7BE")
            .attr("stop-opacity", 1);

          gradients = defs
            .append("linearGradient")
            .attr("id", "gradient-questions")
            .attr("x1", "50%")
            .attr("y1", "0%")
            .attr("x2", "50%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

          gradients.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#F6F8F9")
            .attr("stop-opacity", 1);

          gradients.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#D4DAE0")
            .attr("stop-opacity", 1);

          gradients = defs
            .append("radialGradient")
            .attr("id", "gradient-bars")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("cx", "0")
            .attr("cy", "0")
            .attr("r", maxBarHeight)
            .attr("spreadMethod", "pad");

          gradients.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#F3D5AA");

          gradients.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", "#F4A636");

          gradients.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#AF4427");

          svg.append("circle")
            .attr("r", maxBarHeight + 70)
            .classed("category-circle", true);

          svg.append("circle")
            .attr("r", maxBarHeight + 40)
            .classed("question-circle", true);

          svg.append("circle")
            .attr("r", maxBarHeight)
            .classed("chart-area-circle", true);

          svg.append("circle")
            .attr("r", innerRadius)
            .classed("center-circle", true);
          
          d3.csv(true, function(error, data) {
            data = data3;
            var cats = data.map(function(d, i) {
              return d.category_label;
            });

    function getfleme(name){
        var z=[];
        a.forEach(function(d){
            var x = d.heading;
            d.subsections.forEach(function(d,i){
                var y = d.heading;
                d.entries.forEach(function(d,i){
                    if(name == x){
                        z.push(d.name)
                    }
                    
                })
            })
        })
        var temp = {Start:z[0], end:z[z.length-1]}
        j.push(temp);

    }

    function setstrang(){
      j.forEach(function(d,i){var name = d.Start;data3.filter(function(val){if(val.question_label == name){k.push(val)}})})
      j.forEach(function(d,i){var name = d.end;data3.filter(function(val){if(val.question_label == name){l.push(val)}})})
    }
a.forEach(function(d,i){
    getfleme(d.heading)
})
setstrang()

            var catCounts = {};
            for (var i = 0; i < cats.length; i++) {
              var num = cats[i];
              catCounts[num] = catCounts[num] ? catCounts[num] + 1 : 1;
            }

            cats = cats.filter(function(v, i) {
              return cats.indexOf(v) == i;
            });
            var numCatBars = cats.length;

            var angle = 0,
              rotate = 0;

            data.forEach(function(d, i) {
              d.startAngle = angle;
              angle += (2 * Math.PI) / numCatBars / catCounts[d.category_label];
              d.endAngle = angle;

              d.rotate = rotate;
              rotate += 360 / numCatBars / catCounts[d.category_label];
            });

            var arc_category_label = d3.svg.arc()
              .startAngle(function(d, i) {
                return (i * 2 * Math.PI) / numCatBars;
              })
              .endAngle(function(d, i) {
                return ((i + 1) * 2 * Math.PI) / numCatBars;
              })
              .innerRadius(maxBarHeight + 40)
              .outerRadius(maxBarHeight + 64);

            var category_text = svg.selectAll("path.category_label_arc")
              .data(cats)
              .enter().append("path")
              .classed("category-label-arc", true)
              .attr("id", function(d, i) {
                return "category_label_" + i;
              })
              .attr("fill", "none")
              .attr("d", arc_category_label);

            category_text.each(function(d, i) {
              var firstArcSection = /(^.+?)L/;

              var newArc = firstArcSection.exec(d3.select(this).attr("d"))[1];
              newArc = newArc.replace(/,/g, " ");

              var startAngle = (i * 2 * Math.PI) / numCatBars,
                endAngle = ((i + 1) * 2 * Math.PI) / numCatBars;

              if (startAngle > Math.PI / 2 && startAngle < 3 * Math.PI / 2 && endAngle > Math.PI / 2 && endAngle < 3 * Math.PI / 2) {
                var startLoc = /M(.*?)A/, 
                  middleLoc = /A(.*?)0 0 1/, 
                  endLoc = /0 0 1 (.*?)$/; 
                var newStart = endLoc.exec(newArc)[1];
                var newEnd = startLoc.exec(newArc)[1];
                var middleSec = middleLoc.exec(newArc)[1];


                newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
              } 

              d3.select(this).attr("d", newArc);
            });

            svg.selectAll(".category-label-text")
              .data(cats)
              .enter().append("text")
              .attr("class", "category-label-text")
              .attr("dy", function(d, i) {
                var startAngle = (i * 2 * Math.PI) / numCatBars,
                  endAngle = ((i + 1) * 2 * Math.PI) / numCatBars;
                return (startAngle > Math.PI / 2 && startAngle < 3 * Math.PI / 2 && endAngle > Math.PI / 2 && endAngle < 3 * Math.PI / 2 ? -4 : 14);
              })
              .append("textPath")
              .attr("startOffset", "50%")
              .style("text-anchor", "middle")
              .attr("xlink:href", function(d, i) {
                return "#category_label_" + i;
              })
              .text(function(d) {
                return d;
              });

            var arc_question_label = d3.svg.arc()
              .startAngle(function(d, i) {
                return d.startAngle;
              })
              .endAngle(function(d, i) {
                return d.endAngle;
              })
              .outerRadius(maxBarHeight + 2);

            var question_text = svg.selectAll("path.question_label_arc")
              .data(data)
              .enter().append("path")
              .classed("question-label-arc", true)
              .attr("id", function(d, i) {
                return "question_label_" + i;
              }) 
              .attr("fill", "none")
              .attr("d", arc_question_label);

            question_text.each(function(d, i) {
              var firstArcSection = /(^.+?)L/;

              var newArc = firstArcSection.exec(d3.select(this).attr("d"))[1];
              newArc = newArc.replace(/,/g, " ");

              if (d.startAngle > Math.PI / 2 && d.startAngle < 3 * Math.PI / 2 && d.endAngle > Math.PI / 2 && d.endAngle < 3 * Math.PI / 2) {
                var startLoc = /M(.*?)A/, 
                  middleLoc = /A(.*?)0 0 1/, 
                  endLoc = /0 0 1 (.*?)$/; 
                var newStart = endLoc.exec(newArc)[1];
                var newEnd = startLoc.exec(newArc)[1];
                var middleSec = middleLoc.exec(newArc)[1];

                newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
              }
              d3.select(this).attr("d", newArc);
            });

            question_text = svg.selectAll(".question-label-text")
              .data(data)
              .enter().append("text")
              .attr("class", "question-label-text")
              .append("textPath")
              .style('font-size', '7px')
              .style('font-family', 'sans-serif')
              .attr("xlink:href", function(d, i) {
                return "#question_label_" + i;
              })
              .text(function(d) {
                return d.question_label.toUpperCase();
              })
              .call(wrapTextOnArc, maxBarHeight);

            question_text.each(function(d, i) {
              var textPath = d3.select(this)[0][0],
                tspanCount = textPath.childNodes.length;

              if (d.startAngle > Math.PI / 2 && d.startAngle < 3 * Math.PI / 2 && d.endAngle > Math.PI / 2 && d.endAngle < 3 * Math.PI / 2) {
                d3.select(textPath.childNodes[0]).attr("dy", 3 + (tspanCount - 1) * -0.6 + 'em');
              } else {
                d3.select(textPath.childNodes[0]).attr("dy", -2.1 + (tspanCount - 1) * -0.6 + 'em');
              }
            });

            var arc = d3.svg.arc()
              .startAngle(function(d, i) {
                return d.startAngle;
              })
              .endAngle(function(d, i) {
                return d.endAngle;
              })
              .innerRadius(innerRadius);

            var bars = svg.selectAll("path.bar")
              .data(data)
              .enter().append("path")
              .classed("bars", true)
              .style('fill', function (d,i){if(data[i].color){return data[i].color} else{return colarry[2]}}) //booyeah
              .each(function(d) {
                d.outerRadius = innerRadius;
              })
              .attr("d", arc);
              
            bars.transition().ease("elastic").duration(1000).delay(function(d, i) {
                return i * 100;
              })
              .attrTween("d", function(d, index) {
                var i = d3.interpolate(d.outerRadius, x_scale(+d.value));
                return function(t) {
                  d.outerRadius = i(t);
                  return arc(d, index);
                };
              });

            var x_scale = d3.scale.linear()
              .domain([0, 100])
              .range([innerRadius, maxBarHeight]);


            var y_scale = d3.scale.linear()
              .domain([0, 100])
              .range([-innerRadius, -maxBarHeight]);

            svg.selectAll("circle.x.minor")
              .data(y_scale.ticks(10))
              .enter().append("circle")
              .classed("gridlines minor", true)
              .attr("r", function(d) {
                return x_scale(d);
              });

            svg.selectAll("line.y.minor")
              .data(data)
              .enter().append("line")
              .classed("gridlines minor", true)
              .attr("y1", -innerRadius)
              .attr("y2", -maxBarHeight - 40)
              .attr("transform", function(d, i) {
                return "rotate(" + (d.rotate) + ")";
              });

            svg.selectAll("line.y.major")
              .data(cats)
              .enter().append("line")
              .classed("gridlines major", true)
              .attr("y1", -innerRadius)
              .attr("y2", -maxBarHeight - 70)
              .attr("transform", function(d, i) {
                return "rotate(" + (i * 360 / numCatBars) + ")";
              });
          });
        }

        function wrapTextOnArc(text, radius) {

          var temporaryText = d3.select('svg')
            .append("text")
            .attr("class", "temporary-text") 
            .style("font", "7px sans-serif")
            .style("opacity", 0); 

          var getTextLength = function(string) {
            temporaryText.text(string);
            return temporaryText.node().getComputedTextLength();
          };

          text.each(function(d) {
            var text = d3.select(this),
              words = text.text().split(/[ \f\n\r\t\v]+/).reverse(), 
              word,
              wordCount = words.length,
              line = [],
              textLength,
              lineHeight = 1.1, 
              x = 0,
              y = 0,
              dy = 0,
              tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em"),
              arcLength = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * (2 * Math.PI * radius),
              paddedArcLength = arcLength - 16;

            while (word = words.pop()) {
              line.push(word);
              tspan.text(line.join(" "));
              textLength = getTextLength(tspan.text());
              tspan.attr("x", (arcLength - textLength) / 2);

              if (textLength > paddedArcLength && line.length > 1) {
                line.pop();
                tspan.text(line.join(" "));
                textLength = getTextLength(tspan.text());
                tspan.attr("x", (arcLength - textLength) / 2);

                line = [word];
                tspan = text.append("tspan").attr("dy", lineHeight + dy + "em").text(word);
                textLength = getTextLength(tspan.text());
                tspan.attr("x", (arcLength - textLength) / 2);
              }
            }
          });

          d3.selectAll("text.temporary-text").remove()
          


          k.forEach(function(d,i){ax.push(d.startAngle)});
          l.forEach(function(d,i){ay.push(d.endAngle)});
          function angdata(){
            ax.forEach(function(d,i){
              var x = {startAngle: d, endAngle:ay[i]}
              angdatax.push(x)
            })
          }
          angdata();

          a.forEach(function(d,i){ var x = d.colour; headcolor.push(x)})
          a.forEach(function(d,i){headnames.push(d.heading)})

          data = angdatax;
          var innerRadius = 300;

data = angdatax;

var colarry = headcolor;
var svg = d3.select('svg')
            .append('g')
            .attr('transform', 'translate(450, 450)')
            .attr('class', 'pie')

var arc = d3.svg.arc().outerRadius(350)
            .innerRadius(innerRadius)
            .padAngle(.02);
            
svg.selectAll('path.arc')
    .data(data)
    .enter()
      .append('path')
      .attr('class', 'arc')
      .attr('fill', function(d,i){return colarry[i]})
      .attr("id", function(d,i) { return "monthArc_"+i; })
      .attr('d', function(d,i){return arc(d,i)})
      .each(function(d,i){
        var frarcsec = /(^.+?)L/;
        var newarc = frarcsec.exec(d3.select(this).attr('d'))[1];
        newarc = newarc.replace(/,/g," ");
        svg.append('path')
        .attr('class', 'hidden')
        .attr("id", "donutArc"+i)
        .attr('d', newarc)
        .style('fill', 'none')
      });

svg.selectAll('text-set')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'text-class')
    .attr('dy', -13)
    .attr('font-size','2rem')
    .append("textPath")
    .attr('startOffset','35%')
    .attr("xlink:href",function(d,i){return "#donutArc"+i;})
    .attr('text-ancor', 'middle')
    .text(function(d,i){return headnames[i]})
        }

draw();



