import { Service } from 'typedi'
import { Family, IntervalSystem } from 'typed-ecstasy'
import { SnakeHeadComponent } from '@components/SnakeHeadComponent'
import { GameSignals } from '@common/GameSignals'

//---------------------------------------------------------------------------------------------------------------------

export enum GameStatus {
    Playing,
    GameOver
}

//---------------------------------------------------------------------------------------------------------------------

@Service()
export class GameStateSystem extends IntervalSystem {

    public status: GameStatus = GameStatus.Playing

    constructor( private _gameSignals: GameSignals ) {
        super( 0 )

        _gameSignals.startSignal.connect( () => this.status = GameStatus.Playing )
    }

    updateInterval(): void {

        const entities = this.engine.entities.forFamily( Family.all( SnakeHeadComponent ).get() )
        const headsAlive = entities.filter( ( entity ) => entity.get( SnakeHeadComponent )!.isAlive )

        if( headsAlive.length === 0 ) {

            this.status = GameStatus.GameOver
            this._gameSignals.gameOverSignal.emit()
        }
    }
}
