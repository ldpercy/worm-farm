
//	controller
//

import { Character } from "./Character.js";
import { wormfarmApp } from "./wormfarmApp.js";
import { ui } from './view-html-ui.js';
import { svg } from "./view-svg.js";



//
//	event listeners
//



/* export function svgKeyListener(event) {
	//console.log('svgKeyListener', event);
	//event.stopPropagation();
} */


const keyFunctionMap = {
	'd'	: doCommands,
	'c'	: svg.clearDrawing,
	'o'	: toOrigin,


	'C'	: toggleCenter,
	'R'	: toggleRotate,

	'+'	: zoomIn,
	'z'	: zoomIn,
	'Z'	: zoomOut,
	'-'	: zoomOut,

	'?'	: ui.togglePopover,
};


export function documentKeyListener(event) {
	//console.log('documentKeyListener', event);

	if (keyFunctionMap[event.key]) {
		event.preventDefault();
		keyFunctionMap[event.key]();
	}

}/* documentKeyListener */






export function svgClickListener(event) {
	//console.debug('svgClickListener', event);
	const domPoint = new DOMPoint(event.clientX, event.clientY);

	const pageElement = this.element.svg.getElementById('group-page');

	// Get point in page SVG space
	const pagePoint = domPoint.matrixTransform(pageElement.getScreenCTM().inverse());
	//console.debug('pagePoint', pagePoint);

	// /this.drawPoint(pagePoint.x, pagePoint.y);	// adding this line seems to cancel subsequent events - do I need to re-propagate the event or something?

	//const cmd = `xyr ${pagePoint.x}, ${-pagePoint.y}`;
	//console.debug('svgClickListener', cmd);
	//this.doCommand(cmd);
	const mouseMode = ui.mouseMode;

	if (mouseMode === 'info') {
		svg.drawPointInfo(pagePoint.x, pagePoint.y);
	}
	else if (mouseMode === 'draw') {
		const cmd = `xyr ${pagePoint.x}, ${-pagePoint.y}`;
		doCommand(cmd);
	}
	else if (mouseMode === 'move')
	{
		const cmd = `^xyr ${pagePoint.x}, ${-pagePoint.y}`;
		doCommand(cmd);
	}

}/* svgClickListener */








//
//	handlers
//

export function updatePage() {
	svg.updatePage();
}

export function toOrigin() {
	//console.log('toOrigin');
	doCommand('^o');
	svg.updateCharacter();
	ui.updateCharacterInfo();
}


export function doCommands() {


	svg.updateCharacter();
	ui.updateCharacterInfo();
}/* doCommands */


function doCommand(cmdString) {
	svg.updateCharacter();
	ui.updateCharacterInfo();
}




function toggleCenter() {
	ui.centerCharacter = !ui.centerCharacter;
	svg.updatePageTransform();
}

function toggleRotate() {
	ui.rotatePage = !ui.rotatePage;
	svg.updatePageTransform();
}



function zoomIn() {
	//console.log('zoomIn');
	ui.zoom++;
	svg.updatePageTransform();
}

function zoomOut() {
	//console.log('zoomOut');
	ui.zoom--;
	svg.updatePageTransform();
}
