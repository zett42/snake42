import { Engine as ECS } from 'typed-ecstasy'
import { PlayField } from './PlayField'
import { PositionComponent, VelocityComponent } from './PositionComponent'
import { SnakeComponent, LinkComponent } from './SnakeComponents';
import { SnakeMovementSystem } from './SnakeMovementSystem';
import { SnakeRenderSystem } from './SnakeRenderSystem'

//-------------------------------------------------------------------------------------------------------------------

export function startGame( gameCanvas : HTMLCanvasElement ) {

    const cols = 80, rows = 45;

    const playField = new PlayField( cols, rows );

    const ecs = new ECS();

    const ctx = <CanvasRenderingContext2D> gameCanvas.getContext( '2d' );

    createSnake( ecs );

    ecs.addSystem( new SnakeMovementSystem() );
    ecs.addSystem( new SnakeRenderSystem( ctx, cols, rows ) );

    gameLoop( ctx, ecs );
}

//-------------------------------------------------------------------------------------------------------------------

function createSnake( ecs: ECS ) {

    const snakeHead = ecs.createEntity();
    snakeHead.add( new PositionComponent( 0, 10 ) );
    ecs.addEntity( snakeHead );

    const snakeTail = ecs.createEntity();
    snakeTail.add( new PositionComponent( 1, 10 ) );
    ecs.addEntity( snakeTail );

    snakeHead.add( new LinkComponent( snakeTail.getId() ) );
    snakeTail.add( new LinkComponent( null, snakeHead.getId() ) );

    const snake = ecs.createEntity();
    snake.add( new SnakeComponent( snakeHead.getId(), snakeTail.getId() ) );
    snake.add( new VelocityComponent( 1, 0 ) );
    ecs.addEntity( snake );
}

//-------------------------------------------------------------------------------------------------------------------

function gameLoop( ctx: CanvasRenderingContext2D, ecs: ECS, lastTime: number = 0 ) {

    const time = performance.now() / 1000;

    if( lastTime > 0 ) {

        const deltaTime = time - lastTime;

        ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );

        // System 'update' methods will be called
        ecs.update( deltaTime );
    }

	requestAnimationFrame( () => gameLoop( ctx, ecs, time ) );
}
