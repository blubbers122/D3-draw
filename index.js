var drawing = false
var lines = []
var oppLines = []
var points = []
var oppPoints = []
var thickness = 5
var color = "#000000"
var canvasHeight = 600;
var canvasWidth = 800;

canvas = d3.select("svg")

body = d3.select("body")

body.on("mouseup", () => {
  drawing = false
})

canvas.on("mousemove", function() {
  if (!drawing) {
    return
  }
  const coords = d3.mouse(this)
  draw(coords[0], coords[1], true)
})

canvas.on("mousedown", function() {
  drawing = true
  const coords = d3.mouse(this)
  draw(coords[0], coords[1], false)
})

canvas.on("mouseup", () => {
  drawing = false
})

function clearCanvas() {
  points.forEach(point => {
    point.remove()
  });
  oppPoints.forEach(point => {
    point.remove()
  });
  lines.forEach(line => {
    line.remove()
  });
  oppLines.forEach(line => {
    line.remove()
  });
  points = [];
  oppPoints = []
  lines = [];
  oppLines = []
}

function updateThickness(newThickness) {
  thickness = newThickness
}

function updateColor(newColor, mode) {
  var hexValue = (newColor * 256**2).toString(16).slice(0,2)
  color = color.slice(1)
  if (mode == "r") {
    color = "#" + hexValue + color.slice(2,6)
  }
  else if (mode == "g") {
    color = "#" + color.slice(0,2) + hexValue + color.slice(4,6)
  }
  else if (mode == "b") {
    color = "#" + color.slice(0,4) + hexValue
  }
  else {
    color = newColor
  }
  hexDisplay = document.querySelector("#hex-input")
  hexDisplay.value = color
}

function draw(x, y, connect) {
  if (connect) {
    var lastPoint = points[points.length - 1];
    const line = canvas.append("line")
                        .attr("x1", lastPoint.attr("cx"))
                        .attr("y1", lastPoint.attr("cy"))
                        .attr("x2", canvasWidth - x)
                        .attr("y2", canvasHeight - y)
                        .style("stroke", color)
                        .style("stroke-width", thickness * 2)
    lines.push(line)

    lastPoint = oppPoints[oppPoints.length - 1]
    const oppLine = canvas.append("line")
                        .attr("x1", lastPoint.attr("cx"))
                        .attr("y1", lastPoint.attr("cy"))
                        .attr("x2", x)
                        .attr("y2", y)
                        .style("stroke", color)
                        .style("stroke-width", thickness * 2)
    oppLines.push(oppLine)
  }
  var point = canvas.append("circle")
                      .attr("cx", canvasWidth - x)
                      .attr("cy", canvasHeight - y)
                      .attr("r", thickness)
                      .style("fill", color)
  points.push(point)

  const oppPoint = canvas.append("circle")
                      .attr("cx", x)
                      .attr("cy", y)
                      .attr("r", thickness)
                      .style("fill", color)
  oppPoints.push(oppPoint)
}
