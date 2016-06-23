(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Component = function Component() {};

Component.NAMES = {
	'TRIGGER': 'trigger',
	'THREEOBJECT': 'threeobject'
};

Component.prototype.getName = function () {
	throw new Error("getName called on abstract Component object");
};

Component.prototype.cleanup = function () {
	throw new Error("cleanup called on abstract Component object");
};

exports.Component = Component;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Trigger = undefined;

var _component = require('../component');

var Trigger = function Trigger() {
	_component.Component.call(this);
};

Trigger.prototype.getName = function () {
	return _component.Component.NAMES.TRIGGER;
};

Trigger.prototype.cleanup = function () {};

exports.Trigger = Trigger;

},{"../component":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Entity = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("./component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
	function Entity(name) {
		_classCallCheck(this, Entity);

		this.name = name;
		this.components = {};
	}

	_createClass(Entity, [{
		key: "getName",
		value: function getName() {
			return this.name;
		}
	}, {
		key: "reset",
		value: function reset() {
			this.name = null;

			for (var name in this.components) {
				this.components[name].cleanup();
			}
			this.components = {};
		}

		/**
   * COMPONENT MANAGEMENT
   */

	}, {
		key: "addComponent",
		value: function addComponent(component) {
			var name = component.getName();
			if (this.hasComponent(name)) {
				throw new Error("Adding already existing component " + name);
			}
			this.components[name] = component;
		}
	}, {
		key: "getComponent",
		value: function getComponent(name) {
			if (!this.hasComponent(name)) {
				throw new Error("No component by name " + name);
			}

			return this.components[name];
		}
	}, {
		key: "removeComponent",
		value: function removeComponent(name) {
			if (!this.hasComponent(name)) {
				throw new Error("No component by name '" + name + "'");
			}

			delete this.components[name];
		}
	}, {
		key: "hasComponent",
		value: function hasComponent(name) {
			return typeof this.components[name] !== 'undefined';
		}
	}]);

	return Entity;
}();

exports.Entity = Entity;

},{"./component":1}],4:[function(require,module,exports){
'use strict';

var _component = require('./component');

var _entity = require('./entity');

var _system = require('./system');

var _trigger = require('./components/trigger');

/**
 * Just a throw-away file that makes use of the ECS stuff to test
 * the Browserify compilation.
 */


var entityA = new _entity.Entity("entityA");
entityA.addComponent(new _trigger.Trigger());
var entityB = new _entity.Entity("entityB");

var system = new _system.System();
system.addEntity(entityA);
system.addEntity(entityB);

console.log("All done", system);

},{"./component":1,"./components/trigger":2,"./entity":3,"./system":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var System = function System() {
	this.entities = [];
};

System.prototype.addEntity = function (entity) {
	this.entities.push(entity);
};

System.prototype.setThreeScene = function (scene) {
	this.scene = scene;
};

System.prototype.reset = function () {
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = this.entities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			entity = _step.value;

			entity.reset();
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	this.entities.length = 0;
};

System.prototype.getEntitiesByComponent = function (componentName) {
	return this.entities.filter(function (entity) {
		return entity.hasComponent(componentName);
	});
};

System.prototype.getTriggerableEntities = function () {
	return this.getEntitiesByComponent(Component.NAMES.TRIGGER);
};

System.prototype.getThreeObjectEntities = function () {
	return this.getEntitiesByComponent(Component.NAMES.THREEOBJECT);
};

exports.System = System;

},{}]},{},[4]);
