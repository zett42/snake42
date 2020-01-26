import { IteratingSystem, Family, Entity } from 'typed-ecstasy'
import { PositionComponent } from '../components/PositionComponent'
import { LinkComponent } from '../components/SnakeComponents'

export class SnakeRenderSystem extends IteratingSystem {

    constructor( private ctx: CanvasRenderingContext2D, private columns: number, private rows: number ) {
        super( Family.all( PositionComponent, LinkComponent ).get() /*, priority*/ );
    }

    protected processEntity( entity: Entity, deltaTime: number ): void {

        const pos = entity.get( PositionComponent );

        const x = ( pos!.x + 0.5 ) / this.columns * this.ctx.canvas.width;
        const y = ( pos!.y + 0.5 ) / this.rows    * this.ctx.canvas.height;
        const w = this.ctx.canvas.width  / this.columns;
        const h = this.ctx.canvas.height / this.rows;

        this.ctx.beginPath();
        this.ctx.ellipse( x, y, w / 2, h / 2, 0, 0, Math.PI * 2 );
        this.ctx.fillStyle = "#f2cf00";
        this.ctx.fill();                   
    }
}
