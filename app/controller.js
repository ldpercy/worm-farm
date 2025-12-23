
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

	const spaceElement = this.element.svg.getElementById('group-space');

	// Get point in SVG space coordinates
	const spacePoint = domPoint.matrixTransform(spaceElement.getScreenCTM().inverse());
	//console.debug('spacePoint', spacePoint);

	// /this.drawPoint(spacePoint.x, spacePoint.y);	// adding this line seems to cancel subsequent events - do I need to re-propagate the event or something?

	const mouseMode = ui.mouseMode;

	if (mouseMode === 'info') {
		svg.drawPointInfo(spacePoint.x, spacePoint.y);
	}
	else if (mouseMode === 'draw') {
		const cmd = `xyr ${spacePoint.x}, ${-spacePoint.y}`;
		doCommand(cmd);
	}
	else if (mouseMode === 'move')
	{
		wormfarmApp.character.moveToXY(spacePoint.x, -spacePoint.y);
	}
	svg.updateCharacter();
	ui.updateCharacterInfo();
}/* svgClickListener */








//
//	handlers
//

export function updateSpace() {
	svg.updateSpace();
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
	svg.updateSpaceTransform();
}

function toggleRotate() {
	ui.rotateSpace = !ui.rotateSpace;
	svg.updateSpaceTransform();
}



function zoomIn() {
	//console.log('zoomIn');
	ui.zoom++;
	svg.updateSpaceTransform();
}

function zoomOut() {
	//console.log('zoomOut');
	ui.zoom--;
	svg.updateSpaceTransform();
}
