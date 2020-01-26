import { Engine as ECS, Component } from 'typed-ecstasy'
import { PositionComponent } from './PositionComponent'
import { DirectionComponent, RequestedDirectionComponent, Direction, directionToVec2, randomDirection } from './DirectionComponent'
import { setEntityPosition } from '../setEntityPosition'
import { PlayField } from '../PlayField'

//--------------------------------------------------------------------------------------------------------
/**
 * Component that defines head and tail of snake.
 */
export class SnakeComponent extends Component {

    constructor( public headId = 0, public tailId = 0 ) {
        super();
    }
}

//--------------------------------------------------------------------------------------------------------
/**
 * Component that defines connection between snake segments.
 */
export class LinkComponent extends Component {

    constructor( 
        public prevId: number | null = null,  // previous entity (towards tail)
        public nextId: number | null = null  // next entity (towards head)
    ) {
        super();
    }
}

//--------------------------------------------------------------------------------------------------------
/**
 * Create initial snake consisting of two segments (head and tail).
 * @param ecs 
 * @param playField 
 * @param x 
 * @param y 
 */
export function createSnake( 
    ecs: ECS, playField: PlayField, x: number, y: number, direction: Direction = randomDirection() ) {

    const directionVec = directionToVec2( direction );

    const snakeHead = ecs.createEntity();
    snakeHead.add( new PositionComponent );
    ecs.addEntity( snakeHead );

    const snakeTail = ecs.createEntity();
    snakeTail.add( new PositionComponent );
    ecs.addEntity( snakeTail );

    snakeHead.add( new LinkComponent( snakeTail.getId() ) );
    snakeTail.add( new LinkComponent( null, snakeHead.getId() ) );

    setEntityPosition( playField, snakeHead, x, y );
    setEntityPosition( playField, snakeTail, x + directionVec.x, y + directionVec.y );

    const snake = ecs.createEntity();
    snake.add( new SnakeComponent( snakeHead.getId(), snakeTail.getId() ) );
    snake.add( new DirectionComponent( direction ) );
    snake.add( new RequestedDirectionComponent );

    return snake;
}
