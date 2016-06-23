import {Trigger} from '../components/trigger';

describe("Trigger", function() {
  var trigger;

  beforeEach(function() {
    trigger = new Trigger();
  });

  it("should say it's a trigger", function() {
    expect(trigger.getName()).toEqual('trigger');
  });

  it("should cleanup after itself", function() {
    expect(function() {
      trigger.cleanup();
    }).not.toThrow();
  });
});
