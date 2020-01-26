import { IteratingSystem, Family, Entity } from 'typed-ecstasy'
import { PositionComponent } from '../components/PositionComponent'
import { NutritionComponent } from '../components/FoodComponents'
import { ISize } from '../Vector'

export class FoodRenderSystem extends IteratingSystem {

    constructor( private _ctx: CanvasRenderingContext2D, private _playField: ISize ) {
        super( Family.all( PositionComponent, NutritionComponent ).get() /*, priority*/ );
    }

    protected processEntity( entity: Entity, deltaTime: number ): void {

        const pos       = entity.get( PositionComponent )!;
        const nutrition = entity.get( NutritionComponent )!;

        const x = ( pos.x + 0.5 ) / this._playField.width  * this._ctx.canvas.width;
        const y = ( pos.y + 0.5 ) / this._playField.height * this._ctx.canvas.height;
        const w = this._ctx.canvas.width  / this._playField.width;
        const h = this._ctx.canvas.height / this._playField.height;

        const scale = 0.5 * nutrition.value / 3;

        this._ctx.beginPath();
        this._ctx.ellipse( x, y, w * scale, h * scale, 0, 0, Math.PI * 2 );
        this._ctx.fillStyle = "#3fff3f";
        this._ctx.fill();                   
    }
}