import { Engine as ECS } from 'typed-ecstasy'
import { IteratingSystem, Family, Entity } from 'typed-ecstasy'
import { DirectionComponent } from './PositionComponent'
import { SnakeComponent } from './SnakeComponents'

enum ArrowKey {
    none, left, right, up, down
}

export class SnakeControlSystem extends IteratingSystem {

    private _lastArrowKey: ArrowKey = ArrowKey.none;

    constructor() {
        super( Family.all( SnakeComponent, DirectionComponent ).get() /*, priority*/ );
     
        document.addEventListener( "keydown", ( event: KeyboardEvent ) => {

            switch( event.keyCode ) {
                case 37:  // left
                    if( this._lastArrowKey != ArrowKey.right ) { 
                        this._lastArrowKey = ArrowKey.left;
                    }
                    break;
                case 38:  // up
                    if( this._lastArrowKey != ArrowKey.down ) { 
                        this._lastArrowKey = ArrowKey.up;
                    }
                    break;
                case 39:  // right
                    if( this._lastArrowKey != ArrowKey.left ) { 
                        this._lastArrowKey = ArrowKey.right;
                    }
                    break;
                case 40:  // down
                    if( this._lastArrowKey != ArrowKey.up ) { 
                        this._lastArrowKey = ArrowKey.down;
                    }
                    break;
            }
        });
    }

    protected processEntity( entity: Entity, deltaTime: number ): void {

        const direction = entity.get( DirectionComponent )!;

        switch( this._lastArrowKey ) {
            case ArrowKey.left:
                direction.x = -1;
                direction.y = 0;
                break;
            case ArrowKey.right:
                direction.x = 1;
                direction.y = 0;
                break;
            case ArrowKey.up:
                direction.x = 0;
                direction.y = -1;
                break;
            case ArrowKey.down:
                direction.x = 0;
                direction.y = 1;
                break;
        }
    }
}
