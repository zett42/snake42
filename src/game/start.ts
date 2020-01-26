import { Engine as ECS } from 'typed-ecstasy'
import { PlayField } from './PlayField'
import { createSnake } from './components/SnakeComponents'
import { SnakeInputSystem } from './systems/SnakeInputSystem'
import { SnakeMovementSystem } from './systems/SnakeMovementSystem'
import { SnakeRenderSystem } from './systems/SnakeRenderSystem'
import { FoodDispenserSystem } from './systems/FoodDispenserSystem'
import { FoodRenderSystem } from './systems/FoodRenderSystem'

//-------------------------------------------------------------------------------------------------------------------

export function startGame( gameCanvas : HTMLCanvasElement ) {

    const aspectRatio = gameCanvas.clientWidth / gameCanvas.clientHeight;
    const playFieldWidth = 96; // should be divisable by aspectRatio
    const playField = new PlayField( playFieldWidth, playFieldWidth / aspectRatio );

    const ecs = new ECS();

    const ctx = <CanvasRenderingContext2D> gameCanvas.getContext( '2d' );

    ecs.addEntity( createSnake( ecs, playField, playField.width / 2, playField.height / 2 ) );

    ecs.addSystem( new SnakeInputSystem() );
    ecs.addSystem( new SnakeMovementSystem( playField ) );
    ecs.addSystem( new FoodDispenserSystem( playField ) );
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
