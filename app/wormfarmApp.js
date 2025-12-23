//
//	wormfarmApp.js
//

import { HTMLApp } from "./library/HTMLApp.js";
import { Character } from "./Character.js";

import { SVG } from "./library/SVG.js";
import { PlanarSpace } from "./library/PlanarSpace.js";

import * as controller from './controller.js';
import { svg } from './view-svg.js';
import { ui } from './view-html-ui.js';
import { WormFarm } from './view-wormFarm.js';


class WormFarmApp extends HTMLApp {

	info = `
		Worm Farm v0.0.0 by ldpercy
		https://github.com/ldpercy/worm-farm/pull/??
	`.replace(/\n\t\t/g,'\n');

	elementMap = {
		applicationForm		: 'form-application',
		spaceForm			: 'form-space',
		svg					: 'svg-element',
		space				: 'group-space',
		drawing				: 'group-drawing',
	};

	eventListeners = [
		{
			query: '#button-startStop',
			type: 'click',
			listener: controller.animationStartStop,
		},
		{
			query: '#button-forward',
			type: 'click',
			listener: controller.animationForward,
		},
		{
			query: '#button-origin',
			type: 'click',
			listener: controller.toOrigin
		},
		{
			query: '#form-space',
			type: 'change',
			listener: controller.updateSpace
		},
		{
			element: document,
			type: 'visibilitychange',
			listener: this.visibilitychangeListener
		},
		{
			query: '#svg-element',
			type: 'click',
			listener: controller.svgClickListener
		},
		// {
		// 	query: '#svg-element',
		// 	type: 'keydown',
		// 	listener: controller.svgKeyListener
		// },
		{
			element: document,
			type: 'keydown',
			listener: controller.documentKeyListener
		},
		{
			query: '#button-clearPoint',
			type: 'click',
			listener: svg.clearPoint,
		},

	];




	documentDOMContentLoaded() {
		super.documentDOMContentLoaded();

		const firstLoad = !localStorage.appSettings;

		this.loadSettings();


		localStorage.setItem('documentDOMContentLoaded', new Date().toISOString());
		sessionStorage.setItem('documentDOMContentLoaded', new Date().toISOString());

		// if (firstLoad) {
		// 	console.log('first load')
		// }

		this.setup();

	}/* documentDOMContentLoaded */



	setup() {

		this.dimensions = new SVG.Rectangle(-2400, -2400, 4800, 4800);

		this.viewBox = new SVG.ViewBox(this.dimensions);

		this.element.svg.setAttribute('viewBox', this.viewBox.toStringPadded(100));

		this.space = new PlanarSpace('wormfarm-space', this.dimensions);
		this.character = new Character('Barry', 'character-barry', this.space, 6);
		this.wormfarm = new WormFarm(this.space);
		this.wormfarm.populate(3);

		svg.updateSpace();
		svg.updateCharacter();

		svg.drawGrid();
		ui.updateCharacterInfo();
	}









	//
	// application lifecycle
	//


	visibilitychangeListener() {
		//console.debug('visibilitychangeListener', arguments);
		//console.debug('document.visibilityState', document.visibilityState);
		if (document.visibilityState === 'hidden')
		{
			this.saveSettings();
		}
	}



	/* saveSettings
	*/
	saveSettings() {

		// Note caveats: https://stackoverflow.com/a/55874235

		const appSettings = {
			application	: this.getFormData(this.element.applicationForm),
			space		: this.getFormData(this.element.spaceForm),
		};

		//console.log(appSettings);

		const appSettingsJson = JSON.stringify(appSettings);
		localStorage.setItem('appSettings', appSettingsJson );
		localStorage.setItem('savedAt', new Date().toISOString());
		//.log('Settings saved');
	}/* saveSettings */


	loadSettings() {
		//console.log('Settings loaded');
		if (localStorage.appSettings) {

			const appSettings = JSON.parse(localStorage.appSettings);
			this.populateForm(this.element.applicationFormForm, appSettings.application);
			this.populateForm(this.element.spaceForm, appSettings.space);
		}
		else {
			// first load

		}
		localStorage.setItem('loadedAt', new Date().toISOString());
	}/* loadSettings */




}/* wormfarmApp */




export const wormfarmApp = new WormFarmApp();

