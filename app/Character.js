/* Character
*/



export class Character {

	name;
	space;
	history = [];
	precision = {};
	position;

	constructor(
			name,
			id,
			space,
			reportPrecision = 6,
		) {

		this.name = name;
		this.id = id;
		this.space = space;
		this.position = space.newPosition(`${name}-position`),
		this.precision.report = reportPrecision;
		this.history.length = 5;
		this.history.push(this.getHistoryItem(this.position));
		this.history.shift();
	}

	//
	// Accessors
	//

	get x()         { return this.position.x; }
	get y()         { return this.position.y; }
	get direction() { return this.position.direction; }
	get svgX()      { return +this.x;}
	get svgY()      { return -this.y; }

	get coordinates()			{ return this.position.coordinates; }
	get currentCoordinates()	{ return this.history[this.history.length-1]; }
	get previousCoordinates()	{ return this.history[this.history.length-2]; }





	get characterSvg() {
		const result = `
			<g id="${this.id}">
				<g class="character barry character-hover">
					<title id="title-character"></title>
					<g class="feet">
						<circle class="fl"/>
						<circle class="fr"/>
						<circle class="bl"/>
						<circle class="br"/>
					</g>
					<circle class="body"/>
					<circle class="head"/>
					<g class="eyes">
						<path d="m -3,-38 a 6,6 0 1 0 -10,0 z"/>
						<path d="m +3,-38 a 6,6 0 1 1 +10,0 z"/>
					</g>
				</g>
			</g>
		`;
		return result;
	}



	//
	// mutators
	//

	circle(r) {
		const result = `<circle cx="${this.svgX}" cy="${this.svgY}" r="${r}"/>`;
		return result;
	}

	rect(width, height) {
		const result = `<rect x="${this.x - width/2}" y="${this.svgY - height/2}" width="${width}" height="${height}" transform="rotate(${this.direction.degrees},${this.x},${this.svgY})"/>`;
		return result;
	}

	ellipse(width, height) {
		const rx = width / 2;
		const ry = height / 2;
		const result = `<ellipse cx="${this.x}" cy="${this.svgY}" rx="${rx}" ry="${ry}" transform="rotate(${this.direction.degrees},${this.x},${this.svgY})"/>`;
		return result;
	}

	text(text) {
		const result = `<text x="${this.x}" y="${this.svgY}" transform="rotate(${this.direction.degrees},${this.x},${this.svgY})">${text}</text>`;
		return result;
	}

	marker() {
		const result = `
			<use href="#def-marker" class="marker" x="${this.x}" y="${this.svgY}" transform="rotate(${this.direction.degrees},${this.x},${this.svgY})">
				<title>${this.report}</title>
			</use>
		`;
		return result;
	}




	moveToXY(x,y) {
		//this.character.moveToXY(x,y);
	}

	moveToXYwithRotate(x,y) {
		//this.character.moveToXYwithRotate(x,y);
	}



	get report() {
		const originAngle = this.position.location.angle;

		//console.debug('coordinates:...', this.character.coordinates);
		//console.debug('this.position:...', this.position);


		// title text preserves whitespace, so:
		const result = [
			`character: ${this.name}`,
			`cartesian:`,
			`	x: ${this.x.toPrecision(this.precision.report)}`,
			`	y: ${this.y.toPrecision(this.precision.report)}`,
			`direction:`,
			`	${this.position.direction.degrees.toPrecision(this.precision.report)}°`,
			`	${this.position.direction.radians.toPrecision(this.precision.report)} rad`,
			`	${this.position.direction.radiansPi.toPrecision(this.precision.report)} π rad`,
			`	${this.position.direction.radiansTau.toPrecision(this.precision.report)} τ rad`,
			`polar:`,
			`	r: ${this.position.radius.toPrecision(this.precision.report)}`,
			`	a: ${originAngle.degrees.toPrecision(this.precision.report)}°`,
			`	a: ${originAngle.radians.toPrecision(this.precision.report)} rad`,
			`	a: ${originAngle.radiansPi.toPrecision(this.precision.report)} π rad`,
			`	a: ${originAngle.radiansTau.toPrecision(this.precision.report)} τ rad`,
			`svg:`,
			`	x: ${this.svgX.toPrecision(this.precision.report)}`,
			`	y: ${this.svgY.toPrecision(this.precision.report)}`,
			//`history:`,
			//`	${this.history.map((item) => { return `direction:${item.direction.degrees}; x:${item.x}; y:${item.y};`;}).join('\n	')}`,
		].join('\n');
		return result;
	}







	toString() {
		//let result = super.toString();
		let result = `Character| x:${this.x.toPrecision(this.precision.report)}; y:${this.y.toPrecision(this.precision.report)}; direction:${this.direction.degrees};`;
		return result;
	}


	/* A shallow copy of a point suitable for sticking into the history array
	*/
	getHistoryItem(position) {
		//console.log(position);
		const result = {
			x : position.location.x,
			y : position.location.y,
			direction : new this.space.Angle(position.direction.degrees),
		};

		return result;
	}




}/* Character */



