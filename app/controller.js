
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
	's' : animationStartStop,
	'f' : animationForward,
	'w' : addCreature,

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
	else if (mouseMode === 'move')
	{
		wormfarmApp.character.moveToXY(spacePoint.x, -spacePoint.y);
	}
	wormfarmApp.wormfarm.updateCharacter();
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
	wormfarmApp.wormfarm.updateCharacter();
	ui.updateCharacterInfo();
}


export function doCommands() {


	wormfarmApp.wormfarm.updateCharacter();
	ui.updateCharacterInfo();
}/* doCommands */


function doCommand(cmdString) {
	wormfarmApp.wormfarm.updateCharacter();
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



export function animationStartStop() {

	//console.debug('animationStartStop', this.intervalId);

	if (this.intervalId) {
		clearInterval(this.intervalId);
		this.intervalId = undefined;
	}
	else {
		this.intervalId = setInterval(
			()=> { wormfarmApp.wormfarm.moveCreatures() },
			100
		);
	}
}/* animationStartStop */


export function animationForward() {
	wormfarmApp.wormfarm.moveCreatures();
}/* animationForward */


export function addCreature() {
	wormfarmApp.wormfarm.addCreature();
}
