//
//	wormfarmApp.js
//

import { HTMLApp } from "./HTMLApp.js";
import { Character } from "./Character.js";

import { SVG } from "./SVG.js";
import { PlanarSpace } from "./PlanarSpace.js";

import * as controller from './controller.js';
import { svg } from './view-svg.js';
import { ui } from './view-html-ui.js';


class WormFarmApp extends HTMLApp {

	info = `
		Worm Farm v0.0.0 by ldpercy
		https://github.com/ldpercy/worm-farm/pull/??
	`.replace(/\n\t\t/g,'\n');


	elementMap = {
		applicationForm		: 'form-application',
		pageForm			: 'form-page',
		svg					: 'svg-element',
		page				: 'group-page',
		drawing				: 'group-drawing',
	};

	eventListeners = [
		{
			query: '#button-origin',
			type: 'click',
			listener: controller.toOrigin
		},
		{
			query: '#form-page',
			type: 'change',
			listener: controller.updatePage
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


		this.page = new SVG.Rectangle(-2400, -2400, 4800, 4800);
		//this.page = new SVG.Rectangle(0, 0, 2100, 2970);		// A4 page
		//const pageViewBox = new SVG.Rectangle(0, -2970, 2100, 2970);
		this.viewBox = new SVG.ViewBox(this.page);

		this.element.svg.setAttribute('viewBox', this.viewBox.toStringPadded(100));

		this.space = new PlanarSpace('wormfarm-space');
		this.character = new Character('Barry', 'character-barry', this.space, 6);


		//this.viewBox = new SVG.viewBox().fromString('-1200 -1200 2400 2400');

		const firstLoad = !localStorage.appSettings;

		this.loadSettings();


		svg.updatePage();
		svg.updateCharacter();

		svg.drawGrid();
		ui.updateCharacterInfo();

		localStorage.setItem('documentDOMContentLoaded', new Date().toISOString());
		sessionStorage.setItem('documentDOMContentLoaded', new Date().toISOString());

		// if (firstLoad) {
		// 	console.log('first load')
		// }
	}/* documentDOMContentLoaded */











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
			page		: this.getFormData(this.element.pageForm),
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
			this.populateForm(this.element.pageForm, appSettings.page);
		}
		else {
			// first load

		}
		localStorage.setItem('loadedAt', new Date().toISOString());
	}/* loadSettings */




}/* wormfarmApp */




export const wormfarmApp = new WormFarmApp();

