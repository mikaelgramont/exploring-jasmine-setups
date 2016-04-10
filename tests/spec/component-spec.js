describe("Component", function() {
  var component;

  beforeEach(function() {
    component = new Component();
  });

  it("should throw when getting the abstract component name", function() {
    expect(function(){
      component.getName();
    }).toThrow();
  });
});
