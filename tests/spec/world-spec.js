describe('World', function() {
	it("should return a list of entities with a stub component", function() {
		var entityA = new Entity("entityA");
		entityA.addComponent(new ComponentStub());
		var entityB = new Entity("entityB");

		var world = new World();
		world.addEntity(entityA);
		world.addEntity(entityB);

		expect(world.getEntitiesByComponent('component-stub')).toEqual([entityA]);
	});
});