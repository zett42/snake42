import { Family, Entity, IteratingSystem } from 'typed-ecstasy';
import { PositionComponent } from '../components/PositionComponent';
import { SnakeHeadComponent } from '../components/SnakeHeadComponent';
import { ObstacleComponent } from '../components/ObstacleComponent';
import { PlayField } from '../common/PlayField';

//---------------------------------------------------------------------------------------------------------------------

export class CollisionSystem extends IteratingSystem {

    constructor( private _playField: PlayField ) {
        super( Family.all( PositionComponent, SnakeHeadComponent ).get() /*, priority*/ );
    }

    protected processEntity( entity: Entity, deltaTime: number ): void {

        const ecs = this.getEngine()!;

        const position = entity.get( PositionComponent )!;

        const cell = this._playField.getCell( position );
        for( let cellEntityId of cell.entityIds ) {
            
            const cellEntity = ecs.getEntity( cellEntityId )!;
            if( cellEntity.get( ObstacleComponent ) ) {
                console.log( "GAME OVER" );
                break;
            }
        }
    }
}
