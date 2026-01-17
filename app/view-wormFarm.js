import { HTMLApp } from "./[html-common]/module/HTMLApp.js";
import * as Maths from "./[html-common]/module/Maths.js";
import { wormfarmApp } from "./wormfarmApp.js";
import * as character from "./view-character.js";
import { svg } from './view-svg.js'



let element;
const elementMap = {
	wormfarm		: 'group-wormfarm',
	creature 		: 'group-creature',
	characterIcon	: 'character-icon',
	characterTitle	: 'character-title',
};


export class WormFarm {
	space;
	dimensions;
	creature = [];

	constructor(
		space,
	) {

		this.space = space;
		this.dimensions = space.dimensions;
		element = HTMLApp.buildElementMap(document, elementMap);
	}// constructor


	addCharacter() {
		element.characterIcon.innerHTML += character.getBarrySVG;
	}

	updateCharacter() {
		element.characterIcon.setAttribute(
			'transform',
			`translate(${wormfarmApp.character.svgX},${wormfarmApp.character.svgY}) rotate(${wormfarmApp.character.position.degrees})`
		);

		svg.updateSpaceTransform();
		element.characterTitle.innerHTML = wormfarmApp.character.report;
	}/* updateCharacter */



	populate(number) {
		for (let i=0; i < number; i++)
		{
			this.addCreature();
		}
	}


	addCreature() {

		const worm = new Worm(
			this,
			`worm-${this.creature.length}`,
			20
		);
		//console.log(worm);
		this.creature.push(worm);

	}



	moveCreatures() {
		//console.debug('wormfarm.moveCreatures', this.creature);
		this.creature.forEach(
			(thisCreature) =>
			{
				//console.log(thisCreature);
				thisCreature.move();
			}
		);
	}


}/* WormFarm */




export class Worm {
	wormFarm;
	id;
	length;
	radius;
	circleDivisions;
	degreeUnit;

	direction;	// degrees
	wormBody;
	x;
	y;

	constructor(
		wormfarm,
		id,
		length,
		radius = 50,
		circleDivisions = 12,
	) {
		//console.log('Worm args', arguments);

		this.wormfarm = wormfarm;
		this.id = id;
		this.length = length;
		this.radius = radius;
		this.circleDivisions = circleDivisions;
		this.degreeUnit = 360/circleDivisions;

		this.direction = wormfarmApp.space.newAngle();
		this.direction.degrees = Maths.getRandomInt(0,circleDivisions) * this.degreeUnit;

		this.x = Maths.getRandomInt(wormfarm.dimensions.xMin, wormfarm.dimensions.xMax);
		this.y = Maths.getRandomInt(wormfarm.dimensions.yMin, wormfarm.dimensions.yMax);


		this.wormBody = document.createElementNS('http://www.w3.org/2000/svg','g');
		this.wormBody.setAttribute('id',this.id);
		this.wormBody.setAttribute('class','worm');
		element.creature.appendChild(this.wormBody);


		const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
		c.setAttribute('cx', this.x.toString());
		c.setAttribute('cy', this.y.toString());
		this.wormBody.appendChild(c);

		//console.log(this);
	}


	move() {
		// generate a random movement factor (-1,0,+1)
		// generate the new coordinate
		// wrap as necessary
		// add the new head
		// delete the tail (if needed)
		const directionChange = Maths.getRandomIntInclusive(-1,1);
		this.direction.degrees += directionChange * this.degreeUnit;
		this.x += Math.cos(this.direction.radians) * this.radius;
		this.y += Math.sin(this.direction.radians) * this.radius;

		//console.log(this);

		this.x = this.wrapX(this.x);
		this.y = this.wrapY(this.y);

		//console.log(this);



		/*this.wormBody.innerHTML += `
			<circle cx="${this.x}" cy="${this.y}"/>
		`;*/
		// data-direction="${this.direction}"

		//console.log(`${this.id} body`, this.wormBody.innerHTML);


		//const c = document.createElement('circle');
		const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
		c.setAttribute('cx', this.x.toString());
		c.setAttribute('cy', this.y.toString());
		this.wormBody.appendChild(c);

		if (this.wormBody.childElementCount > this.length)
		{
			this.wormBody.firstElementChild.remove();
		}

	}/* move */


	wrapX(x) {
		if (x < wormfarmApp.space.dimensions.xMin ) x += wormfarmApp.space.dimensions.width;
		if (x > wormfarmApp.space.dimensions.xMax ) x -= wormfarmApp.space.dimensions.width;
		return x;
	}

	wrapY(y) {
		if (y < wormfarmApp.space.dimensions.yMin ) y += wormfarmApp.space.dimensions.height;
		if (y > wormfarmApp.space.dimensions.yMax ) y -= wormfarmApp.space.dimensions.height;
		return y;
	}

}/* Worm */



