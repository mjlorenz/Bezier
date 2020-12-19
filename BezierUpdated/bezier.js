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
class BezierCurve {
	constructor()
	{
		this.controlPoints = [];
		this.path = [];
		this.nestedPoints = [];
		this.generateControlPoints(Math.floor(Math.random() * 4) + 3);
	}
	generateControlPoints(n)
	{
		//let length = Math.floor(Math.random() * 4) + 3;
		this.controlPoints = [];
		let divisions = sideLength / (n + 1);

		for(let i = 0; i < n; i++)
		{
			this.controlPoints.push([divisions * (i + 1) + divisions * Math.random(), sideLength * Math.random()]);
		}
		return length;
	}
	addPoint(x, y)
	{
		this.controlPoints.push([x, y]);
	}
	removeNearest(x, y)
	{
		if(this.controlPoints.length === 0)
		{
			return false;
		}
		let closestIndex = 0;
		let distance = Math.hypot(this.controlPoints[closestIndex][0] - x, this.controlPoints[closestIndex][1] - y);
		for(let i = 1; i < this.controlPoints.length; i++)
		{
			let trialDist = Math.hypot(this.controlPoints[i][0] - x, this.controlPoints[i][1] - y);
			if(trialDist < distance)
			{
				closestIndex = i;
				distance = trialDistance;
			}
		}
		this.controlPoints.splice(closestIndex, 1);
		return true;
	}
	cascade(percent)
	{
		return this.cascadeEngine(this.controlPoints, percent);
	}
	cascadeEngine(pointSet, percent)
	{
		if(pointSet.length == 1)
		{
			return pointSet;
		}
		if(pointSet.length == 2)
		{
			return [[weightMidpoint(pointSet[0], pointSet[1], percent)]];
		}
		let smallerSet = [];
		for(let i = 0; i < pointSet.length - 1; i++)
		{
			smallerSet.push(weightMidpoint(pointSet[i], pointSet[i + 1], percent));
		}
		var output = this.cascadeEngine(smallerSet, percent);
		output.push(smallerSet);
		return output;
	}
	update(percent)
	{
		this.nestedPoints = this.cascade(percent);
		this.path.push(this.nestedPoints[0][0]);
	}
	recalculate(percent, stepsize)
	{
		let progress = 0;
		while ((progress <= percent) && progress <= 100) {
			this.update(progress);
			progress = progress + stepsize;
		}
	}
	draw(canvas, colorSet)
	{
		let context = canvas.getContext("2d");
		let colorIndex = 0;
		context.strokeStyle = colorSet[colorIndex];
		context.fillStyle = colorSet[colorIndex];
		drawPath(this.controlPoints, context);
		colorIndex = (colorIndex + 1) % colorSet.length;

		for(let i = 0; i < this.nestedPoints.length; i++)
		{
			context.strokeStyle = colorSet[colorIndex];
			context.fillStyle = colorSet[colorIndex];
			drawPath(this.nestedPoints[i], context);
			colorIndex = (colorIndex + 1) % colorSet.length;
		}
		context.strokeStyle = "black";//colorSet[colorIndex];
		context.fillStyle = "black";//colorSet[colorIndex];
		drawPath(this.path, context);
		colorIndex = (colorIndex + 1) % colorSet.length;
	}
} 
 
var curves = [];
var controlPoints = [];
var count = 0;

var colors = ["black","red","green","blue","purple"];
var colorIndex = 0;
var mode;
//var colorOffset = [];
var subframe = 0;
var resolution = 0;
var mode = 0;
var framerate = 30;
var sideLength = 1000;
var canvas = document.getElementById("bezierCanvas");
//ctx = canvas.getContext("2d");


this.start();


function start() {
	
	var bezierTest = new BezierCurve();
	subframe = 0;
	resolution = 2000;
	mode = 0;
	count = Math.floor(Math.random() * 3) + 2;
	for(let i = 0; i <= count; i++)
	{
		curves.push(new BezierCurve());
		//controlPoints.push(generateControlPoints());
		//curves.push([]);
	}
	bezierTest.update(0);
	setInterval(draw, 1000 / framerate);
}

function click()
{

}

function generateControlPoints()
{
	var length = Math.floor(Math.random() * 4) + 3;
	var output = []; 
	var divisions = sideLength / (length + 1);
	for(let i = 0; i < length; i++)
	{
		output.push([divisions * (i + 1) + divisions * Math.random(), sideLength * Math.random()]);
	}
	return output;
}

function weightMidpoint(point1, point2, percent)
{
	var result = [(point1[0] * (1 - percent) + point2[0] * (percent)), (point1[1] * (1 - percent) + point2[1] * (percent))];
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
	for(let i = 0; i < pointSet.length - 1; i++)
	{
		smallerSet.push(weightMidpoint(pointSet[i], pointSet[i + 1], percent));
	}
	var output = cascade(smallerSet, percent);
	output.push(smallerSet);
	return output;
}

function mousePressed()
{
	/*
	mode = 1;
	subframe = resolution + 1;
	mousePoint = {x:mouseX, y: mouseY};
	var closestDist = sideLength * 2;
	var closePoint = 0;
	
	switch(mouseButton) {
		case LEFT: //Add Point
			
			break; //Remove Point
		case RIGHT:
			break;
		case CENTER: //Start New Curve

			break;

	}
	
	for(i = 0; i < controlPoints.length; i = i + 1)
	{
		if(distance(mousePoint, controlPoints[i]) < closestDist)
		{
			closePoint = i;
			closestDist = distance(mousePoint, controlPoints[i]);
		}
	}
	controlPoints[closePoint] = mousePoint;
	*/
}

function distance(point1, point2)
{
	return Math.hypot(point1[0] - point2[0], point1[1] - point2[1]);
}

function drawPath(pointSet, context)
{
	//context = canvas.getContext("2d");
	//context.strokeStyle = nextColor();
	
	if(pointSet.length > 1)
	{
		context.beginPath();
		context.moveTo(pointSet[0][0],pointSet[0][1]);
		for(let i = 0; i < pointSet.length - 1; i++)
		{
			context.lineTo(pointSet[i+1][0],pointSet[i+1][1]);
		}
		context.stroke();
	}
}

function nextColor()
{
	
	colorIndex = (colorIndex + 1) % colors.length;
	return(colors[colorIndex % colors.length]);
}

function draw() 
{
	ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var framePoints = [];
	for(let i = 0; i < curves.length; i++)
	{
		colorIndex = 0;
		//ctx.strokeStyle = colors[colorIndex];
		curves[i].update(subframe * 5 / resolution);
		//framePoints.push(cascade(controlPoints[i], subframe * 5 / resolution));
		curves[i].draw(canvas, colors);
		/* 
		for(let j = 0; j < curves[i].length; j++) //Loop drawing the control points and lines between them
		{
			ctx.beginPath();
			ctx.arc(controlPoints[i][j][0], controlPoints[i][j][1], 4, 0, Math.PI * 2);
			ctx.stroke();
			if(j < controlPoints[i].length - 1)
			{
				ctx.beginPath();
				ctx.moveTo(controlPoints[i][j][0],controlPoints[i][j][1]);
				ctx.lineTo(controlPoints[i][j+1][0],controlPoints[i][j+1][1]);
				
				ctx.stroke();
			}
		}
		ctx.stroke();
		ctx.fillStyle = nextColor();
		*/
		
		/*
		for(let j = 0; j < framePoints[i].length; j++) //Loop drawing lines between the nested invisible control points
		{
			var pointSet = framePoints[i][j];
			drawPath(pointSet, ctx);
			ctx.strokeStyle = nextColor();
			
		}
		*/
	}
	
	//ctx.fillStyle = nextColor();
	//old use of curves variable
	/*
	for(let i = 0; i < curves.length; i++) //Loop adding point to the final curve
	{
		point = framePoints[i][0][0];
		curves[i].push(point);
		drawPath(curves[i], ctx);
	}
	*/

	subframe = subframe + 1;
	
	if(subframe >= (resolution / 5)) //reset logic
	{
		subframe = 0;
		if(mode == 0)
		{
			let count = Math.floor(Math.random() * 3) + 1;
			curves = [];
			//controlPoints = [];
			//colorOffset = [];
			for(let i = 0; i < count; i++)
			{
				curves.push(new BezierCurve());
				controlPoints.push(generateControlPoints());
				//curves.push([]);
				//colorOffset.push(Math.random() * 5 + 0.5);
			}
			
		}

	}
	
}
