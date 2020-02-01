import { Engine as ECS } from 'typed-ecstasy'
import { PlayField } from './common/PlayField'
import { createAndAddSnake } from './factories/SnakeFactory'
import { GameStatus, GameStateSystem } from './systems/GameStateSystem'
import { MovementInputSystem } from './systems/MovementInputSystem'
import { SnakeMovementSystem } from './systems/SnakeMovementSystem'
import { SnakeRenderSystem } from './systems/SnakeRenderSystem'
import { FoodDispenserSystem } from './systems/FoodDispenserSystem'
import { FoodRenderSystem } from './systems/FoodRenderSystem'
import { EatingSystem } from './systems/EatingSystem'
import { ObstacleGeneratorSystem } from './systems/ObstacleGeneratorSystem'
import { WallRenderSystem } from './systems/WallRenderSystem'
import { CollisionSystem } from './systems/SnakeCollisionSystem'
import { GameGui, switchHtmlLayer, GameLayerId } from './common/GameGui'

//-------------------------------------------------------------------------------------------------------------------

interface IGameContext {
    gameStatus: GameStatus
    ecs: ECS
    ctx: CanvasRenderingContext2D
    playField: PlayField
    gui: GameGui
}

//-------------------------------------------------------------------------------------------------------------------

export function startGame( canvas : HTMLCanvasElement, gui: GameGui ) {

    const aspectRatio = canvas.clientWidth / canvas.clientHeight
    const playFieldWidth = 96 // should be divisable by aspectRatio

    const game: IGameContext = { 
        gameStatus: GameStatus.Playing,
        ecs: new ECS(), 
        ctx: <CanvasRenderingContext2D> canvas.getContext( '2d' ), 
        playField: new PlayField( playFieldWidth, playFieldWidth / aspectRatio ),
        gui: gui,
    }

    createAndAddSnake( game.ecs, game.playField, { x: game.playField.width / 2, y: game.playField.height / 2} )

    game.ecs.addSystem( new ObstacleGeneratorSystem( game.playField ) )
    game.ecs.addSystem( new MovementInputSystem() )
    game.ecs.addSystem( new SnakeMovementSystem( game.playField ) )
    game.ecs.addSystem( new FoodDispenserSystem( game.playField ) )
    game.ecs.addSystem( new EatingSystem( game.playField ) )
    game.ecs.addSystem( new CollisionSystem( game.playField ) )
    game.ecs.addSystem( new FoodRenderSystem( game.ctx, game.playField ) )
    game.ecs.addSystem( new WallRenderSystem( game.ctx, game.playField ) )
    game.ecs.addSystem( new SnakeRenderSystem( game.ctx, game.playField ) )
    game.ecs.addSystem( new GameStateSystem( game ) )

    gameLoop( game )
}

//-------------------------------------------------------------------------------------------------------------------

function gameLoop( game: IGameContext, lastTime: number = 0 ) {

    if( game.gameStatus === GameStatus.GameOver ) {

        switchHtmlLayer( game.gui, GameLayerId.GameOver )

        return
    }

    const time = performance.now() / 1000

    if( lastTime > 0 ) {

        const deltaTime = time - lastTime

        game.ctx.clearRect( 0, 0, game.ctx.canvas.width, game.ctx.canvas.height )

        game.ecs.update( deltaTime )  // Update all systems
    }

    requestAnimationFrame( () => gameLoop( game, time ) )
}
