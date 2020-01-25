import { Engine as ECS, IntervalIteratingSystem, Family, Entity } from 'typed-ecstasy'
import { PositionComponent, VelocityComponent } from './PositionComponent'
import { SnakeComponent, LinkComponent } from './SnakeComponents'

export class SnakeMovementSystem extends IntervalIteratingSystem {

    constructor() {
        const interval = 0.2;
        super( Family.all( SnakeComponent, VelocityComponent ).get(), interval, /*, priority*/ );
    }

    protected processEntity( entity: Entity ): void {

        // Move snake by removing tail and inserting it in front of current head.

        const ecs = this.getEngine()!;

        const snake    = entity.get( SnakeComponent )!;
        const velocity = entity.get( VelocityComponent )!;

        const head     = ecs.getEntity( snake.headId )!;
        const headLink = head.get( LinkComponent )!;
        const headPos  = head.get( PositionComponent )!;

        const tail     = ecs.getEntity( snake.tailId )!;
        const tailLink = tail.get( LinkComponent )!;

        const newTail      = ecs.getEntity( tailLink.nextId! )!;
        const newTailLink  = newTail!.get( LinkComponent )!;
        newTailLink.prevId = null;

        const newHead = tail;
        const newHeadLink = tailLink;
        newHeadLink.nextId = null;
        newHeadLink.prevId = head.getId();

        headLink.nextId = newHead.getId();
        
        const newHeadPos = newHead.get( PositionComponent )!;
        newHeadPos.x = headPos.x + velocity.x;
        newHeadPos.y = headPos.y + velocity.y;

        snake.tailId = newTail.getId();
        snake.headId = newHead.getId();
    }
}
