// @TODO: YOUR CODE HERE!
var svgWidth = 700;
var svgHeight = 450;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var data_url = "/assets/data/data.csv";
d3.csv(data_url).then(successHandle, errorHandle);

function errorHandle(error) {
  throw err;
}

function successHandle(data) {
  //   var data = [data];
  console.log(data);

  data.forEach(function(d) {
    // d.poverty = +data.poverty;
    // d.healthcare = +data.healthcare;
    console.log(d.state);
  });

  // Step 2: Create scale functions
  // ==============================
  var xLinearScale = d3
    .scaleLinear()
    .domain([8, 22])
    .range([0, width]);

  var yLinearScale = d3
    .scaleLinear()
    .domain([3, 26])
    .range([height, 0]);

  // Step 3: Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  // ==============================
  chartGroup
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g").call(leftAxis);

  // Step 5: Create Circles
  // ==============================
  var circlesGroup = chartGroup
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".5");

  var textGroup = chartGroup
    .selectAll("p")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.poverty) - 11)
    .attr("y", d => yLinearScale(d.healthcare) + 5)
    .style("fill", "white");

  // Create axes labels
  chartGroup
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthcare %");

  chartGroup
    .append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty %");
}