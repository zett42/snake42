import { Engine as ECS, Entity } from 'typed-ecstasy'
import { ObstacleComponent } from '@components/ObstacleComponent'
import { WallComponent } from '@components/WallComponent'
import { PositionComponent } from '@components/PositionComponent'
import { PlayField } from '@common/PlayField'
import { setEntityPosition } from '@common/SetEntityPosition'

//---------------------------------------------------------------------------------------------------------------------

export function createObstacle( ecs: ECS, playField: PlayField, x: number, y: number ): void {

    const entity = new Entity()
    entity.add( new PositionComponent )
    entity.add( new ObstacleComponent )
    entity.add( new WallComponent )
    ecs.entities.add( entity )

    setEntityPosition( playField, entity, { x: x, y: y } )
}

export function createWalls( ecs: ECS, playField: PlayField ): void {

    for( let x = 0; x < playField.width; ++x ) {

        createObstacle( ecs, playField, x, 0 )
        createObstacle( ecs, playField, x, playField.height - 1 )
    }

    for( let y = 1; y < playField.height - 1; ++y ) {

        createObstacle( ecs, playField, 0, y )
        createObstacle( ecs, playField, playField.width - 1, y )
    }
}

