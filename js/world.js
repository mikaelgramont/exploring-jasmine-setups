var World = function() {
	this.entities = [];
};

World.prototype.addEntity = function(entity) {
	this.entities.push(entity);
};

World.prototype.setThreeScene = function(scene) {
	this.scene = scene;
};

World.prototype.reset = function() {
	for (entity of this.entities) {
		entity.reset();
	}	
	this.entities.length = 0;
};

World.prototype.getEntitiesByComponent = function(componentName) {
	return this.entities.filter(function(entity) {
		return entity.hasComponent(componentName);
	});
};

World.prototype.getTriggerableEntities = function() {
	return this.getEntitiesByComponent(Component.NAMES.TRIGGER);
};

World.prototype.getThreeObjectEntities = function() {
	return this.getEntitiesByComponent(Component.NAMES.THREEOBJECT);	
};