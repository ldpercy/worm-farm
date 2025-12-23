//
//	view html-ui
//

import { HTMLApp } from "./library/HTMLApp.js";
import { wormfarmApp } from "./wormfarmApp.js";


let element;
const elementMap = {
	applicationForm		: 'form-application',
	pageForm		: 'form-page',
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
		return element.pageForm.centerCharacter.checked;
	}

	/** @returns {boolean} */
	get rotatePage() {
		return element.pageForm.rotatePage.checked;
	}

	/** @returns {string} */
	get colourScheme() {
		return element.pageForm.colourScheme.value;
	}

	/** @returns {number} */
	get zoom() {
		return element.pageForm.zoom.value;
	}

	/** @returns {boolean} */
	get showCartesian() {
		return element.pageForm.showCartesian.checked;
	}


	/** @returns {number} */
	get cartesianOpacity() {
		return element.pageForm.cartesianOpacity.value;
	}



	/** @returns {string} */
	get mouseMode() {
		return element.pageForm['mouse-click'].value;
	}




	//
	//	Setters
	//

	/** @param {number} zoomLevel */
	set zoom(zoomLevel) {
		element.pageForm.zoom.value = zoomLevel;
	}


	/** @param {boolean} center */
	set centerCharacter(center) {
		element.pageForm.centerCharacter.checked = center;
	}

	/** @param {boolean} rotate */
	set rotatePage(rotate) {
		element.pageForm.rotatePage.checked = rotate;
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

		const zoomPower = Number.parseInt(element.pageForm.zoom.value);

		const scale = 2 ** zoomPower;

		//console.log(scale);

		//const newViewBox = viewBox.toStringScale(scale);
		//console.log(newViewBox);
		//svgElement.setAttribute('viewBox',newViewBox);
		return scale;
	}


}/* HTMLUserInterface */


export const ui = new HTMLUserInterface();
