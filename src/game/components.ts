import { ECS, makeComponent, Component } from './ecs'

@makeComponent
export class PositionComp extends Component {

    x: number;
    y: number;

    reset( obj: this, x: number = 0, y: number = 0 ): void {
        obj.x = x;
        obj.y = y;
    }
}

@makeComponent
export class LinkComp extends Component {

    prev: number;
    next: number;

    reset( obj: this, prev: number = 0, next: number = 0 ): void {
        obj.prev = prev;
        obj.next = next;
    }
}

