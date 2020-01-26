import { Engine as ECS, Entity } from 'typed-ecstasy'
import { SnakeComponent, LinkComponent } from '../components/SnakeComponents'
import { PositionComponent } from '../components/PositionComponent'
import { DirectionComponent, RequestedDirectionComponent, Direction, directionToVec2, randomDirection } from '../components/DirectionComponent'
import { FeedableComponent } from '../components/FeedableComponent'
import { setEntityPosition } from '../common/SetEntityPosition'
import { PlayField } from '../common/PlayField'
import { IVec2 } from '../common/Vector';

//--------------------------------------------------------------------------------------------------------
/**
 * Create initial snake consisting of two segments (head and tail).
 */
export function createSnake( 
    ecs: ECS, playField: PlayField, position: IVec2, direction: Direction = randomDirection() ): Entity {

    const directionVec = directionToVec2( direction );

    const snakeHead = createSnakeSegment( ecs, playField, position );
    ecs.addEntity( snakeHead );

    const tailPosition = { x: position.x - directionVec.x, y: position.y - directionVec.y }
    const snakeTail = createSnakeSegment( ecs, playField, tailPosition, null, snakeHead.getId() );
    ecs.addEntity( snakeTail );

    snakeHead.get( LinkComponent )!.prevId = snakeTail.getId();

    const snake = ecs.createEntity();
    snake.add( new SnakeComponent( snakeHead.getId(), snakeTail.getId() ) );
    snake.add( new DirectionComponent( direction ) );
    snake.add( new RequestedDirectionComponent );
    snake.add( new FeedableComponent );

    return snake;
}

//--------------------------------------------------------------------------------------------------------
/**
 * Create a snake segment.
 */
export function createSnakeSegment(
    ecs: ECS, playField: PlayField, position: IVec2|null = null, prevId: number|null = null, nextId: number|null = null ): Entity {

    const segment = ecs.createEntity();
    segment.add( new PositionComponent );
    segment.add( new LinkComponent( prevId, nextId ) );

    if( position !== null ) {
        setEntityPosition( playField, segment, position );
    }

    return segment;
}
