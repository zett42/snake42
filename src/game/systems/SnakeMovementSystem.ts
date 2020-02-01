import { IntervalIteratingSystem, Family, Entity } from 'typed-ecstasy'
import { PositionComponent } from '../components/PositionComponent'
import { DirectionComponent, Direction, RequestedDirectionComponent, directionToVec2 } from '../components/DirectionComponent'
import { SnakeHeadComponent } from '../components/SnakeHeadComponent'
import { DoubleLinkComponent, insertEntityInDoubleLinkedList, removeLastEntityFromDoubleLinkedList } from '../components/DoubleLinkComponent'
import { FeedableComponent } from '../components/FeedableComponent'
import { createSnakeSegment } from '../factories/SnakeFactory'
import { setEntityPosition } from '../common/SetEntityPosition'
import { PlayField } from '../common/PlayField'
import { IVec2, vec2add } from '../common/Vector'

//---------------------------------------------------------------------------------------------------------------------

export class SnakeMovementSystem extends IntervalIteratingSystem {

    constructor( private _playField: PlayField, private _interval = 0.2 ) {
        super( Family.all( SnakeHeadComponent, PositionComponent, DoubleLinkComponent, DirectionComponent, RequestedDirectionComponent, FeedableComponent ).get(), _interval, /*, priority*/ );
    }

    //.................................................................................................................

    protected processEntity( entity: Entity ): void {

        // Move snake by removing tail and inserting it in front of current head, incrementing position
        // based on DirectionComponent.

        const ecs = this.getEngine()!;

        // Get snake head components
        
        const headComp           = entity.get( SnakeHeadComponent )!;        
        if( ! headComp.isAlive ) {
            return;
        }

        const headPos            = entity.get( PositionComponent )!;
        const direction          = entity.get( DirectionComponent )!;
        const requestedDirection = entity.get( RequestedDirectionComponent )!;
        const feedable           = entity.get( FeedableComponent )!;

        let newSegment: Entity;

        if( feedable.stomach > 0 ) {
            // Snake has eaten something -> insert a new segment.

            newSegment = createSnakeSegment( ecs, this._playField );

            --feedable.stomach;
        }
        else {
            // Snake has not eaten -> keep its length, just move the current tail behind the head.

            const currentTail = ecs.getEntity( headComp.tailId )!;

            const newTail = removeLastEntityFromDoubleLinkedList( ecs, currentTail )!;

            // Make head point to new tail.
            headComp.tailId = newTail.getId();

            newSegment = currentTail;
        }

        // Insert new segment behind head.
        insertEntityInDoubleLinkedList( ecs, newSegment, entity );

        // Set position of new segment to current position of head.
        setEntityPosition( this._playField, newSegment, headPos );

        // Update position of head.
        const directionVec = this.changeDirection( requestedDirection, direction );
        setEntityPosition( this._playField, entity, vec2add( headPos, directionVec ) );
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
