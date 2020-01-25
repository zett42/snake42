import { ECS } from './perform-ecs'
import { PlayField } from './PlayField'
import { PositionComponent, VelocityComponent } from './PositionComponent'
import { SnakeComponent, LinkComponent } from './SnakeComponents';
import { SnakeMovementSystem } from './SnakeMovementSystem';
import { SnakeRenderSystem } from './SnakeRenderSystem'

//-------------------------------------------------------------------------------------------------------------------

export function startGame( gameCanvas : HTMLCanvasElement ) {

    const cols = 80, rows = 50;

    const playField = new PlayField( cols, rows );

    const ecs = new ECS();

    const ctx = <CanvasRenderingContext2D> gameCanvas.getContext( '2d' );

    const snakeMovementSystem = new SnakeMovementSystem();
    ecs.registerSystem( snakeMovementSystem );

    const snakeRenderSystem = new SnakeRenderSystem( ctx, cols, rows );
    ecs.registerSystem( snakeRenderSystem );

    const head = ecs.createEntity([ 
        { component: PositionComponent, args: [ 0, 10 ] },
        { component: LinkComponent },
    ]);
    const tail = ecs.createEntity([ 
        { component: PositionComponent, args: [ 1, 10 ] },
        { component: LinkComponent },
    ]);
    head.prevId = tail.id;
    tail.nextId = head.id;

    const snake = ecs.createEntity([
        { component: SnakeComponent, args: [ head.id, tail.id ] },
        { component: VelocityComponent, args: [ 1, 0 ] },
    ]);

    gameLoop( ctx, ecs );
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