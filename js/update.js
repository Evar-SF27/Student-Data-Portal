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
//    var dataPath = [
//       [1,1], [12,20], [24,36],
//       [32, 50], [40, 70], [50, 100],
//       [55, 106], [65, 123], [73, 130],
//       [78, 134], [83, 136], [89, 138],
//       [100, 140]
//   ]

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
                       .range([margin.right, width - margin.right])
   // const dataScale = d3.scaleLinear().range([0, width - margin.right]).domain(data.map((d) => d.x))
   const line = d3.line()
                  .x(d => dataScale(d[0]))
                  .y(d => yScale(d[1]))
                  .curve(d3.curveMonotoneX)

   svg.append("g")
      .selectAll(".circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("class", "circle")
      .attr("cx", (d) => margin.left + xScale(d.year))
      .attr("cy", (d) => (height - margin.bottom) - yScale(d.number))

   svg.append("path")
      .data(dataPath)
      .attr("class", "line")
      .attr("d", line)
      .style("stroke", "red")
}

function createPieChart(svgSelector, data) {
   const pie = d3.pie()
                 .value(d => d.number)
               //   .sort((a,b) => d3.ascending(a.number, b.number))

   const arcData = pie(data)  
   const arc = d3.arc()
                 .innerRadius(50)
                 .outerRadius(200)
                 .padAngle(2)
                 .padRadius(2)

   const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

   const svg = d3.select(svgSelector)
                 .append("svg")
                 .attr("width", width)
                 .attr("height", height)
                 .attr("transform", "translate(" + 200 + "," + 50 + ")")

   const g = svg.selectAll("path.slice")
                .data(arcData)
                .enter()
                .append("g")
                .attr("transform", "translate(200, 250)")

   g.append("path")
    .attr("class", "slice")
    .attr("d", arc)
    .style("fill", (d,i) => colorScale(i))
                

   const legend = svg.append("g")
                     .attr("transform", "translate(450, 50)")
   
   legend.selectAll("g")
         .data(arcData)
         .enter()
         .append("rect")
         .attr("y", d => 10 * d.index * 1.8)
         .attr('width', 10)
         .attr('height', 10)
         .attr('fill', d => colorScale(d.index))
         .attr('stroke', 'grey')
         .style('stroke-width', '1px')

   legend.selectAll("g")
         .data(arcData)
         .enter()
         .append("text")
         .text(d => d.data.subject)
         .attr("x", 15 * 1.2)
         .attr("y", d => 10 * d.index * 1.8 + 10)
         .style('font-family', 'sans-serif')
         .style('font-size', '12px')

}

function update() {
   createPieChart(".subject-pie", layoutPercentage(data))
   createBarChart(".subject-number", layoutSubject(data))
   createBarChart(".subject-mean", layoutMean(data))
   createLineChart(".subject-year", layoutYear(data))
}