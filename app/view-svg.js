//
//	svg
//

import { HTMLApp } from "./[html-common]/module/HTMLApp.js";
import * as Maths from "./[html-common]/module/Maths.js";
import * as SVG from "./[html-common]/module/SVG.js";
import { wormfarmApp } from "./wormfarmApp.js";
import { ui } from './view-html-ui.js';


let element = {};
const elementMap = {
	space			: 'group-space',
	cartesianGroup  : 'group-cartesian',
	cartesianGrid	: 'group-cartesianGrid',

	drawing			: 'group-drawing',
	characterIcon	: 'character-icon',
	characterTitle	: 'character-title',
};


const precision = {
	report : 6
};



class SVGView {


	constructor() {
		const svgElement = document.getElementById('svg-element');
		element = HTMLApp.buildElementMap(svgElement, elementMap);
		//console.log('svg element', element);
	}



	drawGrid() {
		const cartesianGrid = new SVG.CartesianGrid(wormfarmApp.space, wormfarmApp.dimensions);
		document.getElementById('group-cartesianGrid').innerHTML = cartesianGrid.toString();
	}



	drawPointInfo(svgX, svgY) {
		const pointInfoSvg = this.pointInfo(svgX, -svgY);
		document.getElementById('group-cartesianPoint').innerHTML = pointInfoSvg.cartesian;
		document.getElementById('group-polarPoint').innerHTML = pointInfoSvg.polar;
	}


	clearPoint() {
		document.getElementById('group-cartesianPoint').innerHTML = '';
		document.getElementById('group-polarPoint').innerHTML = '';
	}




	/* pointInfo
	*/
	pointInfo(x, y) {
		const result = {
			cartesian: '',
			polar : '',
		};

		const coords = new wormfarmApp.space.CartesianCoordinates(x,y);

		const point = wormfarmApp.space.newPoint('point marker');
		point.cartesian = coords;

		const svgX = x;
		const svgY = -y;

		const cartesianInfo = [
			`x: ${point.x.toPrecision(precision.report)}`,
			`y: ${point.y.toPrecision(precision.report)}`,
		];

		const polarInfo = [
			`r: ${point.radius.toPrecision(precision.report)}`,
			`a: ${point.angle.degrees.toPrecision(precision.report)}°`,
			`a: ${point.angle.radians.toPrecision(precision.report)} rad`,
			`a: ${point.angle.radiansPi.toPrecision(precision.report)} π rad`,
			`a: ${point.angle.radiansTau.toPrecision(precision.report)} τ rad`,
		];

		const pointReport = [
			`cartesian:`,
			`	${cartesianInfo.join('\n\t')}`,
			`polar:`,
			`	${polarInfo.join('\n\t')}`,
			`svg:`,
			`	x: ${svgX.toPrecision(precision.report)}`,
			`	y: ${svgY.toPrecision(precision.report)}`,
		].join('\n');


		result.cartesian = `
			<line x1="${svgX}" y1="0" x2="${svgX}" y2="${svgY}"><title>${cartesianInfo.join('\n')}</title></line>
			<line x1="0" y1="${svgY}" x2="${svgX}" y2="${svgY}"><title>${cartesianInfo.join('\n')}</title></line>
			<use href="#def-point" class="use-point" x="${svgX}" y="${svgY}">
				<title>${pointReport}</title>
			</use>
		`;

		const angle180 = Maths.degrees180(point.angle.degrees);
		const sweepFlag = (angle180 >= 0) ? 1 : 0;

		result.polar = `
			<line x1="0" y1="0" x2="${point.x}" y2="${-point.y}"><title>${polarInfo.join('\n')}</title></line>
			<circle r="${point.radius}">
				<title>r: ${point.radius.toPrecision(precision.report)}</title>
			</circle>
			<path d="M 0,${-point.radius} A ${point.radius},${point.radius} 0 0 ${sweepFlag} ${svgX},${svgY}">
				<title>${polarInfo.join('\n')}</title>
			</path>
			<use href="#def-point" class="use-point" x="${svgX}" y="${svgY}">
				<title>${pointReport}</title>
			</use>
		`;

		return result;
	}/* pointInfo */



	updateCharacter() {
		element.characterIcon.setAttribute(
			'transform',
			`translate(${wormfarmApp.character.svgX},${wormfarmApp.character.svgY}) rotate(${wormfarmApp.character.position.degrees})`
		);

		this.updateSpaceTransform();
		element.characterTitle.innerHTML = wormfarmApp.character.report;
	}/* updateCharacter */



	updateSpaceTransform() {


		const rotate = wormfarmApp.character.position.degrees;

		const rotateTransform    = (ui.rotateSpace)   ? `rotate(${-rotate},0,0)` : 'rotate(0,0,0)';
		const translateTransform = (ui.centerCharacter) ? `translate(${-wormfarmApp.character.svgX},${-wormfarmApp.character.svgY})` : 'translate(0,0)';

		const scaleTransform = `scale(${ui.getScale()})`;

		// TODO: see if this can be applied as separate attributes, or combined into a single transform matrix

		const transform = `${scaleTransform} ${rotateTransform} ${translateTransform} `;

		element.space.setAttribute('transform', transform);
	}/* updateSpaceTransform */





	updateSpace() {

		if (ui.showCartesian) {
			element.cartesianGroup.style.display = '';
		}
		else {
			element.cartesianGroup.style.display = 'none';
		}


		if (ui.colourScheme === 'light')
		{
			document.body.classList.remove('dark');
			document.body.classList.add('light');
		}
		else {
			document.body.classList.remove('light');
			document.body.classList.add('dark');
		}

		element.cartesianGrid.style.setProperty('opacity', ui.cartesianOpacity);

		this.updateSpaceTransform();

	}/* updateSpace */




}/* SVGView */


export const svg = new SVGView();