function drawBarGraph(data,title) {
   //empty the div
  
   var width = 800,
      height = 260;
    var max = d3.max(data,function(d){return d.metric;}),
      min = d3.min(data,function(d){return d.metric;});

    var barWidth = width / data.length,
      barPadding = 2;

    
    var yS = d3.scale.linear()
          .domain([min,max])
          .range([height - 60,0]);

    var chart = d3.select('#graph')
            .append('svg')
            .attr('width',width)
            .attr('height',height + 100);
    //Title           
    chart.append("text")
        .attr("x", width / 4)             
        .attr("y", height / 4)
        .attr("text-anchor", "middle")
        .attr('fill','#777')  
        .style("font-size", "32px") 
        .text(title);

    var bar = chart.selectAll("g")
          .data(data)
        .enter()
        .append("g")
          .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

  bar.append("rect")
        .attr("width", barWidth - 1)
        .attr('fill',"#e7e7e7")
        .attr('height',0)
        .attr('y',height)
       .transition()
        .delay(function(d, i) { return i * 100; })
        .duration(500)
        .attr("y", function(d) { return yS(d.metric); })
        .attr("height", function(d) { return height - yS(d.metric); })

   //metric Labeling
   bar.append("text")
      .attr("x", barWidth / 2)
      .attr("y", function(d) { return yS(d.metric) + 20; })
      .attr('fill','white')
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text(function(d) { return d.metric; });

      //Place Labeling
      bar.append("text")
      .attr("x", barWidth / 2)
      .attr("y", function(d) { return height - 10; })
      .attr('fill','#777')
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text(function(d,i) { return data.length - i });

    // Team Labeling
    bar.append("text")
      .attr("x", barWidth / 2)
      .attr("y", function(d){return 310 ;})
      .attr('fill','#777')
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style('writing-mode', 'tb')
      .text(function(d){return d.name});
}

function DrawMetricVPosition(goal_type){
  var width = 800,
      height = 400;
  
  var padding = 80;

  var ymax = d3.max(data,function(d){return d.place;}),
      ymin = d3.min(data,function(d){return d.place;});

  var xmax = d3.max(data,function(d){return d.goals;}),
      xmin = d3.min(data,function(d){return d.goals;});

  var yS = d3.scale.linear()
            .domain([ymin,ymax])
            .range([padding,height - padding]);

  var xS = d3.scale.linear()
            .domain([xmin,xmax])
            .range([padding,width - padding]);

  var xAxis = d3.svg.axis()
                  .scale(xS)
                  .orient("bottom");

  var yAxis = d3.svg.axis()
            .scale(yS)
            .orient("left");

  var chart = d3.select('#graph')
              .append("svg")
              .attr("width", width)
              .attr("height", height);
  
  var dot = chart.selectAll("g")
          .data(data)
          .enter()
          .append("g")
          .attr("transform",function(d){
            return "translate("+xS(d.goals)+"," +yS(d.place)+")"})
   //Circle
  dot.append("circle")
   .transition()
   .delay(function(d, i) { return i * 200; })
   .duration(1000)
   .attr("r", 7)
   .attr("fill","#f1c40f");

  
  //Team Names
  dot.append("text")
  .transition()
   .delay(function(d, i) { return i * 200; })
   .duration(1000)
      .text(function(d) {
        return d.team;
   })
      .attr("y", "20")
   .attr("fill","#73B1DB")
   .attr("text-anchor", "middle");

    chart.append("g")
    .attr("transform", "translate(0," + (height - 60) + ")")
    .attr("fill","#f1c40f")
    .call(xAxis);

    chart.append("g")
    .attr("transform", "translate(60," + 0 + ")")
    .attr("fill","#f1c40f")
    .call(yAxis);
    
    //x label
    chart.append('text')
      .text("Goals Scored")
      .attr("x",850)
      .attr("y",330)
      .attr("fill","#73B1DB")
      .attr("font-size","32px");
    // y label
    chart.append('text')
      .text("Place")
      .attr("x",75)
      .attr("y",80)
      .attr("fill","#73B1DB")
      .attr("font-size","32px")
      .style('writing-mode', 'tb');
}