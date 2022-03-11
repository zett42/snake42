import { Service } from 'typedi'
import { IntervalIteratingSystem, Family, Entity } from 'typed-ecstasy'
import { Direction, RequestedDirectionComponent } from '@components/DirectionComponent'
import { GameSignals } from '@common/GameSignals'

//---------------------------------------------------------------------------------------------------------------------

@Service()
export class MovementInputSystem extends IntervalIteratingSystem {

    private _inputDirection: Direction = Direction.none;

    constructor( private _gameSignals: GameSignals ) {
        super( Family.all( RequestedDirectionComponent ).get(), 0 )

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

        _gameSignals.startSignal.connect( () => this._inputDirection = Direction.none )           
    }

    protected processEntity( entity: Entity ): void {

        const direction = entity.get( RequestedDirectionComponent )!
        direction.value = this._inputDirection
    }
}
