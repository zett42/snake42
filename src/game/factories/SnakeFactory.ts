import { Engine as ECS, Entity } from 'typed-ecstasy'
import { SnakeHeadComponent } from '../components/SnakeHeadComponent'
import { DoubleLinkComponent, appendEntityToDoubleLinkedList } from '../components/DoubleLinkComponent'
import { PositionComponent } from '../components/PositionComponent'
import { DirectionComponent, RequestedDirectionComponent, Direction, directionToVec2, randomDirection } from '../components/DirectionComponent'
import { FeedableComponent } from '../components/FeedableComponent'
import { setEntityPosition } from '../common/SetEntityPosition'
import { PlayField } from '../common/PlayField'
import { IVec2, vec2add, vec2sub } from '../common/Vector';

//--------------------------------------------------------------------------------------------------------
/**
 * Create initial snake consisting of three segments (head, middle and tail).
 */
export function createAndAddSnake( 
    ecs: ECS, playField: PlayField, position: IVec2, direction: Direction = randomDirection() ) {

    const directionVec = directionToVec2( direction );

    const snakeTail = createSnakeSegment( ecs, playField, vec2sub( position, directionVec ) );
    ecs.addEntity( snakeTail );

    const snakeMiddle = createSnakeSegment( ecs, playField, position );
    ecs.addEntity( snakeMiddle );

    const snakeHead = createSnakeSegment( ecs, playField, vec2add( position, directionVec ) );
    snakeHead.add( new SnakeHeadComponent( snakeTail.getId() ) );
    snakeHead.add( new DirectionComponent( direction ) );
    snakeHead.add( new RequestedDirectionComponent );
    snakeHead.add( new FeedableComponent );
    ecs.addEntity( snakeHead );

    appendEntityToDoubleLinkedList( snakeTail, snakeMiddle );
    appendEntityToDoubleLinkedList( snakeMiddle, snakeHead );
}

//--------------------------------------------------------------------------------------------------------
/**
 * Create a snake segment.
 */
export function createSnakeSegment(
    ecs: ECS, playField: PlayField, position: IVec2|null = null ): Entity {

    const segment = ecs.createEntity();
    segment.add( new PositionComponent );
    segment.add( new DoubleLinkComponent );

    if( position !== null ) {
        setEntityPosition( playField, segment, position );
    }

    return segment;
}
