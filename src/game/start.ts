import { Engine as ECS } from 'typed-ecstasy'
import { PlayField } from './PlayField'
import { PositionComponent } from './components/PositionComponent'
import { DirectionComponent, RequestedDirectionComponent, directionToVec2, randomDirection } from './components/DirectionComponent'
import { SnakeComponent, LinkComponent } from './components/SnakeComponents'
import { setEntityPosition } from './setEntityPosition'
import { SnakeInputSystem } from './systems/SnakeInputSystem'
import { SnakeMovementSystem } from './systems/SnakeMovementSystem'
import { SnakeRenderSystem } from './systems/SnakeRenderSystem'

//-------------------------------------------------------------------------------------------------------------------

export function startGame( gameCanvas : HTMLCanvasElement ) {

    const cols = 80, rows = 45;

    const playField = new PlayField( cols, rows );

    const ecs = new ECS();

    const ctx = <CanvasRenderingContext2D> gameCanvas.getContext( '2d' );

    createSnake( ecs, playField, cols / 2, rows / 2 );

    ecs.addSystem( new SnakeInputSystem() );
    ecs.addSystem( new SnakeMovementSystem( playField ) );
    ecs.addSystem( new SnakeRenderSystem( ctx, cols, rows ) );

    gameLoop( ctx, ecs );
}

//-------------------------------------------------------------------------------------------------------------------
// Create initial snake consisting of 2 segments (head and tail).

function createSnake( ecs: ECS, playField: PlayField, x: number, y: number ) {

    const direction    = randomDirection();
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
    ecs.addEntity( snake );
}

//-------------------------------------------------------------------------------------------------------------------

function gameLoop( ctx: CanvasRenderingContext2D, ecs: ECS, lastTime: number = 0 ) {

    const time = performance.now() / 1000;

    if( lastTime > 0 ) {

        const deltaTime = time - lastTime;

        ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );

        ecs.update( deltaTime );  // Update all systems
    }

	requestAnimationFrame( () => gameLoop( ctx, ecs, time ) );
}
