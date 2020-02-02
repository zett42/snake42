import { Component } from 'typed-ecstasy'

/**
 * Component for actors that can eat something. The stomach member defines how much the actor has eaten, but not digested yet.
 */
export class FeedableComponent extends Component {

    constructor( public stomach: number = 0 ) {
        super()
    }
}
