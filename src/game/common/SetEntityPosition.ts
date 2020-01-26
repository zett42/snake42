import { Entity } from 'typed-ecstasy'
import { PositionComponent } from '../components/PositionComponent'
import { PlayField } from './PlayField'
import { IVec2 } from './Vector';

export function setEntityPosition( playField: PlayField, entity: Entity, pos: IVec2 ) {
    
    pos = { x: Math.trunc( pos.x ), y: Math.trunc( pos.y ) };

    const posComponent = entity.get( PositionComponent );
    if( ! posComponent ) {
        throw new Error( "Entity cannot be inserted in playfield because it does not contain PositionComponent" );
    }

    // Remove entity from current cell (if any)
    playField.removeEntity( posComponent, entity.getId() );
 
    // Insert entity in new cell
    playField.insertEntity( pos, entity.getId() );

    // Update entity position
    posComponent.x = pos.x;
    posComponent.y = pos.y;
}