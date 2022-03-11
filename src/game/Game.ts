import { Engine as ECS, IntervalSystem } from 'typed-ecstasy'
import { PlayField } from '@common/PlayField'
import { createSnake } from '@app/game/factories/SnakeFactory'
import { createWalls } from '@app/game/factories/ObstacleFactory'
import { GameStatus, GameStateSystem } from '@systems/GameStateSystem'
import { GameGui } from '@common/GameGui'
import { GameSignals } from '@common/GameSignals'
import { MovementInputSystem } from '@systems/MovementInputSystem'
import { SnakeMovementSystem } from '@systems/SnakeMovementSystem'
import { FoodDispenserSystem } from '@systems/FoodDispenserSystem'
import { EatingSystem } from '@systems/EatingSystem'
import { CollisionSystem } from '@systems/SnakeCollisionSystem'
import { ClearRenderSystem } from '@systems/ClearRenderSystem'
import { SnakeRenderSystem } from '@systems/SnakeRenderSystem'
import { FoodRenderSystem } from '@systems/FoodRenderSystem'
import { WallRenderSystem } from '@systems/WallRenderSystem'
import { Direction } from '@components/DirectionComponent'

//-------------------------------------------------------------------------------------------------------------------

export class Game { 

    private _ecs = new ECS()
    private _gui         = this._ecs.getContainer().get( GameGui )
    private _gameSignals = this._ecs.getContainer().get( GameSignals )
    private _playState   = this._ecs.getContainer().get( GameStateSystem )
    
    constructor() {

        this._ecs.systems.add( MovementInputSystem )
        this._ecs.systems.add( SnakeMovementSystem )
        this._ecs.systems.add( FoodDispenserSystem )
        this._ecs.systems.add( EatingSystem )
        this._ecs.systems.add( CollisionSystem )
        this._ecs.systems.add( ClearRenderSystem )
        this._ecs.systems.add( FoodRenderSystem )
        this._ecs.systems.add( WallRenderSystem )
        this._ecs.systems.add( SnakeRenderSystem ) 
        this._ecs.systems.add( GameStateSystem )

        this._gameSignals.startSignal.connect( () => this.newGame() )
    }

    private newGame(): void {

        const aspectRatio = this._gui.canvas.clientWidth / this._gui.canvas.clientHeight
        const playFieldWidth = 64 // should be divisable by aspectRatio
        const playField = this._ecs.getContainer().get( PlayField )
        playField.resize( playFieldWidth, playFieldWidth / aspectRatio )

        this._ecs.entities.removeAll()

        createWalls( this._ecs, playField )

        const snakePos = { x: playField.width / 2, y: playField.height / 2 }
        const snakeDir = Math.random() > 0.5 ? Direction.left : Direction.right
        createSnake( this._ecs, playField, snakePos, snakeDir );

        this._ecs.systems.getAll().filter( sys => sys instanceof IntervalSystem ).forEach( 
            sys => (sys as IntervalSystem).setInterval( 0.3 ) 
        )

        this.runGameLoop()
    }

    private runGameLoop( lastTime: number = 0 ): void {

        if( this._playState.status === GameStatus.GameOver ) {
            return
        }

        const time = performance.now() / 1000

        if( lastTime > 0 ) {
            this._ecs.update( time - lastTime )  // Update all systems
        }

        requestAnimationFrame( () => this.runGameLoop( time ) )
    }
}