import { Engine as ECS } from 'typed-ecstasy'
import { PlayField } from './common/PlayField'
import { createAndAddSnake } from './factories/SnakeFactory'
import { GameStatus, GameStateSystem } from './systems/GameStateSystem'
import { IGameProgress } from './common/GameProgress'
import { MovementInputSystem } from './systems/MovementInputSystem'
import { SnakeMovementSystem } from './systems/SnakeMovementSystem'
import { FoodDispenserSystem } from './systems/FoodDispenserSystem'
import { EatingSystem } from './systems/EatingSystem'
import { ObstacleGeneratorSystem } from './systems/ObstacleGeneratorSystem'
import { CollisionSystem } from './systems/SnakeCollisionSystem'
import { ClearRenderSystem } from './systems/ClearRenderSystem'
import { SnakeRenderSystem } from './systems/SnakeRenderSystem'
import { FoodRenderSystem } from './systems/FoodRenderSystem'
import { WallRenderSystem } from './systems/WallRenderSystem'
import { GameGui, switchHtmlLayer, GameLayerId } from './common/GameGui'
import { Direction } from './components/DirectionComponent'

//-------------------------------------------------------------------------------------------------------------------

interface IGameContext {
    status   : GameStatus
    ecs      : ECS
    ctx      : CanvasRenderingContext2D
    playField: PlayField
    gui      : GameGui
    interval : number
    progress : IGameProgress
}

//-------------------------------------------------------------------------------------------------------------------

export function startGame( canvas: HTMLCanvasElement, gui: GameGui ) {

    const aspectRatio = canvas.clientWidth / canvas.clientHeight
    const playFieldWidth = 64 // should be divisable by aspectRatio

    const game: IGameContext = {
        status: GameStatus.Playing,
        ecs: new ECS(),
        ctx: <CanvasRenderingContext2D> canvas.getContext( '2d' ),
        playField: new PlayField( playFieldWidth, playFieldWidth / aspectRatio ),
        gui: gui,
        interval: 0.3,
        progress: { score: 0 }
    }


    createAndAddSnake( game.ecs, game.playField, { x: game.playField.width / 2, y: game.playField.height / 2 },
                       Math.random() > 0.5 ? Direction.left : Direction.right );

    game.ecs.addSystem( new ObstacleGeneratorSystem( game ) )
    game.ecs.addSystem( new MovementInputSystem( game ) )
    game.ecs.addSystem( new SnakeMovementSystem( game.playField, game.interval ) )
    game.ecs.addSystem( new FoodDispenserSystem( game.playField, 500, game.interval ) )
    game.ecs.addSystem( new EatingSystem( game.playField, game.progress, game.interval ) )
    game.ecs.addSystem( new CollisionSystem( game.playField, game.interval ) )
    game.ecs.addSystem( new ClearRenderSystem( game.ctx, game.interval ) )
    game.ecs.addSystem( new FoodRenderSystem( game.ctx, game.playField, game.interval ) )
    game.ecs.addSystem( new WallRenderSystem( game.ctx, game.playField, game.interval ) )
    game.ecs.addSystem( new SnakeRenderSystem( game.ctx, game.playField, game.interval ) )
    game.ecs.addSystem( new GameStateSystem( game, game.interval ) )

    gameLoop( game )
}

//-------------------------------------------------------------------------------------------------------------------

function gameLoop( game: IGameContext, lastTime: number = 0 ) {

    if( game.status === GameStatus.GameOver ) {

        console.log("SCORE: ", game.progress.score)

        document.getElementById( 'score' )!.innerText = game.progress.score.toString()

        switchHtmlLayer( game.gui, GameLayerId.GameOver )

        return
    }

    const time = performance.now() / 1000

    if( lastTime > 0 ) {

        game.ecs.update( time - lastTime )  // Update all systems
    }

    requestAnimationFrame( () => gameLoop( game, time ) )
}
