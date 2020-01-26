import { Engine as ECS } from 'typed-ecstasy'
import { PlayField } from './common/PlayField'
import { createAndAddSnake } from './factories/SnakeFactory'
import { MovementInputSystem } from './systems/MovementInputSystem'
import { SnakeMovementSystem } from './systems/SnakeMovementSystem'
import { SnakeRenderSystem } from './systems/SnakeRenderSystem'
import { FoodDispenserSystem } from './systems/FoodDispenserSystem'
import { FoodRenderSystem } from './systems/FoodRenderSystem'
import { EatingSystem } from './systems/EatingSystem';

//-------------------------------------------------------------------------------------------------------------------

export function startGame( gameCanvas : HTMLCanvasElement ) {

    const aspectRatio = gameCanvas.clientWidth / gameCanvas.clientHeight;
    const playFieldWidth = 96; // should be divisable by aspectRatio
    const playField = new PlayField( playFieldWidth, playFieldWidth / aspectRatio );

    const ecs = new ECS();

    const ctx = <CanvasRenderingContext2D> gameCanvas.getContext( '2d' );

    createAndAddSnake( ecs, playField, { x: playField.width / 2, y: playField.height / 2} );

    ecs.addSystem( new MovementInputSystem() );
    ecs.addSystem( new SnakeMovementSystem( playField ) );
    ecs.addSystem( new FoodDispenserSystem( playField ) );
    ecs.addSystem( new EatingSystem( playField ) );
    ecs.addSystem( new FoodRenderSystem( ctx, playField ) );
    ecs.addSystem( new SnakeRenderSystem( ctx, playField ) );

    gameLoop( ctx, ecs );
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
