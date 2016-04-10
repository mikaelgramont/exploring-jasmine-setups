var Component = require('../component');

var ComponentStub = function(name) {
	this.name = name || "component-stub";
	Component.call(this);
};

ComponentStub.prototype.getName = function() {
	return this.name;
};

ComponentStub.prototype.cleanup = function() {
};

module.exports = ComponentStub;