/* MoMath Math Square Behavior
 *
 *        Title: Bezier
 *  Description: Animates drawing of Bexier curve using user positions as control points
 * Scheduler ID: 
 *    Framework: P5
 *       Author: Micah Lorenz, May Lee
 *      Created: 2018-07-14
 *       Status: works
 */
 
import P5Behavior from 'p5beh'; //Not sure if import line is needed
import p5 from 'p5';
const pb = new P5Behavior();  //Not sure if this is needed either

var subframe = 0;
var resolution = 1000;
var mode - 0;
var controlPoints =[];
var blueCurve = [];
var line1 = {};
var line2 = {};
var line3 = {};
var mousePoint = {};
var p1;
var p2;
var p3;
var p4;
var mid1;
var mid2;
var mid3;
var mid4;
var mid5;
var mid6;

//pb.setup = function(p)? 


pb.setup = function() {
	//createCanvas(576,576);
	//frameRate(10000);
	subframe = 0;
	resolution = 1000;
	mode = 0;
	p1 = {x:100 * Math.random(), y:100 * Math.random(), assigned:-1};
	p2 = {x:200 * Math.random(), y:200 * Math.random(), assigned:-1};
	p3 = {x:300 * Math.random(), y:300 * Math.random(), assigned:-1};
	p4 = {x:400 * Math.random(), y:400 * Math.random(), assigned:-1};
	controlPoints = [p1, p2, p3, p4];
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
	//noFill();
}

function weightMidpoint(point1, point2, percent)
{
	var result = {x:(point1.x * (1 - percent) + point2.x * (percent)), y:(point1.y * (1 - percent) + point2.y * (percent))};
	return result;
}

function mousePressed()
{
	mode = 1;
	subframe = resolution + 1;
	mousePoint = {x:mouseX, y: mouseY};
	var closestDist = 1152;
	var closePoint = 0;
	for(var i = 0; i < controlPoints.length; i = i + 1)
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

//pb.draw = function(floor, p)?

pb.draw = function(floor) {
	//noFill();
	
	this.clear();
	var currentUsers = floor.users;
	if(currentUsers.length > 0)
	{
	   mode = 1;
	   for(var i = 0; i < currentUsers.length; i = i + 1)
	   {
		
		var userPoint = {x:currentUsers[i].x, y:currentUsers[i].y, assigned:i};
		var closestDist = 1152;
		var candidate = 0;
		for(var j = 0; j < controlPoints.length; j = j + 1)
		{
			if(controlPoints[j].assigned == i)
			{
			   candidate = j;
			   closestDist = -1;
			}
			if(distance(userPoint, controlPoints[j]) < closestDist && controlPoints[j].assigned == -1)
			{
				candidate = j;
				closestDist = distance(userPoint, controlPoints[j]);
			}
		}
		if(distance(userPoint, controlPoints[candidate]) > 8)
		{
		   subframe = resolution + 1;
		}
		controlPoints[candidate] = userPoint;
		mode = 1;
	   }
	}
	else
	{
	   mode = 0;
	}
	this.stroke(0, 0, 0);
	this.fill(0, 0, 0);
	this.ellipse(controlPoints[0].x, controlPoints[0].y, 4, 4);
	this.ellipse(controlPoints[1].x, controlPoints[1].y, 1, 1);
	this.ellipse(controlPoints[2].x, controlPoints[2].y, 1, 1);
	this.ellipse(controlPoints[3].x, controlPoints[3].y, 4, 4);
	this.stroke(128);
	this.line(line1.start.x, line1.start.y, line1.end.x, line1.end.y);
	this.line(line2.start.x, line2.start.y, line2.end.x, line2.end.y);
	this.line(line3.start.x, line3.start.y, line3.end.x, line3.end.y);
	//noFill();
	
	//bezier(x1, y1, x2, y2, x3, y3, x4, y4);
	this.stroke(0,255,0);
	mid1 = weightMidpoint(line1.start, line1.end, subframe * 5 / resolution);
	mid2 = weightMidpoint(line2.start, line2.end, subframe * 5 / resolution);
	this.line(mid1.x, mid1.y, mid2.x, mid2.y);
	mid3 = weightMidpoint(line2.start, line2.end, subframe * 5 / resolution);
	mid4 = weightMidpoint(line3.start, line3.end, subframe * 5 / resolution);
	this.line(mid3.x, mid3.y, mid4.x, mid4.y);
	
	this.stroke(255, 0, 0);
	mid5 = weightMidpoint(mid1, mid2, subframe * 5 / resolution);
	mid6 = weightMidpoint(mid3, mid4, subframe * 5 / resolution);
	this.line(mid5.x, mid5.y, mid6.x, mid6.y);
	this.stroke(0, 0, 255);
	for(var i = 0;  i < 5; i = i + 1)
	{
		var point = {x:this.bezierPoint(controlPoints[0].x, controlPoints[1].x, controlPoints[2].x, controlPoints[3].x, (i + (subframe * 5)) / resolution),y:this.bezierPoint(controlPoints[0].y, controlPoints[1].y, controlPoints[2].y, controlPoints[3].y, (i + (subframe * 5)) / resolution)};
		blueCurve.push(point);
		//this.ellipse(x, y, 1, 1);
	}
	for(var i = 0; i < blueCurve.length; i = i + 1)
	{
		this.ellipse(blueCurve[i].x, blueCurve[i].y, 1, 1);
	}
	subframe = subframe + 1;
	
	if(subframe >= (resolution / 5))
	{
		subframe = 0;
		if(currentUsers.length == 0)
		{
			mode = 0;
		}
		if(mode == 0)
		{
			p1 = {x:100 * Math.random(), y:100 * Math.random(), assigned:-1};
			p2 = {x:200 * Math.random(), y:200 * Math.random(), assigned:-1};
			p3 = {x:300 * Math.random(), y:300 * Math.random(), assigned:-1};
			p4 = {x:400 * Math.random(), y:400 * Math.random(), assigned:-1};
			controlPoints = [p1, p2, p3, p4];
		}
		
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
		
	}
	
}
export const behavior = {
  title: "Bezier (P5)",
  init: pb.init.bind(pb),
  frameRate: 'sensors',
  render: pb.render.bind(pb),
  numGhosts: 0,
  maxUsers: 4
};
export default behavior
