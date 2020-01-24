import { System, SystemEntityType, EntityViewFactory } from './perform-ecs'
import { PositionComp } from './components'

export class PositionSystem extends System {

    // Create view which will contain all entities that have 'PositionComp'
    // types are fully supported here!
    view = EntityViewFactory.createView({
        components:      [ PositionComp ],
        onEntityAdded:   this.onEntityAdded.bind( this ),
        onEntityRemoved: this.onEntityRemoved.bind( this ),
    });

    onEntityAdded( entity: SystemEntityType< this, "view" > ): void {

        console.log( `entity added: ${entity.id}` )
    }

    onEntityRemoved( entity: SystemEntityType< this, "view" > ): void {

        console.log( `entity removed: ${entity.id}` )
    }
    
    update( delta: number ): void {

        for( const entity of this.view.entities ) {

            entity.x += delta;
            entity.y += delta;

            console.log( entity )
        }
    }
}

