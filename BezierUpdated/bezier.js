/* MoMath Math Square Behavior
 *
 *        Title: Bezier
 *  Description: Animates drawing of Bexier curve using user positions as control points
 * Scheduler ID: 
 *    Framework: P5
 *       Author: Micah Lorenz, Henry Zhou
 *      Created: 2018-07-14
 *       Status: works
 */
 
 
var curves = [];
var controlPoints = [];
var sideLength = 1152;
var colors = ['black','blue','green','red'];
var colorIndex = 0;
function setup() {
	createCanvas(sideLength,sideLength);
	
	//frameRate(10000);
	subframe = 0;
	resolution = 2000;
	mode = 0;
	controlPoints = generateControlPoints();
	/*
	p1 = {x:100 * random(), y:100 * random(), assigned:0};
	p2 = {x:200 * random(), y:200 * random(), assigned:0};
	p3 = {x:300 * random(), y:300 * random(), assigned:0};
	p4 = {x:400 * random(), y:400 * random(), assigned:0};

	controlPoints = [p1, p2, p3, p4];
	*/
	blueCurve = [];
	line1 = {
		start:controlPoints[0],
		end:controlPoints[1]
	};
	line2 = {
		start:controlPoints[1],
		end:controlPoints[2]
	};
	line3 = {
		start:controlPoints[2],
		end:controlPoints[3]
	};
	noFill();
  // put setup code here
}

function generateControlPoints()
{
	var length = Math.floor(Math.random() * 10) + 4;
	output = []; 
	var divisions = sideLength / (length + 1);
	for(i = 0; i < length; i++)
	{
		output.push({x:divisions * (i + 1) * random(), y:divisions * (i + 1) * random(), assigned:0});
	}
	return output;
}

function weightMidpoint(point1, point2, percent)
{
	var result = {x:(point1.x * (1 - percent) + point2.x * (percent)), y:(point1.y * (1 - percent) + point2.y * (percent))};
	return result;
}

function cascade(pointSet, percent)
{
	if(pointSet.length == 1)
	{
		return pointSet;
	}
	if(pointSet.length == 2)
	{
		return [[weightMidpoint(pointSet[0], pointSet[1], percent)]];
	}
	var smallerSet = [];
	for(i = 0; i < pointSet.length - 1; i++)
	{
		smallerSet.push(weightMidpoint(pointSet[i], pointSet[i + 1], percent));
	}
	var output = cascade(smallerSet, percent);
	output.push(smallerSet);
	return output;
}

function mousePressed()
{
	mode = 1;
	subframe = resolution + 1;
	mousePoint = {x:mouseX, y: mouseY};
	var closestDist = sideLength * 2;
	var closePoint = 0;
	/*
	switch(mouseButton) {
		case LEFT: //Add Point
			
			break; //Remove Point
		case RIGHT:
			break;
		case CENTER: //Start New Curve

			break;

	}
	*/
	for(i = 0; i < controlPoints.length; i = i + 1)
	{
		if(distance(mousePoint, controlPoints[i]) < closestDist)
		{
			closePoint = i;
			closestDist = distance(mousePoint, controlPoints[i]);
		}
	}
	controlPoints[closePoint] = mousePoint;
}

function distance(point1, point2)
{
	return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y,2));
}

function drawPath(pointSet)
{
	//stroke(colors[colorIndex % colors.length]);
	if(pointSet.length > 1)
	{
		for(i = 0; i < pointSet.length - 1; i++)
		{
			line(pointSet[i].x,pointSet[i].y,pointSet[i+1].x,pointSet[i+1].y);
		}
	}
}

function nextColor()
{
	//stroke(colors[colorIndex % colors.length]);
	stroke(floor(255 * Math.sin(colorIndex)), floor(255 * Math.sin(2 * colorIndex)), floor(255 * Math.sin(3 * colorIndex)));
	//colorIndex = (colorIndex + 1) % colors.length;
	colorIndex = (colorIndex + 1);
}

function draw() {
	clear();
	background('black');
	stroke(0, 0, 0);
	//fill('black');
	colorIndex = 0.5;
	nextColor();
	//stroke(colors[colorIndex % colors.length]);
	//colorIndex = (colorIndex + 1) % colors.length;
	var framePoints = cascade(controlPoints, subframe * 5 / resolution);	
	for(i = 0; i < controlPoints.length; i++)
	{
		ellipse(controlPoints[i].x, controlPoints[i].y, 4, 4);
		if(i < controlPoints.length - 1)
		{
			line(controlPoints[i].x,controlPoints[i].y,controlPoints[i+1].x,controlPoints[i+1].y)
		}
	}
	nextColor();
	stroke(128);
	strokeWeight(2);
	noFill()
	for(i = 0; i < framePoints.length; i++)
	{
		//var pointSet = framePoints[i];
		drawPath(framePoints[i]);
		nextColor();
		//stroke(colors[colorIndex % colors.length]);
		//colorIndex = (colorIndex + 1) % colors.length;
	}
	
	/*
	ellipse(controlPoints[0].x, controlPoints[0].y, 4, 4);
	ellipse(controlPoints[1].x, controlPoints[1].y, 1, 1);
	ellipse(controlPoints[2].x, controlPoints[2].y, 1, 1);
	ellipse(controlPoints[3].x, controlPoints[3].y, 4, 4);
	*/
	/*
	stroke(128);
	
	line(line1.start.x, line1.start.y, line1.end.x, line1.end.y);
	line(line2.start.x, line2.start.y, line2.end.x, line2.end.y);
	line(line3.start.x, line3.start.y, line3.end.x, line3.end.y);
	;
	
	//bezier(x1, y1, x2, y2, x3, y3, x4, y4);
	//stroke(0,255,0);
	nextColor();
	
	mid1 = weightMidpoint(line1.start, line1.end, subframe * 5 / resolution);
	mid2 = weightMidpoint(line2.start, line2.end, subframe * 5 / resolution);
	line(mid1.x, mid1.y, mid2.x, mid2.y);
	mid3 = weightMidpoint(line2.start, line2.end, subframe * 5 / resolution);
	mid4 = weightMidpoint(line3.start, line3.end, subframe * 5 / resolution);
	line(mid3.x, mid3.y, mid4.x, mid4.y);
	
	//stroke(255, 0, 0);
	nextColor();
	mid5 = weightMidpoint(mid1, mid2, subframe * 5 / resolution);
	mid6 = weightMidpoint(mid3, mid4, subframe * 5 / resolution);
	line(mid5.x, mid5.y, mid6.x, mid6.y);
	//stroke(0, 0, 255);
	nextColor();
	*/
	/*
	for(i = 0;  i < 5; i = i + 1)
	{
		framePoints = cascade(controlPoints, i + subframe * 5 / resolution);
		//point = {x:bezierPoint(controlPoints[0].x, controlPoints[1].x, controlPoints[2].x, controlPoints[3].x, (i + (subframe * 5)) / resolution),y:bezierPoint(controlPoints[0].y, controlPoints[1].y, controlPoints[2].y, controlPoints[3].y, (i + (subframe * 5)) / resolution)};
		point = framePoints[0][0];
		blueCurve.push(point);
		//ellipse(x, y, 1, 1);
	}
	*/
	
	/*
	for(i = 0; i < blueCurve.length - 1; i = i + 1)
	{
		line(blueCurve[i].x,blueCurve[i].y,blueCurve[i+1].x,blueCurve[i+1].y);
		//ellipse(blueCurve[i].x,blueCurve[i].y, 1, 1);
	}
	*/
	point = framePoints[0][0];
	blueCurve.push(point);
	drawPath(blueCurve);

	subframe = subframe + 1;
	
	if(subframe >= (resolution / 5))
	{
		subframe = 0;
		if(mode == 0)
		{
			controlPoints = generateControlPoints();
			/*
			var length = Math.floor(Math.random() * 10) + 4;
			controlPoints = []; 
			var divisions = sideLength / (length + 1);
			for(i = 0; i < length; i++)
			{
				controlPoints.push({x:divisions * i * random(), y:divisions * i * random(), assigned:0});
			}
			/*
			*/
			
			/*
			p1 = {x:100 * random(), y:100 * random(), assigned:0};
			p2 = {x:200 * random(), y:200 * random(), assigned:0};
			p3 = {x:300 * random(), y:300 * random(), assigned:0};
			p4 = {x:400 * random(), y:400 * random(), assigned:0};
			controlPoints = [p1, p2, p3, p4];
			*/
		}
		/*
		*/
		line1 = {
			start:controlPoints[0],
			end:controlPoints[1]
		};
		line2 = {
			start:controlPoints[1],
			end:controlPoints[2]
		};
		line3 = {
			start:controlPoints[2],
			end:controlPoints[3]
		};
		blueCurve = [];
		/*
		*/
	}
	
  // put drawing code here
}
