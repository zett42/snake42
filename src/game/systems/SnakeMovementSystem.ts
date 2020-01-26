import { IntervalIteratingSystem, Family, Entity } from 'typed-ecstasy'
import { PositionComponent } from '../components/PositionComponent'
import { DirectionComponent, Direction, RequestedDirectionComponent, directionToVec2 } from '../components/DirectionComponent'
import { SnakeComponent, LinkComponent } from '../components/SnakeComponents'
import { FeedableComponent } from '../components/FeedableComponent';
import { createSnakeSegment } from '../factories/SnakeFactory';
import { setEntityPosition } from '../setEntityPosition'
import { PlayField } from '../PlayField'
import { IVec2 } from '../Vector'

//---------------------------------------------------------------------------------------------------------------------

export class SnakeMovementSystem extends IntervalIteratingSystem {

    constructor( private _playField: PlayField, private _interval = 0.2 ) {
        super( Family.all( SnakeComponent, DirectionComponent ).get(), _interval, /*, priority*/ );
    }

    //.................................................................................................................

    protected processEntity( entity: Entity ): void {

        // Move snake by removing tail and inserting it in front of current head, incrementing position
        // based on DirectionComponent.

        const ecs = this.getEngine()!;

        // Get snake components
        const snake              = entity.get( SnakeComponent )!;
        const direction          = entity.get( DirectionComponent )!;
        const requestedDirection = entity.get( RequestedDirectionComponent )!;
        const feedable           = entity.get( FeedableComponent )!;

        // Get head and tail entities
        const head = ecs.getEntity( snake.headId )!;
        const tail = ecs.getEntity( snake.tailId )!;

          // Get head components
        const headLink = head.get( LinkComponent )!;
        const headPos  = head.get( PositionComponent )!;

        // Get tail components
        const tailLink = tail.get( LinkComponent )!;

        let newHead: Entity;

        if( feedable.stomach > 0 ) {
            // Snake is currently digesting -> insert a completely new head.

            newHead = createSnakeSegment( ecs, this._playField, null, head.getId() );
            ecs.addEntity( newHead );

            --feedable.stomach;
        }
        else {
            // Snake is not digesting -> keep its length by making a new head from the current tail.

            // Define new tail by setting prevId to null.
            const newTail = ecs.getEntity( tailLink.nextId! )!;
            newTail.get( LinkComponent )!.prevId = null;

            // Turn old tail into new head.
            newHead            = tail;
            const newHeadLink  = tailLink;
            newHeadLink.nextId = null;
            newHeadLink.prevId = head.getId();

            // Let the snake know about the new tail.
            snake.tailId = newTail.getId();
        }

        // Let old head point to new head
        headLink.nextId = newHead.getId();

        // Let the snake know about the new head.
        snake.headId = newHead.getId();

        const directionVec = this.changeDirection( requestedDirection, direction );

        setEntityPosition( this._playField, newHead, headPos.x + directionVec.x, headPos.y + directionVec.y );
    }

    //.................................................................................................................

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
