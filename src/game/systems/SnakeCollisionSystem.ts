import { Service } from 'typedi'
import { Family, Entity, IntervalIteratingSystem } from 'typed-ecstasy'
import { PositionComponent } from '@components/PositionComponent'
import { SnakeHeadComponent } from '@components/SnakeHeadComponent'
import { ObstacleComponent } from '@components/ObstacleComponent'
import { PlayField } from '@common/PlayField'

//---------------------------------------------------------------------------------------------------------------------

@Service()
export class CollisionSystem extends IntervalIteratingSystem {

    constructor( private _playField: PlayField ) {
        super( Family.all( PositionComponent, SnakeHeadComponent ).get(), 0 )
    }

    protected processEntity( entity: Entity ): void {

        const position = entity.get( PositionComponent )!
        const cell = this._playField.getCell( position )

        for( const cellEntityId of cell.entityIds ) {

            const cellEntity = this.engine.entities.get( cellEntityId )!
            if( cellEntity.get( ObstacleComponent ) ) {

                const snakeHead = entity.get( SnakeHeadComponent )!
                snakeHead.isAlive = false

                break
            }
        }
    }
}
