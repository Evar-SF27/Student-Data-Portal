function createBarChart(svgSelector, data) {
    console.log("BarChart")
    console.log(data)
    const width = config.width - margin.left - margin.right
    const height = config.height - margin.top - margin.bottom

    var xScale = d3.scaleBand()
                   .range([0, width])
                   .padding(0.1)
                   .domain(data.map((d) => { d.subject }))

    var yScale = d3.scaleLinear()
                   .range([0, height])
                   .domain([0, d3.max(data, (d) => d.number)])

    var svg = d3.select(svgSelector).append("svg")
    var g = svg.append("g")
               .attr("transform", "translate(" + 50 + "," + 50 + ")")

    // Forming the axes
    g.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xScale))
    g.append("g")
     .call(d3.axisLeft(yScale).tickFormat((d) => d).ticks(10))
    //  .append("text")
    //  .attr("y", 6)
    //  .attr("dy", "0.71rem")
    //  .attr("text-anchor", "end")
    //  .text("value")

    //  g.selectAll(".bar")
    //   .data(data)
    //   .enter()
    //   .append("rect")
    //   .attr("class", "bar")
    //   .attr("x", (d) => xScale(d.subject))
    //   .attr("y", (d) => yScale(d.number))
    //   .attr("width", xScale.bandwidth())
    //   .attr("height", (d) => height - yScale(d.number))
}

function update() {
    createBarChart(".subject-number", layoutSubject(data))
    // createBarChart()
}