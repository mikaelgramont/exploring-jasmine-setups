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

var Entity = function(name) {
	this.name = name;
	this.components = {};
};

Entity.prototype.getName = function() {
	return this.name;
};

Entity.prototype.reset = function() {
	this.name = null;

	for (var name in this.components) {
		this.components[name].cleanup();
	}
	this.components = {};
}

/**
 * COMPONENT MANAGEMENT
 */

Entity.prototype.addComponent = function(component) {
	var name = component.getName();
	if (this.hasComponent(name)) {
		throw new Error("Adding already existing component " + name);
	}
	this.components[name] = component;
};

Entity.prototype.getComponent = function(name) {
	if (!this.hasComponent(name)) {
		throw new Error("No component by name " + name);
	}

	return this.components[name];
};

Entity.prototype.removeComponent = function(name) {
	if (!this.hasComponent(name)) {
		throw new Error("No component by name '" + name + "'");
	}

	delete this.components[name];
};

Entity.prototype.hasComponent = function(name) {
	return typeof this.components[name] !== 'undefined';
};

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
},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImpzL2NvbXBvbmVudC5qcyIsImpzL2NvbXBvbmVudHMvdHJpZ2dlci5qcyIsImpzL2VudGl0eS5qcyIsImpzL21haW4uanMiLCJqcy9zeXN0ZW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIENvbXBvbmVudCA9IGZ1bmN0aW9uKCkge307XG5cbkNvbXBvbmVudC5OQU1FUyA9IHtcblx0J1RSSUdHRVInOiAndHJpZ2dlcicsXG5cdCdUSFJFRU9CSkVDVCc6ICd0aHJlZW9iamVjdCdcbn07XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuZ2V0TmFtZSA9IGZ1bmN0aW9uKCkge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJnZXROYW1lIGNhbGxlZCBvbiBhYnN0cmFjdCBDb21wb25lbnQgb2JqZWN0XCIpO1xufTtcblxuQ29tcG9uZW50LnByb3RvdHlwZS5jbGVhbnVwID0gZnVuY3Rpb24oKSB7XG5cdHRocm93IG5ldyBFcnJvcihcImNsZWFudXAgY2FsbGVkIG9uIGFic3RyYWN0IENvbXBvbmVudCBvYmplY3RcIik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudDsiLCJ2YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50Jyk7XG5cbnZhciBUcmlnZ2VyID0gZnVuY3Rpb24oKSB7XG5cdENvbXBvbmVudC5jYWxsKHRoaXMpO1xufTtcblxuVHJpZ2dlci5wcm90b3R5cGUuZ2V0TmFtZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gQ29tcG9uZW50Lk5BTUVTLlRSSUdHRVI7XG59O1xuXG5UcmlnZ2VyLnByb3RvdHlwZS5jbGVhbnVwID0gZnVuY3Rpb24oKSB7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyaWdnZXI7IiwidmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4vY29tcG9uZW50Jyk7XG5cbnZhciBFbnRpdHkgPSBmdW5jdGlvbihuYW1lKSB7XG5cdHRoaXMubmFtZSA9IG5hbWU7XG5cdHRoaXMuY29tcG9uZW50cyA9IHt9O1xufTtcblxuRW50aXR5LnByb3RvdHlwZS5nZXROYW1lID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLm5hbWU7XG59O1xuXG5FbnRpdHkucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMubmFtZSA9IG51bGw7XG5cblx0Zm9yICh2YXIgbmFtZSBpbiB0aGlzLmNvbXBvbmVudHMpIHtcblx0XHR0aGlzLmNvbXBvbmVudHNbbmFtZV0uY2xlYW51cCgpO1xuXHR9XG5cdHRoaXMuY29tcG9uZW50cyA9IHt9O1xufVxuXG4vKipcbiAqIENPTVBPTkVOVCBNQU5BR0VNRU5UXG4gKi9cblxuRW50aXR5LnByb3RvdHlwZS5hZGRDb21wb25lbnQgPSBmdW5jdGlvbihjb21wb25lbnQpIHtcblx0dmFyIG5hbWUgPSBjb21wb25lbnQuZ2V0TmFtZSgpO1xuXHRpZiAodGhpcy5oYXNDb21wb25lbnQobmFtZSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJBZGRpbmcgYWxyZWFkeSBleGlzdGluZyBjb21wb25lbnQgXCIgKyBuYW1lKTtcblx0fVxuXHR0aGlzLmNvbXBvbmVudHNbbmFtZV0gPSBjb21wb25lbnQ7XG59O1xuXG5FbnRpdHkucHJvdG90eXBlLmdldENvbXBvbmVudCA9IGZ1bmN0aW9uKG5hbWUpIHtcblx0aWYgKCF0aGlzLmhhc0NvbXBvbmVudChuYW1lKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIk5vIGNvbXBvbmVudCBieSBuYW1lIFwiICsgbmFtZSk7XG5cdH1cblxuXHRyZXR1cm4gdGhpcy5jb21wb25lbnRzW25hbWVdO1xufTtcblxuRW50aXR5LnByb3RvdHlwZS5yZW1vdmVDb21wb25lbnQgPSBmdW5jdGlvbihuYW1lKSB7XG5cdGlmICghdGhpcy5oYXNDb21wb25lbnQobmFtZSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJObyBjb21wb25lbnQgYnkgbmFtZSAnXCIgKyBuYW1lICsgXCInXCIpO1xuXHR9XG5cblx0ZGVsZXRlIHRoaXMuY29tcG9uZW50c1tuYW1lXTtcbn07XG5cbkVudGl0eS5wcm90b3R5cGUuaGFzQ29tcG9uZW50ID0gZnVuY3Rpb24obmFtZSkge1xuXHRyZXR1cm4gdHlwZW9mIHRoaXMuY29tcG9uZW50c1tuYW1lXSAhPT0gJ3VuZGVmaW5lZCc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVudGl0eTsiLCIvKipcbiAqIEp1c3QgYSB0aHJvdy1hd2F5IGZpbGUgdGhhdCBtYWtlcyB1c2Ugb2YgdGhlIEVDUyBzdHVmZiB0byB0ZXN0XG4gKiB0aGUgQnJvd3NlcmlmeSBjb21waWxhdGlvbi5cbiAqL1xudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4vY29tcG9uZW50Jyk7XG52YXIgRW50aXR5ID0gcmVxdWlyZSgnLi9lbnRpdHknKTtcbnZhciBTeXN0ZW0gPSByZXF1aXJlKCcuL3N5c3RlbScpO1xudmFyIFRyaWdnZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdHJpZ2dlcicpO1xuXG52YXIgZW50aXR5QSA9IG5ldyBFbnRpdHkoXCJlbnRpdHlBXCIpO1xuZW50aXR5QS5hZGRDb21wb25lbnQobmV3IFRyaWdnZXIoKSk7XG52YXIgZW50aXR5QiA9IG5ldyBFbnRpdHkoXCJlbnRpdHlCXCIpO1xuXG52YXIgc3lzdGVtID0gbmV3IFN5c3RlbSgpO1xuc3lzdGVtLmFkZEVudGl0eShlbnRpdHlBKTtcbnN5c3RlbS5hZGRFbnRpdHkoZW50aXR5Qik7XG5cbmNvbnNvbGUubG9nKFwiQWxsIGRvbmVcIiwgc3lzdGVtKTsiLCJ2YXIgU3lzdGVtID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuZW50aXRpZXMgPSBbXTtcbn07XG5cblN5c3RlbS5wcm90b3R5cGUuYWRkRW50aXR5ID0gZnVuY3Rpb24oZW50aXR5KSB7XG5cdHRoaXMuZW50aXRpZXMucHVzaChlbnRpdHkpO1xufTtcblxuU3lzdGVtLnByb3RvdHlwZS5zZXRUaHJlZVNjZW5lID0gZnVuY3Rpb24oc2NlbmUpIHtcblx0dGhpcy5zY2VuZSA9IHNjZW5lO1xufTtcblxuU3lzdGVtLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuXHRmb3IgKGVudGl0eSBvZiB0aGlzLmVudGl0aWVzKSB7XG5cdFx0ZW50aXR5LnJlc2V0KCk7XG5cdH1cdFxuXHR0aGlzLmVudGl0aWVzLmxlbmd0aCA9IDA7XG59O1xuXG5TeXN0ZW0ucHJvdG90eXBlLmdldEVudGl0aWVzQnlDb21wb25lbnQgPSBmdW5jdGlvbihjb21wb25lbnROYW1lKSB7XG5cdHJldHVybiB0aGlzLmVudGl0aWVzLmZpbHRlcihmdW5jdGlvbihlbnRpdHkpIHtcblx0XHRyZXR1cm4gZW50aXR5Lmhhc0NvbXBvbmVudChjb21wb25lbnROYW1lKTtcblx0fSk7XG59O1xuXG5TeXN0ZW0ucHJvdG90eXBlLmdldFRyaWdnZXJhYmxlRW50aXRpZXMgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuZ2V0RW50aXRpZXNCeUNvbXBvbmVudChDb21wb25lbnQuTkFNRVMuVFJJR0dFUik7XG59O1xuXG5TeXN0ZW0ucHJvdG90eXBlLmdldFRocmVlT2JqZWN0RW50aXRpZXMgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuZ2V0RW50aXRpZXNCeUNvbXBvbmVudChDb21wb25lbnQuTkFNRVMuVEhSRUVPQkpFQ1QpO1x0XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5c3RlbTsiXX0=
