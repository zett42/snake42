import { Engine as ECS, Entity } from 'typed-ecstasy'
import { SnakeHeadComponent } from '@components/SnakeHeadComponent'
import { DoubleLinkComponent, appendEntityToDoubleLinkedList } from '@components/DoubleLinkComponent'
import { PositionComponent } from '@components/PositionComponent'
import { DirectionComponent, RequestedDirectionComponent, Direction, directionToVec2, randomDirection } from '@components/DirectionComponent'
import { FeedableComponent } from '@components/FeedableComponent'
import { setEntityPosition } from '@common/SetEntityPosition'
import { PlayField } from '@common/PlayField'
import { IVec2, vec2add, vec2sub } from '@common/Vector'
import { ObstacleComponent } from '@components/ObstacleComponent'

//--------------------------------------------------------------------------------------------------------
/**
 * Create initial snake consisting of three segments (head, middle and tail).
 */
export function createSnake(
    ecs: ECS, playField: PlayField, position: IVec2, direction: Direction = randomDirection() ): void {

    const directionVec = directionToVec2( direction )

    const snakeTail = createSnakeSegment( ecs, playField, vec2sub( position, directionVec ) )

    const snakeMiddle = createSnakeSegment( ecs, playField, position )

    const snakeHead = createSnakeHead( ecs, playField, vec2add( position, directionVec ), snakeTail, direction, 3 )

    appendEntityToDoubleLinkedList( snakeTail, snakeMiddle )
    appendEntityToDoubleLinkedList( snakeMiddle, snakeHead )
}

//--------------------------------------------------------------------------------------------------------
/**
 * Create a snake segment.
 */
export function createSnakeSegment(
    ecs: ECS, playField: PlayField, position: IVec2 | null = null ): Entity {

    const result = new Entity()

    result.add( new PositionComponent )
    result.add( new DoubleLinkComponent )
    result.add( new ObstacleComponent )  // to detect collision with itself

    ecs.entities.add( result )

    if( position !== null ) {
        setEntityPosition( playField, result, position )
    }

    return result
}

//--------------------------------------------------------------------------------------------------------
/**
 * Create a snake head.
 */
export function createSnakeHead(
    ecs: ECS, playField: PlayField, position: IVec2 | null = null, snakeTail: Entity, direction: Direction, length: number ): Entity {

    const result = new Entity()

    result.add( new PositionComponent )
    result.add( new DoubleLinkComponent )
    result.add( new SnakeHeadComponent( snakeTail.getId(), true, length ) )
    result.add( new DirectionComponent( direction ) )
    result.add( new RequestedDirectionComponent )
    result.add( new FeedableComponent )

    ecs.entities.add( result )

    if( position !== null ) {
        setEntityPosition( playField, result, position )
    }

    return result
}
