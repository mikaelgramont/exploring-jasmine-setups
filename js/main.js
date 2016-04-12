/**
 * Just a throw-away file that makes use of the ECS stuff to test
 * the Browserify compilation.
 */
var Component = require('./component');
var Entity = require('./entity');
var System = require('./system');
var Trigger = require('./components/trigger');

var entityA = new Entity("entityA");
entityA.addComponent(new Trigger());
var entityB = new Entity("entityB");

var system = new System();
system.addEntity(entityA);
system.addEntity(entityB);

console.log("All done", system);