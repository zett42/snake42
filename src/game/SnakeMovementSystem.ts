import { System, SystemEntityType, EntityViewFactory } from './perform-ecs'
import { PositionComponent, VelocityComponent } from './PositionComponent'
import { SnakeComponent, LinkComponent } from './SnakeComponents'

export class SnakeMovementSystem extends System {

    timeAccu: number = 0;

    constructor() {
        super();
    }

    snakesView = EntityViewFactory.createView({
        components: [ SnakeComponent, VelocityComponent ]
    });

    snakeSegmentsView = EntityViewFactory.createView({
        components: [ PositionComponent, LinkComponent ],

        onEntityAdded:   this.onEntityAdded.bind( this ),
        onEntityRemoved: this.onEntityRemoved.bind( this ),        
    });

    private _snakeSegmentsById: Map< number, SystemEntityType< this, "snakeSegmentsView" > > = new Map();

    onEntityAdded( entity: SystemEntityType< this, "snakeSegmentsView" > ): void {

        console.log( `onEntityAdded: ${entity.id}` );
        this._snakeSegmentsById.set( entity.id, entity );
    }

    onEntityRemoved( entity: SystemEntityType< this, "snakeSegmentsView" > ): void {

        this._snakeSegmentsById.delete( entity.id );
    }
    
    update( delta: number ): void {     

        const delay = 0.2;

        this.timeAccu += delta;
        if( this.timeAccu < delay ) {
            return;
        }

        this.timeAccu -= delay;


        for( const entity of this.snakesView.entities ) {
         
            const head = this._snakeSegmentsById.get( entity.headId );
            const tail = this._snakeSegmentsById.get( entity.tailId );

            const newTail = this._snakeSegmentsById.get( tail.nextId );
            newTail.prevId = null;

            const newHead = tail;
            newHead.nextId = null;
            newHead.prevId = head;
            newHead.x = head.x + entity.velocityX;
            newHead.y = head.y + entity.velocityY;

            entity.tailId = newTail.id;
            entity.headId = newHead.id;
        }
    }
}

