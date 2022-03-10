import { Service } from 'typedi'
import { IntervalSystem, Family, Entity } from 'typed-ecstasy'
import { PositionComponent } from '@components/PositionComponent'
import { NutritionComponent } from '@components/FoodComponents'
import { setEntityPosition } from '@common/SetEntityPosition'
import { PlayField } from '@common/PlayField'

//---------------------------------------------------------------------------------------------------------------------

@Service()
export class FoodDispenserSystem extends IntervalSystem {

    private _foodEntities: Entity[] = [];

    private _foodCount = 500

    constructor( private _playField: PlayField ) {
        super( 0 )
    }

    protected updateInterval(): void {

        const foodEntities = this.engine.entities.forFamily( Family.all( NutritionComponent ).get() )

        let missingEntityCount = this._foodCount - foodEntities.length
        while( missingEntityCount-- > 0 ) {

            const entity = new Entity()
            entity.add( new PositionComponent )
            entity.add( new NutritionComponent( Math.trunc( 1 + Math.random() * 5 ) ) )
            this.engine.entities.add( entity )


            // TODO: find empty playfield cell
            const x = Math.trunc( Math.random() * this._playField.width )
            const y = Math.trunc( Math.random() * this._playField.height )
            setEntityPosition( this._playField, entity, { x: x, y: y } )
        }
    }
}
