import { Component } from 'typed-ecstasy'
import { IVec2 } from '../Vector'

export enum Direction {
    none, right, left, up, down
}

export class DirectionComponent extends Component {

    constructor( public value: Direction = Direction.none ) {
        super();
    }
}

export class RequestedDirectionComponent extends Component {

    constructor( public value: Direction = Direction.none ) {
        super();
    }
}

export function directionToVec2( dir: Direction ): IVec2 {
    
    let result = { x: 0, y: 0 };

    switch( dir ) {
        case Direction.right: result.x =  1; break;
        case Direction.left:  result.x = -1; break;
        case Direction.down:  result.y =  1; break;
        case Direction.up:    result.y = -1; break;
    }
    return result;
} 

export function randomDirection() : Direction {
    return <Direction> Math.trunc( 1 + Math.random() * 4 );
}
