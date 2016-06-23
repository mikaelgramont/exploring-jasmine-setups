/**
 * Just a throw-away file that makes use of the ECS stuff to test
 * the Browserify compilation.
 */
import {Component} from './component';
import {Entity} from './entity';
import {System} from './system';
import {Trigger} from './components/trigger';

var entityA = new Entity("entityA");
entityA.addComponent(new Trigger());
var entityB = new Entity("entityB");

var system = new System();
system.addEntity(entityA);
system.addEntity(entityB);

console.log("All done", system);