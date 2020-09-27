
// Define Functions


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


var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// svg wrapper
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// append svg group
var chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Read In Data from CSV

// Initial Params - includes any axis selection that has multiple options
// var chosenXAxis = "poverty";


// Retrieve data from the CSV file and execute everything below
d3.csv("./data.csv").then(function(demoData, err) {
  if (err) throw err;
   
  // parse data - set values to numerical data types
  demoData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    
   console.log(demoData);
  });
