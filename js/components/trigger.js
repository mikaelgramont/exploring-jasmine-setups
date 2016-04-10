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