//
//	view html-ui
//

import { HTMLApp } from "./library/HTMLApp.js";
import { wormfarmApp } from "./wormfarmApp.js";


let element;
const elementMap = {
	applicationForm		: 'form-application',
	spaceForm		: 'form-space',
	characterInfo	: 'character-info',
	infoPopover		: 'info-popover',
};



class HTMLUserInterface {


	constructor() {
		element = HTMLApp.buildElementMap(document, elementMap);
		//console.log(element);

	}


	//
	//	Getters
	//



	/** @returns {boolean} */
	get centerCharacter() {
		return element.spaceForm.centerCharacter.checked;
	}

	/** @returns {boolean} */
	get rotateSpace() {
		return element.spaceForm.rotateSpace.checked;
	}

	/** @returns {string} */
	get colourScheme() {
		return element.spaceForm.colourScheme.value;
	}

	/** @returns {number} */
	get zoom() {
		return element.spaceForm.zoom.value;
	}

	/** @returns {boolean} */
	get showCartesian() {
		return element.spaceForm.showCartesian.checked;
	}


	/** @returns {number} */
	get cartesianOpacity() {
		return element.spaceForm.cartesianOpacity.value;
	}



	/** @returns {string} */
	get mouseMode() {
		return element.spaceForm['mouse-click'].value;
	}




	//
	//	Setters
	//

	/** @param {number} zoomLevel */
	set zoom(zoomLevel) {
		element.spaceForm.zoom.value = zoomLevel;
	}


	/** @param {boolean} center */
	set centerCharacter(center) {
		element.spaceForm.centerCharacter.checked = center;
	}

	/** @param {boolean} rotate */
	set rotateSpace(rotate) {
		element.spaceForm.rotateSpace.checked = rotate;
	}



	//
	//	other
	//


	togglePopover() {
		element.infoPopover.togglePopover();
	}

	updateCharacterInfo() {
		element.characterInfo.innerHTML = wormfarmApp.character.report;
	}




	getScale() {

		const zoomPower = Number.parseInt(element.spaceForm.zoom.value);

		const scale = 2 ** zoomPower;

		//console.log(scale);

		//const newViewBox = viewBox.toStringScale(scale);
		//console.log(newViewBox);
		//svgElement.setAttribute('viewBox',newViewBox);
		return scale;
	}


}/* HTMLUserInterface */


export const ui = new HTMLUserInterface();
