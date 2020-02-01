import { Family, Entity, EntitySystem, Engine } from 'typed-ecstasy'
import { SnakeHeadComponent } from '../components/SnakeHeadComponent'

//---------------------------------------------------------------------------------------------------------------------

export enum GameStatus {
    Playing,
    GameOver
}

export interface IGameState {
    gameStatus: GameStatus
}

//---------------------------------------------------------------------------------------------------------------------

export class GameStateSystem extends EntitySystem {

    private _entities: Entity[] = []

    constructor( private _state: IGameState ) {
        super( 0 )
    }

    protected addedToEngine( engine: Engine ): void {

        super.addedToEngine( engine )

        this._entities = engine.getEntitiesFor( Family.all( SnakeHeadComponent ).get() )
    }

    update( deltaTime: number ): void {

        const headsAlive = this._entities.filter( ( entity ) => entity.get( SnakeHeadComponent )!.isAlive )

        if( headsAlive.length === 0 ) {
            this._state.gameStatus = GameStatus.GameOver
        }
    }
}
