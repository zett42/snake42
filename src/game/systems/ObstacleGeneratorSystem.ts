import { Engine, EntitySystem } from 'typed-ecstasy'
import { ObstacleComponent } from '../components/ObstacleComponent'
import { WallComponent } from '../components/WallComponent'
import { PositionComponent } from '../components/PositionComponent'
import { PlayField } from '../common/PlayField'
import { setEntityPosition } from '../common/SetEntityPosition'

//---------------------------------------------------------------------------------------------------------------------

export class ObstacleGeneratorSystem extends EntitySystem {

    constructor( private _playField: PlayField ) {
        super( 0 )
    }

    protected addedToEngine( engine: Engine ): void {

        super.addedToEngine( engine )
    }

    update( deltaTime: number ): void {

        // Create walls around playfield
        this.createWalls()

        // No further calls to update() required
        this.setProcessing( false )
    }

    createWalls() {
        for( let x = 0; x < this._playField.width; ++x ) {

            this.createObstacle( x, 0 )
            this.createObstacle( x, this._playField.height - 1 )
        }

        for( let y = 1; y < this._playField.height - 1; ++y ) {

            this.createObstacle( 0, y )
            this.createObstacle( this._playField.width - 1, y )
        }
    }

    createObstacle( x: number, y: number ) {

        const ecs = this.getEngine()!

        const entity = ecs.createEntity()
        entity.add( new PositionComponent )
        entity.add( new ObstacleComponent )
        entity.add( new WallComponent )
        ecs.addEntity( entity )

        setEntityPosition( this._playField, entity, { x: x, y: y } )
    }
}
