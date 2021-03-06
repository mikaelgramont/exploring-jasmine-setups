import {ComponentStub} from '../stubs/component-stub';
import {Entity} from '../entity';
import {System} from '../system';

describe('System', function() {
	it("should return a list of entities with a stub component", function() {
		var entityA = new Entity("entityA");
		entityA.addComponent(new ComponentStub());
		var entityB = new Entity("entityB");

		var system = new System();
		system.addEntity(entityA);
		system.addEntity(entityB);

		expect(system.getEntitiesByComponent('component-stub')).toEqual([entityA]);
	});
});