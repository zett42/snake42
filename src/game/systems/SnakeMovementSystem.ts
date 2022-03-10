import Container, { Service } from 'typedi'
import { IntervalIteratingSystem, Family, Entity } from 'typed-ecstasy'
import { PositionComponent } from '@components/PositionComponent'
import { DirectionComponent, Direction, RequestedDirectionComponent, directionToVec2 } from '@components/DirectionComponent'
import { SnakeHeadComponent } from '@components/SnakeHeadComponent'
import { DoubleLinkComponent, insertEntityInDoubleLinkedList, removeLastEntityFromDoubleLinkedList } from '@components/DoubleLinkComponent'
import { FeedableComponent } from '@components/FeedableComponent'
import { createSnakeSegment } from '@factories/SnakeFactory'
import { setEntityPosition } from '@common/SetEntityPosition'
import { PlayField } from '@common/PlayField'
import { IVec2, vec2add } from '@common/Vector'

//---------------------------------------------------------------------------------------------------------------------

@Service()
export class SnakeMovementSystem extends IntervalIteratingSystem {

    constructor( public _playField: PlayField ) {

        super( Family.all( SnakeHeadComponent, PositionComponent, DoubleLinkComponent, DirectionComponent, RequestedDirectionComponent, FeedableComponent ).get(),
               0 )
    }

    //.................................................................................................................

    protected processEntity( entity: Entity ): void {

        const _playField = Container.get( PlayField )
        console.log( "SnakeMovementSystem playField: ", _playField.width, _playField.height  )
    
        //console.log( "playField: ", this._playField.width, this._playField.height  )

        // Move snake by removing tail and inserting it in front of current head, incrementing position
        // based on DirectionComponent.

        // Get snake head components

        const headComp = entity.get( SnakeHeadComponent )!
        if( !headComp.isAlive ) {
            return
        }

        const headPos = entity.get( PositionComponent )!
        const direction = entity.get( DirectionComponent )!
        const requestedDirection = entity.get( RequestedDirectionComponent )!
        const feedable = entity.get( FeedableComponent )!

        let newSegment: Entity

        if( feedable.stomach > 0 ) {
            // Snake has eaten something -> insert a new segment.

            newSegment = createSnakeSegment( this.engine, this._playField )

            ++headComp.length

            --feedable.stomach
        }
        else {
            // Snake has not eaten -> keep its length, just move the current tail behind the head.

            const currentTail = this.engine.entities.get( headComp.tailId )!

            const newTail = removeLastEntityFromDoubleLinkedList( this.engine, currentTail )!

            // Make head point to new tail.
            headComp.tailId = newTail.getId()

            newSegment = currentTail
        }

        // Insert new segment behind head.
        insertEntityInDoubleLinkedList( this.engine, newSegment, entity )

        // Set position of new segment to current position of head.
        setEntityPosition( this._playField, newSegment, headPos )

        // Update position of head.
        const directionVec = this.changeDirection( requestedDirection, direction )
        setEntityPosition( this._playField, entity, vec2add( headPos, directionVec ) )
    }

    //.................................................................................................................

    private changeDirection( requestedDirection: RequestedDirectionComponent, direction: DirectionComponent ): IVec2 {

        switch( requestedDirection.value ) {
            case Direction.left:
                if( direction.value != Direction.right )
                    direction.value = requestedDirection.value
                break
            case Direction.right:
                if( direction.value != Direction.left )
                    direction.value = requestedDirection.value
                break
            case Direction.up:
                if( direction.value != Direction.down )
                    direction.value = requestedDirection.value
                break
            case Direction.down:
                if( direction.value != Direction.up )
                    direction.value = requestedDirection.value
                break
        }

        return directionToVec2( direction.value )
    }
}
