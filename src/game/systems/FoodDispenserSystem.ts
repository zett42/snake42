import { Engine as ECS, IntervalSystem , Family, Entity } from 'typed-ecstasy'
import { PositionComponent } from '../components/PositionComponent'
import { NutritionComponent } from '../components/FoodComponents'
import { setEntityPosition } from '../setEntityPosition'
import { PlayField } from '../PlayField'

export class FoodDispenserSystem extends IntervalSystem {

    private _foodEntities: Entity[] = [];
     
    constructor( private _playField: PlayField, interval: number = 1.0 ) {
        super( interval );
    }

	protected addedToEngine( engine: ECS ): void {

        super.addedToEngine( engine );

        this._foodEntities = engine.getEntitiesFor( Family.all( NutritionComponent ).get() )
	}    

    protected updateInterval(): void {
      
        let missingEntityCount = 10 - this._foodEntities.length; 
        if( missingEntityCount > 0 ) {

            const ecs = this.getEngine()!;

            const entity = ecs.createEntity();
            entity.add( new PositionComponent );
            entity.add( new NutritionComponent );

            // TODO: find empty playfield cell
            const x = Math.trunc( Math.random() * this._playField.width );
            const y = Math.trunc( Math.random() * this._playField.height );
            setEntityPosition( this._playField, entity, x, y );

            ecs.addEntity( entity );
        }
	}
}
