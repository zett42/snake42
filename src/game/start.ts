import { Engine as ECS } from 'typed-ecstasy'
import { PlayField } from './PlayField'
import { PositionComponent, DirectionComponent } from './PositionComponent'
import { SnakeComponent, LinkComponent } from './SnakeComponents'
import { setEntityPosition } from './setEntityPosition'
import { SnakeControlSystem } from './SnakeControlSystem'
import { SnakeMovementSystem } from './SnakeMovementSystem'
import { SnakeRenderSystem } from './SnakeRenderSystem'

//-------------------------------------------------------------------------------------------------------------------

export function startGame( gameCanvas : HTMLCanvasElement ) {

    const cols = 80, rows = 45;

    const playField = new PlayField( cols, rows );

    const ecs = new ECS();

    const ctx = <CanvasRenderingContext2D> gameCanvas.getContext( '2d' );

    createSnake( ecs, playField, cols / 2, rows / 2 );

    ecs.addSystem( new SnakeControlSystem() );
    ecs.addSystem( new SnakeMovementSystem( playField ) );
    ecs.addSystem( new SnakeRenderSystem( ctx, cols, rows ) );

    gameLoop( ctx, ecs );
}

//-------------------------------------------------------------------------------------------------------------------

function createSnake( ecs: ECS, playField: PlayField, x: number, y: number ) {

    let dirX = 0, dirY = 0;

    switch( Math.round( Math.random() * 3 ) ) {
        case 0: dirX =  1; break;
        case 1: dirX = -1; break;
        case 2: dirY =  1; break;
        case 3: dirY = -1; break;
    }

    const snakeHead = ecs.createEntity();
    snakeHead.add( new PositionComponent );
    ecs.addEntity( snakeHead );

    const snakeTail = ecs.createEntity();
    snakeTail.add( new PositionComponent );
    ecs.addEntity( snakeTail );

    snakeHead.add( new LinkComponent( snakeTail.getId() ) );
    snakeTail.add( new LinkComponent( null, snakeHead.getId() ) );

    setEntityPosition( playField, snakeHead, x, y );
    setEntityPosition( playField, snakeTail, x + dirX, y + dirY );

    const snake = ecs.createEntity();
    snake.add( new SnakeComponent( snakeHead.getId(), snakeTail.getId() ) );
    snake.add( new DirectionComponent( dirX, dirY ) );
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
