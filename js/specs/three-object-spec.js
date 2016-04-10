var SceneStub = require('../stubs/scene-stub');
var ObjectStub = require('../stubs/object-stub');
var ThreeObject = require('../components/three-object');

describe("Three-Object", function() {
  var three;

  beforeEach(function() {
    three = new ThreeObject(
    	new SceneStub(),
    	new ObjectStub()
    );
  });

  it("should say it's a Three object", function() {
    expect(three.getName()).toEqual('threeobject');
  });

  it("should cleanup after itself", function() {
  	expect(three.getObject()).not.toBeNull();
  	expect(three.getScene()).not.toBeNull();
  	three.cleanup();
  	expect(three.getObject()).toBeNull();
  	expect(three.getScene()).toBeNull();
  });
});
