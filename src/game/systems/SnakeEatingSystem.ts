import { Family, Entity, IteratingSystem } from 'typed-ecstasy'
import { PositionComponent } from '../components/PositionComponent'
import { SnakeComponent } from '../components/SnakeComponents'
import { FeedableComponent } from '../components/FeedableComponent';
import { NutritionComponent } from '../components/FoodComponents';
import { PlayField } from '../common/PlayField'

//---------------------------------------------------------------------------------------------------------------------

export class SnakeEatingSystem extends IteratingSystem {

    constructor( private _playField: PlayField ) {
        super( Family.all( SnakeComponent, FeedableComponent ).get() /*, priority*/ );
    }

    //.................................................................................................................

    protected processEntity( entity: Entity, deltaTime: number ): void {

        const ecs = this.getEngine()!;

        const snake = entity.get( SnakeComponent )!;
        const snakeHead = ecs.getEntity( snake.headId )!;
        const snakeHeadPos = snakeHead.get( PositionComponent )!;

        const cell = this._playField.getCell( snakeHeadPos );
        
        for( const cellEntityId of cell.entityIds ) {

            const cellEntity = ecs.getEntity( cellEntityId );
            if( cellEntity ) {

                // Check if cell has food
                const nutrition = cellEntity.get( NutritionComponent );
                if( nutrition ) {
                    // Feed it to the snake
                    const feedable = entity.get( FeedableComponent )!;
                    feedable.stomach += nutrition.value;

                    // Remove the food entity
                    // TODO: add global listener for entity removal which calls this automatically
                    //       playField updating is an implementation detail that should be hidden from systems
                    this._playField.removeEntity( snakeHeadPos, cellEntityId );
                    ecs.removeEntity( cellEntity );
                }
            }
        }
    }
}
