import { Component } from 'typed-ecstasy'

export class PositionComponent extends Component {

    constructor( public x: number = 0, public y: number = 0 ) {
        super();
    }
}

export class DirectionComponent extends Component {

    constructor( public x: number = 0, public y: number = 0 ) {
        super();
    }
}
