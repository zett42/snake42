import { Entity } from 'typed-ecstasy'
import { PositionComponent } from './components/PositionComponent'
import { PlayField } from './PlayField'

export function setEntityPosition( playField: PlayField, entity: Entity, x: number, y: number ) {
        
    x = Math.trunc( x );
    y = Math.trunc( y );

    const pos = entity.get( PositionComponent );
    if( ! pos ) {
        throw new Error( "Entity cannot be inserted in playfield because it does not contain PositionComponent" );
    }

    // Remove entity from current cell (if any)
    playField.removeEntity( pos.x, pos.y, entity.getId() );

    pos.x = x;
    pos.y = y;

    // Insert entity in new cell
    playField.insertEntity( pos.x, pos.y, entity.getId() );
}