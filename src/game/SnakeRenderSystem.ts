import { System, SystemEntityType, EntityViewFactory } from './perform-ecs'
import { PositionComponent } from './PositionComponent'
import { LinkComponent } from './SnakeComponents'

export class SnakeRenderSystem extends System {

    constructor( private ctx: CanvasRenderingContext2D, private columns: number, private rows: number ) {
        super();
    }

    // Create view which contains all entities that have components typical for snake.
    view = EntityViewFactory.createView({
        components: [ PositionComponent, LinkComponent ]
    });
    
    update( delta: number ): void {     

        for( const entity of this.view.entities ) {

            const x = ( entity.x + 0.5 ) / this.columns * this.ctx.canvas.width;
            const y = ( entity.y + 0.5 ) / this.rows    * this.ctx.canvas.height;
            const w = this.ctx.canvas.width  / this.columns;
            const h = this.ctx.canvas.height / this.rows;

            this.ctx.beginPath();
            this.ctx.ellipse( x, y, w / 2, h / 2, 0, 0, Math.PI * 2 );
            this.ctx.fillStyle = "#f2cf00";
            this.ctx.fill();                
        }
    }
}

