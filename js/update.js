const width = config.width - margin.left - margin.right
const height = config.height - margin.top - margin.bottom

function createBarChart(svgSelector, data) {
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
                  .attr("transform", "translate(" + 30 + "," + 30 + ")")

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

function createLineChart(svgSelector, dataset) {
   data = dataset[0].data
   dataPath = dataset[0].dataPath

   const xScale = d3.scaleBand()
                     .range([0, width - margin.right])
                     .padding(1)
                     .domain(data.map((d) => d.year))

    const yScale = d3.scaleLinear()
                     .range([0, height - 30])
                     .domain([d3.max(data, (d) => d.number) + 20, 0])

    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale).ticks("10")

    const svg = d3.select(svgSelector)
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height)
                  .attr("transform", "translate(" + 150 + "," + 30 + ")")

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

   const dataScale = d3.scaleLinear()
                       .domain(d3.extent(d3.merge(dataPath), d => d[0]))
                       .range([margin, width - margin])
   // const dataScale = d3.scaleLinear().range([0, width - margin.right]).domain(data.map((d) => d.x))
   const line = d3.line()
                  .x(d => dataScale(d[0]))
                  .y(d => yScale(d.number))

     svg.append("g")
        .selectAll(".circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("class", "bar")
        .attr("cx", (d) => margin.left + xScale(d.year))
        .attr("cy", (d) => (height - margin.bottom) - yScale(d.number))

      svg.append("g")
         .selectAll(".dataset")
         .data(data)
         .join("path") 
         .attr("class", "dataset")
         .attr("d", line)
         .style("stroke", "red")
}

function update() {
   createBarChart(".subject-number", layoutSubject(data))
   createBarChart(".subject-mean", layoutMean(data))
   createLineChart(".subject-year", layoutYear(data))
}