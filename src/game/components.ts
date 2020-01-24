import { makeComponent, Component } from './ecs/Component'

@makeComponent
export class PositionComp extends Component {

    public x!: number;
    public y!: number;

    public reset( obj: this, x: number = 0, y: number = 0 ): void {
        obj.x = x;
        obj.y = y;
    }
}

// Component that connects snake segments
@makeComponent
export class LinkComp extends Component {

    prev!: number;
    next!: number;

    reset( obj: this, prev: number = 0, next: number = 0 ): void {
        obj.prev = prev;
        obj.next = next;
    }
}

