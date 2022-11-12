function loadExample(example) {
	var script = getExample(example);
	
	// remove newline at start
	// (lets us format examples nicer below)
	if (script.startsWith("\n")) {
		script = script.slice(1);
	}
	editor.setValue(script);
	
}

function getExample(example) {
	
	switch(example) {
		
		case 1: 
		return "name = input(\"Enter your name:\")\nprint(\"Your name is: \" + name)"
		case 2: 

			return `
# draw concentric circles
for x in range(6):
  Circle(0, 0, x)
  
# draw a grid of points
for x in range(5):
  for y in range(5):
    Point(x, y)

# draw concentric circles
for x in range(6):
  Circle(Point(1, 1), x)


`;


		
		case 3: 
			return `
# line through 2 points
P1 = Point(1,2)
P2 = Point(3,4)
line = Line(P1,P2)
print(str(P1) + " is a line through " + str(P1) + " and " + str(P2))
`
		case 4: 
			return `
# expoenential growth

from math import *

number = 1

while True:
  print(number)
  number = number * 2
  if number >= 10000:
    break

`
		case 5: 
			return `
# draw a line and parabola and find the intersection
num = slider(1,5,0.1)
parabola = evalCommand("y=" + num + " x^2")
line = evalCommand("y = x")
print(parabola)
print(line)
P = intersect(parabola, line)
setValue(num, 2)

`
		case 6: 
			return `
# Regression (best-fit)
P1 = Point(1,2)
P2 = Point(3,4)
P3 = Point(1,4)
P4 = Point(0,4)
P5 = Point(2,3)
P6 = Point(5,3)

# regression line
regressionLine = FitPoly((P1,P2,P3,P4,P5,P6), 1)


# regression quadratic
regressionParabola = FitPoly((P1,P2,P3,P4,P5,P6), 2)

print("Now try dragging the points!")

`
		case 7: 
			return `
import time

# draw concentric circles slowly
for x in range(6):
    circle(0, 0, x + 1)
    # pause for 1 second between circles
	# also makes sure browser isn’t blocked
    time.sleep(1)
`;
		case 8: 
			return `
import math

a = Point(3, 4)
b = Point(0, 2)
c = Point(5, 1)
k1 = Line(a, b)
k2 = Line(b, c)
k3 = Line(c, a)

print("Drag the points to see the area change")

@a.when_moved
@b.when_moved
@c.when_moved
def find_area():
    ab = Distance(a, b)
    bc = Distance(b, c)
    ca = Distance(c, a)
    s = 0.5 * (ab + bc + ca)
    A = math.sqrt(s * (s - ab) * (s - bc) * (s - ca))
    print("Area = " + str(A))
	
	
find_area()
`;
		case 9: 
			return `
# Python code goes here
`;
		case 10: 
			return `
# Python code goes here
`;
		case 11: 
			return `
# Python code goes here
`;
		case 12: 
			return `
# Python code goes here
`;
		
		
	}
	
	
}