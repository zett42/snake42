import { Engine as ECS, IntervalSystem, Family, Entity } from 'typed-ecstasy'
import { PositionComponent } from '../components/PositionComponent'
import { NutritionComponent } from '../components/FoodComponents'
import { setEntityPosition } from '../common/SetEntityPosition'
import { PlayField } from '../common/PlayField'

//---------------------------------------------------------------------------------------------------------------------

export class FoodDispenserSystem extends IntervalSystem {

    private _foodEntities: Entity[] = [];

    constructor( private _playField: PlayField, private _foodCount: number, interval: number ) {
        super( interval )
    }

    protected addedToEngine( engine: ECS ): void {

        super.addedToEngine( engine )

        this._foodEntities = engine.getEntitiesFor( Family.all( NutritionComponent ).get() )

        this.updateInterval()
    }

    protected updateInterval(): void {

        let missingEntityCount = this._foodCount - this._foodEntities.length
        while( missingEntityCount-- > 0 ) {

            const ecs = this.getEngine()!

            const entity = ecs.createEntity()
            entity.add( new PositionComponent )
            entity.add( new NutritionComponent( Math.trunc( 1 + Math.random() * 5 ) ) )
            ecs.addEntity( entity )

            // TODO: find empty playfield cell
            const x = Math.trunc( Math.random() * this._playField.width )
            const y = Math.trunc( Math.random() * this._playField.height )
            setEntityPosition( this._playField, entity, { x: x, y: y } )
        }
    }
}
