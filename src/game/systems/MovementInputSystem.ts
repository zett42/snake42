import { IntervalIteratingSystem, Family, Entity } from 'typed-ecstasy'
import { Direction, RequestedDirectionComponent } from '../components/DirectionComponent'

interface MovementInputSharedState {
    interval: number
}

//---------------------------------------------------------------------------------------------------------------------

export class MovementInputSystem extends IntervalIteratingSystem {

    private _inputDirection: Direction = Direction.none;

    constructor( state: MovementInputSharedState ) {
        super( Family.all( RequestedDirectionComponent ).get(), state.interval )

        document.addEventListener( "keydown", ( event: KeyboardEvent ) => {

            switch( event.keyCode ) {
                case 37:  // left
                    this._inputDirection = Direction.left
                    break
                case 38:  // up
                    this._inputDirection = Direction.up
                    break
                case 39:  // right
                    this._inputDirection = Direction.right
                    break
                case 40:  // down
                    this._inputDirection = Direction.down
                    break
            }
        } )
    }

    protected processEntity( entity: Entity ): void {

        const direction = entity.get( RequestedDirectionComponent )!
        direction.value = this._inputDirection
    }
}
