var Component = function() {};

Component.NAMES = {
	'TRIGGER': 'trigger',
	'THREEOBJECT': 'threeobject'
};

Component.prototype.getName = function() {
	throw new Error("getName called on abstract Component object");
};

Component.prototype.cleanup = function() {
	throw new Error("cleanup called on abstract Component object");
};

export {Component};