import { IntervalIteratingSystem, Family, Entity } from 'typed-ecstasy'
import { PositionComponent } from '../components/PositionComponent'
import { NutritionComponent } from '../components/FoodComponents'
import { ISize } from '../common/Vector'

//---------------------------------------------------------------------------------------------------------------------

export class FoodRenderSystem extends IntervalIteratingSystem {

    constructor( private _ctx: CanvasRenderingContext2D, private _playField: ISize, interval: number ) {
        super( Family.all( PositionComponent, NutritionComponent ).get(), interval )
    }

    protected processEntity( entity: Entity ): void {

        const pos = entity.get( PositionComponent )!
        const nutrition = entity.get( NutritionComponent )!

        const x = ( pos.x + 0.5 ) / this._playField.width * this._ctx.canvas.width
        const y = ( pos.y + 0.5 ) / this._playField.height * this._ctx.canvas.height
        const w = this._ctx.canvas.width / this._playField.width
        const h = this._ctx.canvas.height / this._playField.height

        const scale = 0.075 + 0.15 * nutrition.value / 5

        this._ctx.beginPath()
        this._ctx.moveTo( x - w * scale, y )
        this._ctx.lineTo( x + w * scale, y )
        this._ctx.moveTo( x, y - h * scale )
        this._ctx.lineTo( x, y + h * scale )
        this._ctx.strokeStyle = "#3fe03f"
        this._ctx.stroke()
    }
}
