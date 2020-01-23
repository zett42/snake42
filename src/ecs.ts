import { ECS, makeComponent, Component, System, EntityViewFactory, SystemEntityType } from 'perform-ecs'

// create component
@makeComponent
export class TestPositionComponent extends Component {

    public x: number;
    public y: number;

    // this method will be called on every entity
    // parameters after the first one can be used for passing some data when creating entity
    public reset(obj: this, multipler: number = 1): void {
        obj.x = 10 * multipler;
        obj.y = 5 * multipler;
    }
}

// create system
export class TestPositionSystem extends System {

    // create view which will contain all entities that have 'TestPositionComponent'
    // types are fully supported here!
    public view = EntityViewFactory.createView({
        components: [TestPositionComponent],
        onEntityAdded: this.onEntityAdded.bind(this),
        onEntityRemoved: this.onEntityRemoved.bind(this),
    });

    public onEntityAdded(entity: SystemEntityType<this, "view">): void {
    }

    public onEntityRemoved(entity: SystemEntityType<this, "view">): void {
    }
    
    public update(delta: number): void {
      for(const entity of this.view.entities) {
          entity.x += delta;
          entity.y += delta;
       }
    }
}

// prepare
const ecs = new ECS();
const positionSystem = new TestPositionSystem();
ecs.registerSystem(positionSystem);

// create entity
const entity = ecs.createEntity([
          {component: TestPositionComponent}]);
   
// create entity with arguments    
const entity2 = ecs.createEntity([
          {component: TestPositionComponent, args: [2]}]);   
          
/*
assert(entity.x === 10);
assert(entity.y === 5);
assert(entity2.x === 20);
assert(entity2.y === 10);
*/

// you have to calculate delta on your own - there is no default implementation 
let delta = 0.01;

// system 'update' methods will be called
ecs.update(delta);

console.log( entity );
console.log( entity2 );
