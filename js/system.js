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

export {System};
