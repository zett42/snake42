import { IntervalIteratingSystem, Family, Entity } from 'typed-ecstasy'
import { PositionComponent } from '../components/PositionComponent'
import { DirectionComponent, Direction, RequestedDirectionComponent, directionToVec2 } from '../components/DirectionComponent'
import { SnakeComponent, LinkComponent } from '../components/SnakeComponents'
import { setEntityPosition } from '../setEntityPosition'
import { PlayField } from '../PlayField'
import { IVec2 } from '../Vector'

export class SnakeMovementSystem extends IntervalIteratingSystem {

    constructor( private _playField: PlayField, private _interval = 0.2 ) {
        super( Family.all( SnakeComponent, DirectionComponent ).get(), _interval, /*, priority*/ );
    }

    protected processEntity( entity: Entity ): void {

        // Move snake by removing tail and inserting it in front of current head, incrementing position
        // based on DirectionComponent.

        const ecs = this.getEngine()!;

        const snake = entity.get( SnakeComponent )!;
        const direction = entity.get( DirectionComponent )!;
        const requestedDirection = entity.get( RequestedDirectionComponent )!;

        const head     = ecs.getEntity( snake.headId )!;
        const headLink = head.get( LinkComponent )!;
        const headPos  = head.get( PositionComponent )!;

        const tail     = ecs.getEntity( snake.tailId )!;
        const tailLink = tail.get( LinkComponent )!;

        const newTail      = ecs.getEntity( tailLink.nextId! )!;
        const newTailLink  = newTail.get( LinkComponent )!;
        newTailLink.prevId = null;

        const newHead      = tail;
        const newHeadLink  = tailLink;
        newHeadLink.nextId = null;
        newHeadLink.prevId = head.getId();

        headLink.nextId = newHead.getId();
        
        snake.tailId = newTail.getId();
        snake.headId = newHead.getId();

        const directionVec = this.changeDirection( requestedDirection, direction );

        setEntityPosition( this._playField, newHead, headPos.x + directionVec.x, headPos.y + directionVec.y );
    }

    private changeDirection( requestedDirection: RequestedDirectionComponent, direction: DirectionComponent ): IVec2 {

        switch( requestedDirection.value ) {
            case Direction.left:
                if( direction.value != Direction.right )
                    direction.value = requestedDirection.value;
                break;
            case Direction.right:
                if( direction.value != Direction.left )
                    direction.value = requestedDirection.value;
                break;
            case Direction.up:
                if( direction.value != Direction.down )
                    direction.value = requestedDirection.value;
                break;
            case Direction.down:
                if( direction.value != Direction.up )
                    direction.value = requestedDirection.value;
                break;
        }

        return directionToVec2( direction.value );
    }
}
