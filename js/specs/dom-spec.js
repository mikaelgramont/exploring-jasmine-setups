describe("DOM opreations", function() {
	it("should have access to DOM operations", function() {
		expect(document.getElementById).not.toBeNull();
	});
});