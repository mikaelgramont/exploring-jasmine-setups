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
	name = component.getName();
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