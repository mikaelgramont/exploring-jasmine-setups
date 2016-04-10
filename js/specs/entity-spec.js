var ComponentStub = require('../stubs/component-stub');
var Entity = require('../entity');

describe("Entity", function() {
  var componentA;
  var componentB;
  var entity;

  beforeEach(function() {
    componentA = new ComponentStub('A');
    componentB = new ComponentStub('B');
    entity = new Entity('my-entity');
  });

  it("should return the entity's name", function() {
    expect(entity.getName()).toEqual('my-entity');
  });

  it("should store and retrieve components", function() {
    entity.addComponent(componentA);
    entity.addComponent(componentB);

    expect(entity.getComponent('A')).toEqual(componentA);
    expect(entity.getComponent('B')).toEqual(componentB);
  });

  it("should throw an error when adding an existing component", function() {
    entity.addComponent(componentA);

    expect(function() {
        entity.addComponent(componentA);
    }).toThrow();
  });

  it("should return true when asking about present components", function() {
    entity.addComponent(componentA);
    expect(entity.hasComponent('A')).toEqual(true);
  });

  it("should return false when asking about absent components", function() {
    expect(entity.hasComponent('absent')).toEqual(false);
  });

  it("should throw an error when seeking absent components", function() {
    expect(function() {
      entity.getComponent('absent');
    }).toThrow();
  });

  it("should be able to remove components", function() {
    entity.addComponent(componentA);
    entity.removeComponent('A');
    expect(entity.hasComponent('A')).toEqual(false);
  });

  it("should throw an error when removing absent components", function() {
    expect(function() {
      entity.removeComponent('absent');
    }).toThrow();
  });

  it("should return to a clean state on reset", function() {
    entity.addComponent(componentA);
    entity.reset();
    expect(entity.hasComponent('A')).toEqual(false);
    expect(entity.getName()).toBeNull();
  });

});
