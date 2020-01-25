import { makeComponent, Component } from './perform-ecs'

@makeComponent
export class PositionComponent extends Component {

    x!: number;
    y!: number;

    reset( obj: this, x: number = 0, y: number = 0 ): void {
        obj.x = x;
        obj.y = y;
    }
}

@makeComponent
export class VelocityComponent extends Component {

    velocityX!: number;
    velocityY!: number;

    reset( obj: this, velocityX: number = 0, velocityY: number = 0 ): void {
        obj.velocityX = velocityX;
        obj.velocityY = velocityY;
    }
}
