import { Service } from 'typedi'
import { Family, IntervalSystem } from 'typed-ecstasy'
import { SnakeHeadComponent } from '@components/SnakeHeadComponent'

//---------------------------------------------------------------------------------------------------------------------

export enum GameStatus {
    Playing,
    GameOver
}

export interface IGameProgress {
    score: number
}

//---------------------------------------------------------------------------------------------------------------------

@Service()
export class GameStateSystem extends IntervalSystem {

    public status: GameStatus = GameStatus.Playing

    constructor() {
        super( 0 )
    }

    updateInterval(): void {

        const entities = this.engine.entities.forFamily( Family.all( SnakeHeadComponent ).get() )
        const headsAlive = entities.filter( ( entity ) => entity.get( SnakeHeadComponent )!.isAlive )

        if( headsAlive.length === 0 ) {
            this.status = GameStatus.GameOver
        }
    }
}
