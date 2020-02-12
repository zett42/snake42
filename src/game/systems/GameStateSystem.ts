import { Family, Entity, IntervalSystem, Engine } from 'typed-ecstasy'
import { SnakeHeadComponent } from '../components/SnakeHeadComponent'

//---------------------------------------------------------------------------------------------------------------------

export enum GameStatus {
    Playing,
    GameOver
}

export interface IGameState {
    status: GameStatus
}

//---------------------------------------------------------------------------------------------------------------------

export class GameStateSystem extends IntervalSystem {

    private _entities: Entity[] = []

    constructor( private _state: IGameState, interval: number ) {
        super( interval )
    }

    protected addedToEngine( engine: Engine ): void {

        super.addedToEngine( engine )

        this._entities = engine.getEntitiesFor( Family.all( SnakeHeadComponent ).get() )
    }

    updateInterval(): void {

        const headsAlive = this._entities.filter( ( entity ) => entity.get( SnakeHeadComponent )!.isAlive )

        if( headsAlive.length === 0 ) {
            this._state.status = GameStatus.GameOver
        }
    }
}
