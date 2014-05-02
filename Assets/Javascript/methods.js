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
		};
	};
}

function populateGrid(ctx) {
	var context = ctx;
 
 	context.clearRect(0, 0, Constants.measurements.CanvasWidth, Constants.measurements.CanvasHeight);

 	for (var key in Grid) {
 		var cell = Grid[key];

		if (cell.isAlive){
			context.fillRect(cell.x * Constants.measurements.BrickWidth, cell.y * Constants.measurements.BrickHeight, Constants.measurements.BrickWidth, Constants.measurements.BrickWidth)
		}
	}	
}

function getNeigbours(x, y) {
	var count = 0;

	if (Grid[x+'|'+y] != undefined ) {
		/*top neighbour*/
		if (Grid[x+'|'+(y-1)] != undefined && Grid[x+'|'+(y-1)].isAlive) {
		  count++;
		}
		
		if (Grid[(x+1)+'|'+(y-1)] != undefined && Grid[(x+1)+'|'+(y-1)].isAlive) {
			count++;
		}

		if (Grid[(x+1)+'|'+y] != undefined && Grid[(x+1)+'|'+y].isAlive) {
			count++;
		}

		if (Grid[(x+1)+'|'+(y+1)] != undefined && Grid[(x+1)+'|'+(y+1)].isAlive) {
			count++;
		}

		if (Grid[x +'|' + (y+1)] != undefined && Grid[x +'|' + (y+1)].isAlive) {
			count++;
		}
		
		if (Grid[(x-1)+'|'+(y+1)] != undefined && Grid[(x-1)+'|'+(y+1)].isAlive) {
			count++;
		}
		
		if (Grid[(x-1)+'|'+y] != undefined && Grid[(x-1)+'|'+y].isAlive) {
			count++;
		}
		
		if (Grid[(x-1)+'|'+(y-1)] != undefined && Grid[(x-1)+'|'+(y-1)].isAlive) {
			count++;
		}
		
		return count;		
	}
}

function prepareNextGeneration(){
	for (var x = 0; x < Constants.measurements.CanvasWidth / Constants.measurements.BrickWidth; x++) {
		for (var y = 0; y < Constants.measurements.CanvasHeight / Constants.measurements.BrickHeight; y++) {
			var currentCell = Grid[x+'|'+y];
			if (!currentCell.isAlive && getNeigbours(x, y) === 3 ) { currentCell.isAlive = true; }
			else if (currentCell.isAlive && getNeigbours(x, y) === 2 || getNeigbours(x, y) === 3) { currentCell.isAlive = true; }
			else if (currentCell.isAlive && getNeigbours(x, y) <= 2) { currentCell.isAlive = false; }
			else if (currentCell.isAlive && getNeigbours(x, y) >= 3) { currentCell.isAlive = false; }	
		};
	};
}

function init(ctx){
	createGrid();
	populateGrid(ctx);
}

function looop(ctx){
	var start = new Date();
	prepareNextGeneration();
	populateGrid(ctx);
	requestAnimationFrame(function(){looop(ctx)});
	console.log('loop-calculation-duration: ' + (new Date - start));
}

console.log('---Methods loaded---');
