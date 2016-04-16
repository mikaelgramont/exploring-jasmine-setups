(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Component = function() {};

Component.NAMES = {
	'TRIGGER': 'trigger',
	'THREEOBJECT': 'threeobject'
};

Component.prototype.getName = function() {
	throw new Error("getName called on abstract Component object");
};

Component.prototype.cleanup = function() {
	throw new Error("cleanup called on abstract Component object");
};

module.exports = Component;
},{}],2:[function(require,module,exports){
var Component = require('../component');

var Trigger = function() {
	Component.call(this);
};

Trigger.prototype.getName = function() {
	return Component.NAMES.TRIGGER;
};

Trigger.prototype.cleanup = function() {
};

module.exports = Trigger;
},{"../component":1}],3:[function(require,module,exports){
var Component = require('./component');

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

module.exports = Entity;



},{"./component":1}],4:[function(require,module,exports){
/**
 * Just a throw-away file that makes use of the ECS stuff to test
 * the Browserify compilation.
 */
var Component = require('./component');
var Entity = require('./entity');
var System = require('./system');
var Trigger = require('./components/trigger');

var entityA = new Entity("entityA");
entityA.addComponent(new Trigger());
var entityB = new Entity("entityB");

var system = new System();
system.addEntity(entityA);
system.addEntity(entityB);

console.log("All done", system);
},{"./component":1,"./components/trigger":2,"./entity":3,"./system":5}],5:[function(require,module,exports){
var System = function() {
	this.entities = [];
};

System.prototype.addEntity = function(entity) {
	this.entities.push(entity);
};

System.prototype.setThreeScene = function(scene) {
	this.scene = scene;
};

System.prototype.reset = function() {
	for (entity of this.entities) {
		entity.reset();
	}	
	this.entities.length = 0;
};

System.prototype.getEntitiesByComponent = function(componentName) {
	return this.entities.filter(function(entity) {
		return entity.hasComponent(componentName);
	});
};

System.prototype.getTriggerableEntities = function() {
	return this.getEntitiesByComponent(Component.NAMES.TRIGGER);
};

System.prototype.getThreeObjectEntities = function() {
	return this.getEntitiesByComponent(Component.NAMES.THREEOBJECT);	
};

module.exports = System;
},{}]},{},[4]);
