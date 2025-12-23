import * as Maths from "./library/Maths.js";
import { wormfarmApp } from "./wormfarmApp.js";


import { PlanarSpace } from "./library/PlanarSpace.js";


const elementMap = {
	page			: 'group-page',
	cartesianGroup  : 'group-cartesian',
	cartesianGrid	: 'group-cartesianGrid',

	drawing			: 'group-drawing',
	characterIcon	: 'character-icon',
	characterTitle	: 'character-title',
};


class WormFarm {
	farm = [];
	wormCount;
	space;

	constructor(
		wormCount = 7
	) {

		for (let i=0; i < this.wormCount; i++)
		{
			this.addWorm();
		}


		this.space = new PlanarSpace('wormfarm-space');

	}


	addWorm(id) {

		const worm = new Worm(
			this,
			`worm-${id}`,
			20
		);

		this.farm.push(new Worm());
	}



	moveWorms() {
		this.farm.forEach(
			(thisWorm) =>
			{
				//console.log(thisWorm);
				thisWorm.move();
			}
		);
	}


}/* WormFarm */




class Worm {
	wormFarm;
	id;
	length;
	radius;
	circleDivisions;
	degreeUnit;
	x = Maths.getRandomInt(wormfarmApp.page.xMin, wormfarmApp.page.xMax);
	y = Maths.getRandomInt(wormfarmApp.page.yMin, wormfarmApp.page.yMax);;
	direction;	// degrees
	wormBody;


	constructor(
		wormFarm,
		id,
		length,
		radius = 50,
		circleDivisions = 12,
	) {
		this.id = id;
		this.length = length;
		this.circleDivisions = circleDivisions;
		this.degreeUnit = 360/circleDivisions;

		this.direction = wormfarmApp.space.newAngle();
		this.direction.degrees = Maths.getRandomInt(0,circleDivisions) * this.degreeUnit;


		this.wormBody = document.createElementNS('http://www.w3.org/2000/svg','g');
		this.wormBody.setAttribute('id',this.id);
		this.wormBody.setAttribute('class','worm');
		wormFarm.appendChild(this.wormBody);

		//this.wormBody = document.getElementById(id);

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
		if (x < wormfarmApp.page.xMin ) x += wormfarmApp.page.width;
		if (x > wormfarmApp.page.xMax ) x -= wormfarmApp.page.width;
		return x;
	}

	wrapY(y) {
		if (y < wormfarmApp.page.yMin ) y += wormfarmApp.page.height;
		if (y > wormfarmApp.page.yMax ) y -= wormfarmApp.page.height;
		return y;
	}

}/* Worm */


export const wormFarm = new WormFarm();
