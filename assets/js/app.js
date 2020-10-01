
// Function to Reponsive Chart
function makeResponsive() {
  
  // replace SVG area when the browser loads with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  // clear svg if not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }
  // SVG Setup

  // svg container
  var svgWidth = window.innerWidth;;
  var svgHeight = window.innerHeight;

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
  var chartGroup = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Read In Data from CSV

  // Import Data
  d3.csv("assets/data/data.csv")
    .then(function (censusData) {
      // console.log(censusData);
      censusData.forEach(function (data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
      });

      // Scale Functions
      var xLinearScale = d3
        .scaleLinear()
        .domain([8, d3.max(censusData, (d) => d.poverty * 1.2)])
        .range([0, width]);

      var yLinearScale = d3
        .scaleLinear()
        .domain([2, d3.max(censusData, (d) => d.healthcare * 1.2)])
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
        .enter();

      // creating the circles
      circlesGroup
        .append("circle")
        .attr("cx", (d) => xLinearScale(d.poverty))
        .attr("cy", (d) => yLinearScale(d.healthcare))
        .attr("r", "15")
        .attr("fill", "blue")
        .attr("opacity", ".5");

      // creating the text for the circles
      circlesGroup
        .append("text")
        .text(function (d) {
          return d.abbr;
        })
        .attr("dx", (d) => xLinearScale(d.poverty))
        .attr("dy", (d) => yLinearScale(d.healthcare))
        .attr("font-size", "9")
        .attr("class", "stateText")
        // Mouseover event
        .on("mouseover", function (data) {
          toolTip.show(data, this);
        })
        // Mouseout event
        .on("mouseout", function (data, index) {
          toolTip.hide(data);
        });

      // Create toolTip
      var toolTip = d3
        .tip()
        .attr("class", "d3-tip")
        .offset([10, 30])
        .html(function (d) {
          return `<strong>${d.state}</strong><br>Poverty Rate: ${d.poverty}<br>No Healthcare Rate: ${d.healthcare}`;
        });

      // Call toolTip in the chart
      chartGroup.call(toolTip);

      // Create axes labels
      chartGroup
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - height / 2)
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("No Healthcare (%)");

      chartGroup
        .append("text")
        .attr(
          "transform",
          `translate(${width / 2}, ${height + margin.top + 30})`
        )
        .attr("class", "axisText")
        .text("Poverty (%)");
    })
    .catch(function (error) {
      console.log(error);
    });
}
// When the browser loads
makeResponsive();

// When the browser window is resized
d3.select(window).on("resize", makeResponsive);
