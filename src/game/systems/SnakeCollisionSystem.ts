import { Family, Entity, IntervalIteratingSystem } from 'typed-ecstasy'
import { PositionComponent } from '../components/PositionComponent'
import { SnakeHeadComponent } from '../components/SnakeHeadComponent'
import { ObstacleComponent } from '../components/ObstacleComponent'
import { PlayField } from '../common/PlayField'

//---------------------------------------------------------------------------------------------------------------------

export class CollisionSystem extends IntervalIteratingSystem {

    constructor( private _playField: PlayField, interval: number ) {
        super( Family.all( PositionComponent, SnakeHeadComponent ).get(), interval )
    }

    protected processEntity( entity: Entity ): void {

        const ecs = this.getEngine()!

        const position = entity.get( PositionComponent )!

        const cell = this._playField.getCell( position )
        for( let cellEntityId of cell.entityIds ) {

            const cellEntity = ecs.getEntity( cellEntityId )!
            if( cellEntity.get( ObstacleComponent ) ) {

                const snakeHead = entity.get( SnakeHeadComponent )!
                snakeHead.isAlive = false

                break
            }
        }
    }
}
