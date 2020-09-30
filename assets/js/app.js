
// SVG Setup

// svg container
var svgWidth = 960;
var svgHeight = 500;

// margins
var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100,
};

// adjust container considering margins
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// svg wrapper
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// append svg group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Read In Data from CSV

// Import Data
d3.csv("assets/data/data.csv").then(function(censusData) {
  // console.log(censusData);
  censusData.forEach(function (data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

  // Scale Functions
  var xLinearScale = d3
    .scaleLinear()
    .domain([8, d3.max(censusData, (d) => d.poverty) + 2])
    .range([0, width]);

  var yLinearScale = d3
    .scaleLinear()
    .domain([2, d3.max(censusData, (d) => d.healthcare) + 2])
    .range([height, 0]);

  // Axis Functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Append Axes Using Functions
  chartGroup
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g").call(leftAxis);

  // Create circlesGroup
  var circlesGroup = chartGroup
    .selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", (d) => xLinearScale(d.poverty))
    .attr("cy", (d) => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");

  // Create toolTip
  var toolTip = d3
    .tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return `${d.abbr}`;
    });
}).catch(function(error) {
    console.log(error);
  });

// ​

// ​
//     // Step 7: Create tooltip in the chart
//     // ==============================
//     chartGroup.call(toolTip);
// ​
//     // Step 8: Create event listeners to display and hide the tooltip
//     // ==============================
//     circlesGroup.on("click", function(data) {
//       toolTip.show(data, this);
//     })
//       // onmouseout event
//       .on("mouseout", function(data, index) {
//         toolTip.hide(data);
//       });
// ​
//     // Create axes labels
//     chartGroup.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left + 40)
//       .attr("x", 0 - (height / 2))
//       .attr("dy", "1em")
//       .attr("class", "axisText")
//       .text("Number of Billboard 100 Hits");
// ​
//     chartGroup.append("text")
//       .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//       .attr("class", "axisText")
//       .text("Hair Metal Band Hair Length (inches)");