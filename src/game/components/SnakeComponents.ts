import { Component } from 'typed-ecstasy'

// Component that defines head and tail of snake.
export class SnakeComponent extends Component {

    constructor( public headId = 0, public tailId = 0 ) {
        super();
    }
}

// Component that defines connection between snake segments.
export class LinkComponent extends Component {

    constructor( 
        public prevId: number | null = null,  // previous entity (towards tail)
        public nextId: number | null = null  // next entity (towards head)
    ) {
        super();
    }
}