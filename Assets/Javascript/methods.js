"use strict"

if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = (function () {
		return window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();
}

function spwanAliveOrDead() {
	var randomNumber = Math.random();

	if (randomNumber > 0.5)
		return true;

	return false;
}

function createGrid(){
	for (var x = 0; x < Constants.measurements.CanvasWidth / Constants.measurements.BrickWidth; x++) {
		for (var y = 0; y < Constants.measurements.CanvasHeight / Constants.measurements.BrickHeight; y++) {
			Grid[x+'|'+y] = new Cell(x, y, spwanAliveOrDead());
			NextGrid[x+'|'+y] = new Cell(Grid[x+'|'+y].x, Grid[x+'|'+y].y, Grid[x+'|'+y].isAlive); 
		}
	}
}

function populateGrid(ctx) {
	var context = ctx;
 
 	context.clearRect(0, 0, Constants.measurements.CanvasWidth, Constants.measurements.CanvasHeight);

 	for (var key in Grid) {
 		var cell = NextGrid[key];

		if (cell.isAlive){
			context.fillRect(cell.x * Constants.measurements.BrickWidth, cell.y * Constants.measurements.BrickHeight, Constants.measurements.BrickWidth, Constants.measurements.BrickWidth)
		}
	}	
}

function getNeigbours(x, y) {
	
	var count = 0;

	if (Grid[x+'|'+y] != undefined ) {

		if (Grid[x+'|'+(y-1)] != undefined && Grid[x+'|'+(y-1)].isAlive) { count++; }
		if (Grid[(x+1)+'|'+(y-1)] != undefined && Grid[(x+1)+'|'+(y-1)].isAlive) { count++;	}
		if (Grid[(x+1)+'|'+y] != undefined && Grid[(x+1)+'|'+y].isAlive) { count++;	}
		if (Grid[(x+1)+'|'+(y+1)] != undefined && Grid[(x+1)+'|'+(y+1)].isAlive) { count++;	}
		if (Grid[x +'|' + (y+1)] != undefined && Grid[x +'|' + (y+1)].isAlive) { count++;	}
		if (Grid[(x-1)+'|'+(y+1)] != undefined && Grid[(x-1)+'|'+(y+1)].isAlive) { count++;	}
		if (Grid[(x-1)+'|'+y] != undefined && Grid[(x-1)+'|'+y].isAlive) { count++;	}
		if (Grid[(x-1)+'|'+(y-1)] != undefined && Grid[(x-1)+'|'+(y-1)].isAlive) { count++;	}

		return count;		
	}
}

function refreshGrids () {
	for (var x = 0; x < Constants.measurements.CanvasWidth / Constants.measurements.BrickWidth; x++) {
		for (var y = 0; y < Constants.measurements.CanvasHeight / Constants.measurements.BrickHeight; y++) {
			Grid[x+'|'+y] = new Cell(NextGrid[x+'|'+y].x, NextGrid[x+'|'+y].y, NextGrid[x+'|'+y].isAlive); 
		}
	}
}

function prepareNextGeneration() {
	for (var x = 0; x < Constants.measurements.CanvasWidth / Constants.measurements.BrickWidth; x++) {
		for (var y = 0; y < Constants.measurements.CanvasHeight / Constants.measurements.BrickHeight; y++) {
			var currentCell = Grid[x+'|'+y];
			var nextCell = NextGrid[x+'|'+y];

			if (!currentCell.isAlive && getNeigbours(x, y) === 3 ) { nextCell.isAlive = true; }
			else if (currentCell.isAlive && (getNeigbours(x, y) === 2 || getNeigbours(x, y) === 3)) { nextCell.isAlive = true; }
			else if (currentCell.isAlive && getNeigbours(x, y) < 2) { nextCell.isAlive = false; }
			else if (currentCell.isAlive && getNeigbours(x, y) > 3) { nextCell.isAlive = false; }	
		}
	}

	refreshGrids();
}

function init(ctx){
	createGrid();
	populateGrid(ctx);
}

function looop(ctx){
	var loopStart = new Date();

	if (new Date() - deltaTime >= Constants.times.MillisecondsPerTick) {
		prepareNextGeneration();
		populateGrid(ctx);
		deltaTime = new Date();
	}
	console.log(new	Date - loopStart);
	requestAnimationFrame(function(){looop(ctx)});
}

console.log('---Methods loaded---');
