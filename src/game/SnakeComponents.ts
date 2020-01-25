import { makeComponent, Component } from './perform-ecs'

// Component that defines head and tail of snake.
@makeComponent
export class SnakeComponent extends Component {

    headId!: number;
    tailId!: number;

    reset( obj: this, headId: number = 0, tailId: number = 0 ): void {
        obj.headId = headId;
        obj.tailId = tailId;
    }
}

// Component that defines connection between snake segments.
@makeComponent
export class LinkComponent extends Component {

    prevId!: number | null;  // previous entity (towards tail)
    nextId!: number | null;  // next entity (towards head)

    reset( obj: this, prevId: number | null = null, nextId: number | null = null ): void {
        obj.prevId = prevId;
        obj.nextId = nextId;
    }
}