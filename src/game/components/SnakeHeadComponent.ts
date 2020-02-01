import { Component } from 'typed-ecstasy'

//--------------------------------------------------------------------------------------------------------
/**
 * Component that defines an entity as the snake head. It links to the snake tail.
 */
export class SnakeHeadComponent extends Component {

    constructor( 
        public tailId: number = 0, 
        public isAlive: boolean = true 
    ){        
        super();
    }
}
