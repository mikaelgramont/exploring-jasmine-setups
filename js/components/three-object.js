var Component = require('../component');

var ThreeObject = function(scene, object) {
	Component.call(this);
	this.scene = scene;
	this.object = object;
};

ThreeObject.prototype.getName = function() {
	return Component.NAMES.THREEOBJECT;
};

ThreeObject.prototype.getObject = function() {
	return this.object;
};

ThreeObject.prototype.getScene = function() {
	return this.scene;
};

ThreeObject.prototype.cleanup = function() {
	this.scene.remove(
		this.scene.getObjectByName(this.object.name)
	);
	this.object = null;
	this.scene = null;
};

module.exports = ThreeObject;