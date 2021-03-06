import { Service } from 'typedi'
import { Family, Entity, IntervalIteratingSystem } from 'typed-ecstasy'
import { PositionComponent } from '@components/PositionComponent'
import { FeedableComponent } from '@components/FeedableComponent'
import { NutritionComponent } from '@components/FoodComponents'
import { PlayField } from '@common/PlayField'
import { GameProgress } from '@common/GameProgress'

//---------------------------------------------------------------------------------------------------------------------

@Service()
export class EatingSystem extends IntervalIteratingSystem {

    constructor( 
        private _playField: PlayField, 
        private _progress: GameProgress ) {
        
        super( Family.all( PositionComponent, FeedableComponent ).get(), 0 )
    }

    //.................................................................................................................

    protected processEntity( entity: Entity ): void {

        const ecs = this.engine

        const position = entity.get( PositionComponent )!

        const cell = this._playField.getCell( position )

        for( const cellEntityId of cell.entityIds ) {

            const cellEntity = ecs.entities.get( cellEntityId )
            if( cellEntity ) {

                // Check if cell has food
                const nutrition = cellEntity.get( NutritionComponent )
                if( nutrition ) {

                    // Feed it to the Feedable
                    const feedable = entity.get( FeedableComponent )!
                    feedable.stomach += nutrition.value

                    this._progress.score += nutrition.value

                    // Remove the food entity
                    this._playField.removeEntity( position, cellEntityId )
                    ecs.entities.remove( cellEntity )
                }
            }
        }
    }
}
