"use strict"
window.onload = function (e) {
	var startDate = new Date();
	var doc = document;
	var win = window;

	var universe = document.getElementById('universe');
	var space = document.createElement('canvas');
	var context = space.getContext('2d');

	space.height = Constants.measurements.CanvasHeight;
	space.width = Constants.measurements.CanvasWidth;
	
	universe.appendChild(space);

	init(context);

	looop(context);
	
	console.log('---mainScript loaded---');
	console.log('milliseconds for creation: ' + (new Date() - startDate));
}