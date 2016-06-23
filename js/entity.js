import {Component} from './component';

class Entity {	
	constructor(name) {
		this.name = name;
		this.components = {};
	}

	getName() {
		return this.name;
	}

	reset() {
		this.name = null;

		for (let name in this.components) {
			this.components[name].cleanup();
		}
		this.components = {};
	}


	/**
	 * COMPONENT MANAGEMENT
	 */
	addComponent(component) {
		var name = component.getName();
		if (this.hasComponent(name)) {
			throw new Error("Adding already existing component " + name);
		}
		this.components[name] = component;
	}

	getComponent(name) {
		if (!this.hasComponent(name)) {
			throw new Error("No component by name " + name);
		}

		return this.components[name];
	}

	removeComponent(name) {
		if (!this.hasComponent(name)) {
			throw new Error("No component by name '" + name + "'");
		}

		delete this.components[name];
	}

	hasComponent(name) {
		return typeof this.components[name] !== 'undefined';
	}
}

export {Entity};


