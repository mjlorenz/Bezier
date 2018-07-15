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

import P5Behavior from 'p5beh';
import * as Floor from 'floor';
/const pb = new P5Behavior();  Not sure if this is needed either

//pb.setup = function(p)? 

pb.setup = function() {
	createCanvas(576,576);
	//frameRate(10000);
	subframe = 0;
	resolution = 1000;
	mode = 0;
	p1 = {x:100 * random(), y:100 * random(), assigned:-1};
	p2 = {x:200 * random(), y:200 * random(), assigned:-1};
	p3 = {x:300 * random(), y:300 * random(), assigned:-1};
	p4 = {x:400 * random(), y:400 * random(), assigned:-1};
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
	noFill();
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

//pb.draw = function(floor, p)?

pb.draw = function(floor) {
	clear();
	var currentUsers = floor.users;
	if(currentUsers.length > 0)
	{
	   mode = 1;
	   for(i = 0; i < currentUsers.length; i = i + 1)
	   {
		
		var userPoint = {x:currentUsers[i].x, y:currentUsers[i].y, assigned:i};
		var closestDist = 1152;
		var candidate = 0;
		for(j = 0; j < controlPoints.length; j = j + 1)
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
		controlPoints[candidate] = userPoint;
		
	   }
	}
	else
	{
	   mode = 0;
	}
	stroke(0, 0, 0);
	fill(0, 0, 0);
	ellipse(controlPoints[0].x, controlPoints[0].y, 4, 4);
	ellipse(controlPoints[1].x, controlPoints[1].y, 1, 1);
	ellipse(controlPoints[2].x, controlPoints[2].y, 1, 1);
	ellipse(controlPoints[3].x, controlPoints[3].y, 4, 4);
	stroke(128);
	line(line1.start.x, line1.start.y, line1.end.x, line1.end.y);
	line(line2.start.x, line2.start.y, line2.end.x, line2.end.y);
	line(line3.start.x, line3.start.y, line3.end.x, line3.end.y);
	noFill();
	
	//bezier(x1, y1, x2, y2, x3, y3, x4, y4);
	stroke(0,255,0);
	mid1 = weightMidpoint(line1.start, line1.end, subframe * 5 / resolution);
	mid2 = weightMidpoint(line2.start, line2.end, subframe * 5 / resolution);
	line(mid1.x, mid1.y, mid2.x, mid2.y);
	mid3 = weightMidpoint(line2.start, line2.end, subframe * 5 / resolution);
	mid4 = weightMidpoint(line3.start, line3.end, subframe * 5 / resolution);
	line(mid3.x, mid3.y, mid4.x, mid4.y);
	
	stroke(255, 0, 0);
	mid5 = weightMidpoint(mid1, mid2, subframe * 5 / resolution);
	mid6 = weightMidpoint(mid3, mid4, subframe * 5 / resolution);
	line(mid5.x, mid5.y, mid6.x, mid6.y);
	stroke(0, 0, 255);
	for(i = 0;  i < 5; i = i + 1)
	{
		point = {x:bezierPoint(controlPoints[0].x, controlPoints[1].x, controlPoints[2].x, controlPoints[3].x, (i + (subframe * 5)) / resolution),y:bezierPoint(controlPoints[0].y, controlPoints[1].y, controlPoints[2].y, controlPoints[3].y, (i + (subframe * 5)) / resolution)};
		blueCurve.push(point);
		//ellipse(x, y, 1, 1);
	}
	for(i = 0; i < blueCurve.length; i = i + 1)
	{
		ellipse(blueCurve[i].x,blueCurve[i].y, 1, 1);
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
			p1 = {x:100 * random(), y:100 * random(), assigned:-1};
			p2 = {x:200 * random(), y:200 * random(), assigned:-1};
			p3 = {x:300 * random(), y:300 * random(), assigned:-1};
			p4 = {x:400 * random(), y:400 * random(), assigned:-1};
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
