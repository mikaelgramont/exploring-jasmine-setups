import {SceneStub} from '../stubs/scene-stub';
import {ObjectStub} from '../stubs/object-stub';
import {ThreeObject} from '../components/three-object';

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
