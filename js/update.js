function createBarChart(svgSelector, data) {
    const width = config.width - margin.left - margin.right
    const height = config.height - margin.top - margin.bottom

    const xScale = d3.scaleBand()
                     .range([0, width - margin.right])
                     .padding(0.1)
                     .domain(data.map((d) => d.subject))

    const yScale = d3.scaleLinear()
                     .range([0, height - 30])
                     .domain([d3.max(data, (d) => d.number) + 20, 0])

    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale).ticks("10")

    const svg = d3.select(svgSelector)
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height)
                  .attr("transform", "translate(" + 10 + "," + 30 + ")")

    svg.append("g")
       .attr("class", "x-axis")
       .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
       .call(xAxis)

    svg.append("g")
       .attr("class", "y-axis")
       .attr("transform", `translate(${margin.left}, ${margin.top})`)
       .call(yAxis)
       .append("text")
       .attr("y", 6)
       .attr("dy", "0.41rem")
       .attr("text-anchor", "end")
       .text("value")

     svg.append("g")
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => margin.left + xScale(d.subject))
        .attr("y", (d) => yScale(d.number))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => (height - margin.bottom) - yScale(d.number))
}

function update() {
    createBarChart(".subject-number", layoutSubject(data))
    createBarChart(".subject-mean", layoutMean(data))
    // console.log(layoutMean(data))
}